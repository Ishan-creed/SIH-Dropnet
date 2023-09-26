import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./FileUpload.css";

const FileUpload = ({contract,account,provider}) => {

  const [file,setFile] = useState(null);
  const [fileName,setFileName] = useState("No Image Selected");


  const handleSubmit = async (e) =>{
   e.preventDefault();
   if(file){

    try {

      const formData = new FormData();
      formData.append("file",file);
     
      const resFile = await axios({
        method:"post",
        url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
        data:formData,
        headers:{
          pinata_api_key: `1d007ed7e2ba8579e307`,
          pinata_secret_api_key:`36747f49b010655ae70f2ec23d3be35124899c2f3cef61a64666536012f91c40`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      // const signer = contract.connect(provider.getSigner());
      contract.add(account,ImgHash);

      alert("Successfully Image has been Uploaded");
      setFileName("No Image Selected");
      setFile(null);

    } catch (error) {
      alert("Unable to upload the image to Pinata");
    }

   }
  };

  const retrieveFile = (e)=> {

     const data = e.target.files[0]; // Array of file's objects #$@

     
     const reader = new window.FileReader();
     reader.readAsArrayBuffer(data);

     reader.onloadend = ()=>{
      setFile(e.target.files[0]);
     }
     setFileName(e.target.files[0].name);
     e.preventDefault();
  };

  return (
    <>

    <form className='form' onSubmit={handleSubmit} >
      <label htmlFor='file-upload' className='choose'>
        Choose Image
      </label>
      <input disabled = {!account} type="file" id='file-upload' name='data' onChange={retrieveFile}/>
     <span className='textArea'>Image: {fileName}</span>
    <button type='submit' className="upload" disabled = {!file}>Upload</button>
    </form>
    </>
  )
}

export default FileUpload;
