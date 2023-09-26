import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    const boxStyle = {
        boxShadow: '1px 2px 2px black', // Adjust the shadow values as needed
      };

  return (
    <div>
      <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className='40-w p-5 rounded bg-white' style={{ marginRight: '90px',...boxStyle }}>
          <Link to="/register" style={{textDecoration:"none",fontWeight:"bold"}}>
            <p className='text-grid' style={{textDecoration:"none",color:"black",backgroundColor:"white"}}>Continue as Admin</p>
          </Link>
        </div>
        <div className='40-w p-5 rounded bg-white' style={{ marginLeft: '90px',...boxStyle }}>
          <Link to="/userVerification" style={{textDecoration:"none",fontWeight:"bold"}}>
            <p className='text-grid' style={{textDecoration:"none",color:"black",backgroundColor:"white"}} >Continue as regular User</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
