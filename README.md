# html-fund-me-fcc
This is a simple FrontEnd implementation of a fund-me dApp from Patrick Alpha's Free Code Camp course.

In this project we are implementing a simple webpage that allows the users to interact with the Backend Smart Contracts.

The workshop followed to complete this repo is [this one](https://github.com/PatrickAlphaC/html-fund-me-fcc).
The repo that we are going to implement is like [this one](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=15996s).

# Project

The project is form by 4 JavaScript files:

- [constants.js](https://github.com/JMariadlcs/html-fund-me-fcc/blob/main/constants.js): used to include the Smart Contract Address and ABI that we are using to execute transactions from the backend part.
- [ethers-5.6.esm.min.js](https://github.com/JMariadlcs/html-fund-me-fcc/blob/main/ethers-5.6.esm.min.js): used to work with ethers from the web part.
- [index.js](https://github.com/JMariadlcs/html-fund-me-fcc/blob/main/index.js): used to define all the functions that the frontend is executing.
- [index.html](https://github.com/JMariadlcs/html-fund-me-fcc/blob/main/index.html): html part of our webpage.

# Requirements and dependencies

To communicate with the backend we should install hardhat by:
```bash
yarn hardhat
```

The rest of dependencies should be done in the backend part.


## How to run
- We are running in a local environment (local host - hardhat development network).

The part that must be running in our local node is the backend part so we must navigate using the terminal to the backend directory and execute:
```bash
yarn hardhat node
```

Once our localhost node is running the Smart Contracts are also deployed locally so we can work with their addresses and ABIs.