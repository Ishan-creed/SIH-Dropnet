import moment from 'moment'
import styles from '../assets/styles/certificateGenerator.module.scss'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ethers } from "ethers";
import Upload from '../../src/artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
import QRCode from 'qrcode.react';
import { useRef } from 'react'

const Certificate = ({ name, course, dateOfConductStart, dateOfConductEnd, signature, signatureDetails }) => {

    const qrCodeRef = useRef();

    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [modelOpen, setModelOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Selected");
    const [hash, setHash] = useState("");
    const [fileLink, setFileLink] = useState("");
    const [cid, setCid] = useState('');
    const [isCidAdded, setIsCidAdded] = useState(false);

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


    const downloadPDF = async (e) => {
        const certificateContainer = document.getElementById('new');
        console.log('Certificate container:', certificateContainer);
        html2canvas(certificateContainer).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Assuming A4 size
            if (isCidAdded) {
                pdf.text(`CID: ${cid}`, 10, 280); // Add CID to the PDF
              }
            const pdfFileName = `certificate_${hash}.pdf`;
            // Download the PDF with a specific file name
            pdf.save(pdfFileName);
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (file) {

            try {

                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `1d007ed7e2ba8579e307`,
                        pinata_secret_api_key: `36747f49b010655ae70f2ec23d3be35124899c2f3cef61a64666536012f91c40`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                const myHash = resFile.data.IpfsHash;
                // const signer = contract.connect(provider.getSigner());
                console.log(ImgHash);

                setCid(myHash);

                // Update isCidAdded to true
                setIsCidAdded(true);
                contract.add(account, ImgHash);
                setHash(myHash)



                const fileLink = `https://gateway.pinata.cloud/ipfs/${myHash}`;

                // Update the fileLink state
                setFileLink(fileLink);

                downloadPDF();



                alert("Successfully Image has been Uploaded");
                setFileName("No Image Selected");
                setFile(null);

            } catch (error) {
                alert("Unable to upload the image to Pinata");
            }

        }
    };

    const retrieveFile = (e) => {

        const data = e.target.files[0]; // Array of file's objects #$@


        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };





    //    const downloadQRCode = () => {
    //     // Check if qrCodeRef.current is defined
    //     if (qrCodeRef.current) {
    //       // Get the QR code as a data URI
    //       const qrCodeDataURI = qrCodeRef.current.toDataURL();

    //       // Create an <a> element to trigger the download
    //       const link = document.createElement('a');
    //       link.href = qrCodeDataURI;

    //       link.download = 'qrcode.png'; // You can set the file name here
    //       document.body.appendChild(link);

    //       // Trigger the download
    //       link.click();

    //       // Clean up by removing the <a> element
    //       document.body.removeChild(link);
    //     }
    //   };


    return (
        <>
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "95px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "35px" }} />
            <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "35px" }} />


            <div className={styles.certificateWrapper} style={{ backgroundColor: "white" }}>

                <div className={styles.certificateContainer} style={{ backgroundColor: "white" }} id="new">

                    <p style={{ color: "black", backgroundColor: "white" }}>{account ? account : "Account not connected..."}</p>

                    <div style={{ backgroundColor: "white" }}>Logo Here</div>

                    <h1 style={{ backgroundColor: "white" }}>CERTIFICATE OF APPRECIATION</h1>

                    <span style={{ backgroundColor: "white" }} className={styles.smallText}>This certificate is proudly awarded to</span>

                    <p style={{ backgroundColor: "white" }} className={styles.primaryItalicText}>{name}</p>

                    <span style={{ backgroundColor: "white" }} className={styles.smallText}>for successfully completing the course</span>


                    <h2 style={{ backgroundColor: "white" }}>{course}</h2>

                    <span style={{ backgroundColor: "white" }} className={styles.smallText}>{`conducted from ${dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
                        } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>

                    <div style={{ backgroundColor: "white" }} className={styles.signatureBlock}>
                        <img className={styles.signatureImage} src={signature.preview} alt='' />

                        <span className={styles.horizontalBar} />

                        <span style={{ backgroundColor: "white" }} className={styles.smallText}>{signatureDetails}</span>

                        {isCidAdded && (
                            <span style={{ backgroundColor: "white" }} className={styles.smallText}>
                                CID: {cid}
                            </span>
                        )}
                    </div>
                </div>

                {/* Display the CID */}
                {/* <span style={{ backgroundColor: "white" }} className={styles.smallText}>
                 CID: {hash}
          </span>

          {/* Display the file link */}
                {/* <span style={{ backgroundColor: "white" }} className={styles.smallText}>
            File Link: <a href={fileLink} target="_blank" rel="noopener noreferrer">{fileLink}</a>
          </span> */}

                {/* Display the QR code with CID and file link */}

                {/* Button to download the QR code */}

                <div style={{ display: "flex", flexDirection: "row", backgroundColor: "white" }}>
                    <form className='form' onSubmit={handleSubmit} style={{ backgroundColor: "white", marginTop: "30px" }} >
                        <label htmlFor='file-upload' className='choose' style={{ backgroundColor: "white" }}>
                            Choose File
                        </label>
                        <input disabled={!account} type="file" id='file-upload' name='data' onChange={retrieveFile} />
                        <span style={{ backgroundColor: "white", color: "black" }} className='textArea'>Image: {fileName}</span>
                        <button style={{ marginTop: "20px" }} type='submit' className="upload" disabled={!file}>Upload</button>
                    </form>
                    <QRCode value={`CID: ${hash}\nFile Link: ${fileLink}`} ref={qrCodeRef} style={{ marginTop: "35px", marginLeft: "100px" }} />

                </div>
                <button style={{ marginTop: '3rem' }} onClick={downloadPDF} >
                    Download PDF
                </button>


            </div>

        </>
    )
}

export default Certificate