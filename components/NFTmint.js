import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import {
  contractAddressesEnneeffeti,
  abiEnneeffeti,
  contractAddressesSticker,
  abiSticker,
} from "../constants";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function NFTmint() {
  const { account, isWeb3Enabled, chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);
  console.log(chainId);
  console.log(contractAddressesEnneeffeti);
  const enneeffettiAddress =
    chainId in contractAddressesEnneeffeti
      ? contractAddressesEnneeffeti[chainId][0]
      : null;

  const stickerAddress =
    chainId in contractAddressesSticker
      ? contractAddressesSticker[chainId][0]
      : null;

  var currName = "";

  switch (chainId) {
    case 31337:
      currName = "ETH";
      break;
    case 5:
      currName = "ETH";
      break;
    case 80001:
      currName = "MATIC";
      break;
    case 43113:
      currName = "AVAX";
      break;
    default:
      currName = "ETH";
  }

  const [mintFeeEnneeffeti, setMintFeeEnneeffeti] = useState("0");
  const [numNFTEnneeffeti, setNumNFTEnneeffeti] = useState("0");
  const [mintFeeSticker, setMintFeeSticker] = useState("0");
  const [numNFTSticker, setNumNFTSticker] = useState("0");

  const dispatch = useNotification();

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUIValues();
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const { runContractFunction: getMintFeeEnneeffeti } = useWeb3Contract({
    abi: abiEnneeffeti,
    contractAddress: enneeffettiAddress,
    functionName: "getMintFee",
    params: {},
  });

  const { runContractFunction: getMintFeeSticker } = useWeb3Contract({
    abi: abiSticker,
    contractAddress: stickerAddress,
    functionName: "getMintFee",
    params: {},
  });

  const { runContractFunction: getTokenCounterEnneeffeti } = useWeb3Contract({
    abi: abiEnneeffeti,
    contractAddress: enneeffettiAddress,
    functionName: "getTokenCounter",
    params: {},
  });

  const { runContractFunction: getTokenCounterSticker } = useWeb3Contract({
    abi: abiSticker,
    contractAddress: stickerAddress,
    functionName: "getTokenCounter",
    params: {},
  });

  const {
    runContractFunction: mintNftEnneeffeti,
    data: enterTxResponseE,
    isLoadingE,
    isFetchingE,
  } = useWeb3Contract({
    abi: abiEnneeffeti,
    contractAddress: enneeffettiAddress,
    functionName: "mintNft",
    msgValue: mintFeeEnneeffeti,
    params: {},
  });

  const {
    runContractFunction: mintNftSticker,
    data: enterTxResponseS,
    isLoadingS,
    isFetchingS,
  } = useWeb3Contract({
    abi: abiSticker,
    contractAddress: stickerAddress,
    functionName: "mintNft",
    msgValue: mintFeeSticker,
    params: {},
  });

  async function updateUIValues() {
    const mintFeeEnneeffetiFromCall = (await getMintFeeEnneeffeti()).toString();
    const numNFTEnneeffetiFromCall = (
      await getTokenCounterEnneeffeti()
    ).toString();
    const mintFeeStickerFromCall = (await getMintFeeSticker()).toString();
    const numNFTStickerFromCall = (await getTokenCounterSticker()).toString();
    setMintFeeEnneeffeti(mintFeeEnneeffetiFromCall);
    setNumNFTEnneeffeti(numNFTEnneeffetiFromCall);
    setMintFeeSticker(mintFeeStickerFromCall);
    setNumNFTSticker(numNFTStickerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled && enneeffettiAddress && stickerAddress) {
      updateUIValues();
    }
  }, [isWeb3Enabled, chainIdHex]);

  return (
    <div className="p-5">
      <div class="tracking-wide font-sans text-3xl lg:text-6xl text-indigo-700 font-semibold text-center">
        ENNE EFFE TI
      </div>
      <br></br>
      <div class="block mt-1 text-2xl lg:text-3xl font-sans leading-tight text-black text-center">
        Il tuo biglietto di ingresso per il mondo Web3
      </div>
      <br></br>
      <br></br>
      {enneeffettiAddress ? (
        <div className="">
          <div class="max-w-lg mx-auto bg-white rounded-xl shadow-2xl shadow-black/40 overflow-hidden lg:max-w-4xl">
            <div class="lg:flex">
              <div class="lg:shrink-0">
                <img
                  class="h-100 w-full object-cover lg:h-full lg:w-96"
                  src="Enneeffetti.png"
                  alt="Passaporto per il Web3"
                ></img>
              </div>
              <div class="p-8 justify-center">
                <div class="uppercase tracking-wide text-lg text-indigo-700 font-semibold">
                  ENERGY
                </div>
                <div>
                  <p class="block mt-1 text-lg leading-tight font-medium text-black">
                    NFT come arte
                  </p>
                  <p class="mt-2 text-slate-500 text-justify">
                    Questo NFT è rappresentativo di un&apos;opera originale che
                    vive solo nel mondo digitale decentralizzato. L&apos;opera
                    trasmette una vibrante energia che scaturisce
                    dall&apos;interazione delle forme geometriche rappresentate.
                    Sono stati coniati complessivamente {numNFTEnneeffeti} NFT
                    rappresentativi di quest&apos;opera. Il costo dell&apos;NFT
                    è di {ethers.utils.formatUnits(mintFeeEnneeffeti, "ether")}{" "}
                    {currName}. Clicca sotto per coniare subito il tuo!
                  </p>
                  <br></br>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async function () {
                      await mintNftEnneeffeti({
                        // onComplete:
                        // onError:
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                      });
                      console.log("Mint");
                    }}
                    disabled={isLoadingE || isFetchingE}
                  >
                    {isLoadingE || isFetchingE ? (
                      <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                    ) : (
                      "Conia il mio NFT"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <br></br>
          <div class="max-w-lg mx-auto bg-white rounded-xl shadow-2xl shadow-black/40 overflow-hidden lg:max-w-4xl">
            <div class="lg:flex">
              <div class="lg:shrink-0">
                <img
                  class="h-100 w-full object-cover lg:h-full lg:w-96"
                  src="champion.svg"
                  alt="Passaporto per il Web3"
                ></img>
              </div>
              <div class="p-8 justify-center">
                <div class="uppercase tracking-wide text-lg text-indigo-700 font-semibold">
                  CHAMPION
                </div>
                <div>
                  <p class="block mt-1 text-lg leading-tight font-medium text-black">
                    NFT come elemento di coinvolgimento
                  </p>
                  <p class="mt-2 text-slate-500 text-justify">
                    Questo NFT è un badge riservato esclusivamente ai campioni.
                    E&apos; numerato, quindi è unico come unico sei tu. Sono
                    stati coniati complessivamente {numNFTSticker} NFT
                    rappresentativi di questo badge. Cosa aspetti ad entrare
                    anche tu nel club? Il costo dell&apos;NFT è di{" "}
                    {ethers.utils.formatUnits(mintFeeSticker, "ether")}{" "}
                    {currName}. Clicca sotto per coniare subito il tuo!
                  </p>
                  <br></br>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async function () {
                      await mintNftSticker({
                        // onComplete:
                        // onError:
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                      });
                      console.log("Mint");
                    }}
                    disabled={isLoadingS || isFetchingS}
                  >
                    {isLoadingS || isFetchingS ? (
                      <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                    ) : (
                      "Conia il mio NFT"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No address detected</div>
      )}
    </div>
  );
}
