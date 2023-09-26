import './App.css';
import Upload from '../src/artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import HomePage from './HomePage';
import Auth_signup from './components/Signup';
import Auth_login from './components/signin';
import FileUpload from "./components/FileUpload";
import Display from './components/Display';
import Model from './components/Model';
import LandingPage from './components/LandingPage';
import AdmitOptions from './components/Admin_Options';
import DocumentType from './components/documentType';
import CertificateGenerator2 from './pages/CertificateGenerator';
import UserVerification from './components/userVerification';
import Previous from './components/previous';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {


  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);


  useEffect(() => {



    const provider = new Web3Provider(window.ethereum);


    const loadProvider = async () => {

      if (provider) {

        try {

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
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


  }, []);

  return (

    <div className="App">

<p style={{color:"white"}}>Account : {account ? account:"Account not connected..."}</p> 


      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Auth_signup />} />
          <Route path='/authlogin' element={<Auth_login />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/userVerification' element={<UserVerification/>} />
          <Route path='/admitOptions' element={<AdmitOptions />} />
          <Route path='/documentType' element={<DocumentType/>} />
          <Route path='/certificateGenerator2' element={<CertificateGenerator2/>} />
          <Route path='/previous' element={<Previous/>} />


        </Routes>
        {/* Your other components go here */}
      </Router>
 

 


    </div>
  );
}

export default App;