import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    //window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.web3.currentProvider);
} else {
    // section in building ...
    const provider = new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_GORLI_URL
    );
    web3 = new Web3(provider);
}

export default web3;