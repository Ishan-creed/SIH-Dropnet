import React, { useState } from 'react';
import axios from 'axios';

const UserVerification = () => {
    const [hashInput, setHashInput] = useState(''); // State to store user input
    const [verificationResult, setVerificationResult] = useState(''); // State to store verification result

    const headers = {

        pinata_api_key: `1d007ed7e2ba8579e307`,
        pinata_secret_api_key: `36747f49b010655ae70f2ec23d3be35124899c2f3cef61a64666536012f91c40`,
        'Content-Type': 'application/json'

    };

    const handleInputChange = (event) => {
        setHashInput(event.target.value);
    };

    const submit = async (event) => {
        event.preventDefault(); // Prevent page reload
      
        try {
          const cid = hashInput.replace('ipfs://', '');
          const ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
      
          // Attempt to fetch the content associated with the hash
          const response = await axios.get(ipfsGatewayUrl);
      
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // If the status is 200, set the verification result to 'Verified successfully'
            const submit = async (event) => {
        event.preventDefault(); // Prevent page reload
      
        try {
          const cid = hashInput.replace('ipfs://', '');
          const ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
      
          // Attempt to fetch the content associated with the hash
          const response = await axios.get(ipfsGatewayUrl);
      
          // Check if the response status is OK (200)
          if (response.status === 200) {
            // If the status is 200, set the verification result to 'Verified successfully'
            window.open(ipfsGatewayUrl, '_blank');

            setVerificationResult('Verified successfully');
            
          } else {
            // If the status is not 200, set the verification result to 'Unauthorized hash'
            setVerificationResult('Unauthorized hash');
          }
        } catch (error) {
          console.error('Error verifying hash:', error);
      
          // If there's an issue, set the verification result to 'Unauthorized hash'
          setVerificationResult('Unauthorized hash');
        }
      };
      
            setVerificationResult('Verified successfully');

          } else {
            // If the status is not 200, set the verification result to 'Unauthorized hash'
            setVerificationResult('Unauthorized hash');
          }
        } catch (error) {
          console.error('Error verifying hash:', error);
      
          // If there's an issue, set the verification result to 'Unauthorized hash'
          setVerificationResult('Unauthorized hash');
        }
      };
      
      
    const boxStyle = {
        boxShadow: '1px 2px 2px black',
    };

    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
            <div className='40-w p-5 rounded bg-white' style={boxStyle}>
                <form style={{ backgroundColor: "white" }}>
                    <h3 style={{ backgroundColor: "white" }}>Document Verification</h3>
                    <div className='mb-2' style={{ backgroundColor: "white" }}>
                        <input
                            type="text"
                            placeholder='Enter the Hash'
                            className='form-control'
                            value={hashInput}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='d-grid' style={{ backgroundColor: "white" }}>
                        <button className='btn btn-primary' onClick={submit}>Verify</button>
                    </div>
                </form>
                {/* Display the verification result */}
                {verificationResult && (
                    <div style={{ backgroundColor: "white" }}>
                        <p style={{ backgroundColor: "white",color:"red" }}>{verificationResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserVerification;
