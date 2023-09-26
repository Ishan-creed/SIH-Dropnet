import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Upload from '../../src/artifacts/contracts/Upload.sol/Upload.json';


import { Web3Provider } from '@ethersproject/providers';

const AdmitOptions = () => {

    
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

    const boxStyle = {
        boxShadow: '1px 2px 2px black', // Adjust the shadow values as needed
      };
    

  return (
    <div>
      {/* <p style={{color:"white"}}>Account : {account ? account:"Account not connected..."}</p> */}
      <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className='40-w p-5 rounded bg-white' style={{ marginRight: '90px',...boxStyle }}>
          <Link to="/documentType" style={{textDecoration:"none",fontWeight:"bold"}}>
            <p className='text-grid' style={{textDecoration:"none",color:"blue",backgroundColor:"white"}}>Generate Certificate</p>
          </Link>
        </div>
        <div className='40-w p-5 rounded bg-white' style={{ marginLeft: '90px',...boxStyle }}>
          <Link to="/previous" style={{textDecoration:"none",fontWeight:"bold"}}>
            <p className='text-grid' style={{textDecoration:"none",color:"blue",backgroundColor:"white"}} >See previous Certificates</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdmitOptions;
