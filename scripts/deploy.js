const hre = require("hardhat");

async function main() {
  
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  // // Wait for the deployment transaction to be mined
  await upload.deployTransaction.waitConfirmations(1);

  // console.log("Library deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
