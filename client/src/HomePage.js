import React from 'react'
import './App.css';
import Upload from '../src/artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import { Web3Provider } from '@ethersproject/providers';

import FileUpload from "./components/FileUpload";
import Display from './components/Display';
import Model from './components/Model';

const HomePage = () => {
   
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
    
    return (
  
      <div className="App">
        <h1 style={{color:"white"}}>GDrive 3.0</h1>
        <div className='bg'></div>
        <div className='bg bg2'></div>
        <div className='bg bg3'></div>
  
        <p style={{color:"white"}}>Account : {account ? account:"Account not connected..."}</p>
   
       <FileUpload account = {account} provider = {provider} contract = {contract} />
       <Display contract = {contract} account = {account}/>
  
      </div>
    );

}

export default HomePage
