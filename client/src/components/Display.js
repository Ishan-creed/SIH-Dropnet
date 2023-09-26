import React from 'react'
import { useState } from 'react';
import './Display.css';

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getData = async () => {

    let dataArray;

    const Otheraddress = document.querySelector(".address").value;

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
      <div className='image-list'>{data}</div>
      <input type='text' placeholder='Enter Address' className='address' />
      <button className='center button' onClick={getData}>Get Data</button>
    </div>
  )
}

export default Display;
