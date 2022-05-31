// This file is used to include every functiion used in our webpage.

import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
       await window.ethereum.request({method: "eth_requestAccounts"})
       connectButton.innerHTML = "Connected!"
    } else {
        fundButton.innerHTML = "Please install MetaMask!!"
    }
}

// getBalance function
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
      } catch (error) {
        console.log(error)
      }
    } else {
      balanceButton.innerHTML = "Please install MetaMask"
    }
  }

// fund function
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        /**  we need:
        * - provier -> connection to the blockchain
        * - signer / wallet / someone with gas
        * cotract to interact with: contractAddress + ABI
        */

        // get provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)

        // get contractAddress and ABI (inside constants.js file)
        const contract = new ethers.Contract(contractAddress, abi, signer)

        // we can now start making transactions
        try {
            const transactionResponse = await contract.fund({
              value: ethers.utils.parseEther(ethAmount),gasLimit: 9999999})

             //listen for the tx to be mined
             await listenForTransactionMine(transactionResponse, provider)
             console.log("Done!")
          } catch (error) {
            console.log(error)
          }
    }
}

// withdraw function
async function withdraw() {
    console.log(`Withdrawing...`)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.withdraw({gasLimit: 9999999})
        await listenForTransactionMine(transactionResponse, provider)
      } catch (error) {
        console.log(error)
      }
    } else {
      withdrawButton.innerHTML = "Please install MetaMask"
    }
  }

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)

    /** create a listener for the blockchain -> to listen transaction to finish
    * We are using provider.once -> 1st parameter: the transaction we are waiting to be finished. 2nd parameter: the function
    * we want to be executed one the transaction has finished (() => {} anonymous function)
    * We are using Promise to wait until .once is finished
    */
   return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
            resolve()
        })
    })
}