import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Upload from '../../src/artifacts/contracts/Upload.sol/Upload.json';


import { Web3Provider } from '@ethersproject/providers';


const Previous = () => {
     
    const [account,setAccount] = useState("");
    const [contract,setContract] = useState(null);
    const [provider,setProvider] = useState(null);
    const [modelOpen,setModelOpen] = useState(false);
  
  
    useEffect(()=>{
  
      const provider = new Web3Provider(window.ethereum);
  
      const loadProvider = async () => {
        
        if (provider) {
  
          try {
  
            window.ethereum.on("chainChanged",()=>{
              window.location.reload();
            });
            
            window.ethereum.on("accountsChanged",()=>{
              window.location.reload();
            })
  
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            let contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
      
            const contract = new ethers.Contract(
              contractAddress,
              Upload.abi,
              signer
            );
  
            setContract(contract);
            setProvider(provider);
          } catch (error) {
            console.error("Error requesting accounts:", error);
          }
        } else {
          console.error("Metamask is not installed...");
        }
      };
      
  
      provider && loadProvider();
  
  
    },[]);



  const [data, setData] = useState("");

  const getData = async () => {

    let dataArray;

    let Otheraddress = "";

    if (Otheraddress) {
      dataArray = await contract.display(Otheraddress);
      console.log(dataArray);

    } else {

      dataArray = await contract.display(account);

    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {

      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);

      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img key={i} src={`https://gateway.pinata.cloud/ipfs${item.substring(6)}`} className='image-list'>
            
            </img>
          </a>
        )
      })
      setData(images);

    } else {

      alert("No Image to Display");
    }

  }

  return (
    <div>
      
     
            <button className='btn btn-primary' style={{width:"85px"}} onClick={getData}>Search</button>
       

    </div>
  )
}

export default Previous;
