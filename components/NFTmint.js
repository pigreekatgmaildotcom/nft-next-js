import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { contractAddresses, abi } from "../constants";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function NFTmint() {
  const { account, isWeb3Enabled, chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);
  const enneeffettiAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

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

  const [mintFee, setMintFee] = useState("0");
  const [numNFT, setNumNFT] = useState("0");

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

  const { runContractFunction: getMintFee } = useWeb3Contract({
    abi: abi,
    contractAddress: enneeffettiAddress,
    functionName: "getMintFee",
    params: {},
  });

  const { runContractFunction: getTokenCounter } = useWeb3Contract({
    abi: abi,
    contractAddress: enneeffettiAddress,
    functionName: "getTokenCounter",
    params: {},
  });

  const {
    runContractFunction: mintNft,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: enneeffettiAddress,
    functionName: "mintNft",
    msgValue: mintFee,
    params: {},
  });

  async function updateUIValues() {
    const mintFeeFromCall = (await getMintFee()).toString();
    const numNFTFromCall = (await getTokenCounter()).toString();
    setMintFee(mintFeeFromCall);
    setNumNFT(numNFTFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled && enneeffettiAddress) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="p-5">
      <div class="tracking-wide font-sans text-4xl lg:text-7xl text-indigo-700 font-semibold text-center">
        eNneeFfeTti
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
                  Enneeffetti
                </div>
                <div>
                  <p class="block mt-1 text-lg leading-tight font-medium text-black">
                    Il tuo fantastico NFT
                  </p>
                  <p class="mt-2 text-slate-500 text-justify">
                    Questo NFT è rappresentativo di un&apos;opera originale che
                    vive solo nel mondo digitale decentralizzato. L'opera
                    trasmette una vibrante energia che scaturisce
                    dall’interazione delle forme geometriche rappresentate. Sono
                    stati coniati complessivamente {numNFT} NFT rappresentativi
                    di quest’opera. Il costo dell’NFT è di{" "}
                    {ethers.utils.formatUnits(mintFee, "ether")} {currName}.
                    Clicca sotto per coniare subito il tuo!
                  </p>
                  <br></br>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async function () {
                      await mintNft({
                        // onComplete:
                        // onError:
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                      });
                      console.log("Mint");
                    }}
                    disabled={isLoading || isFetching}
                  >
                    {isLoading || isFetching ? (
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
        </div>
      ) : (
        <div>No address detected</div>
      )}
    </div>
  );
}
