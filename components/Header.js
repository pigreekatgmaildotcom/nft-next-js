import { ConnectButton, CryptoLogos } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";

export default function Header() {
  const { chainId } = useMoralis();

  var blockchainName = "";

  switch (parseInt(chainId)) {
    case 31337:
      blockchainName = "ethereum";
      name = "Local";
      break;
    case 5:
      /*blockchainName = "Goerli (Ethereum)";*/
      blockchainName = "ethereum";
      name = "Goerli";
      break;
    case 80001:
      /*blockchainName = "Mumbai (Polygon)";*/
      blockchainName = "polygon";
      name = "Mumbai";
      break;
    case 43113:
      /*blockchainName = "Fuji (Avalanche)";*/
      blockchainName = "avalanche";
      name = "Fuji";
      break;
    default:
      blockchainName = "ethereum";
  }

  <CryptoLogos
    chain="polygon"
    onClick={function noRefCheck() {}}
    size="48px"
  />;

  return (
    <div className="shadow-lg shadow-black/40 flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1>
        <div className="py-2 px-4 flex">
          <CryptoLogos
            chain={blockchainName}
            onClick={function noRefCheck() {}}
            size="40px"
          />
          <div className="px-3 py-1 font-blog text-xl text-white">{name}</div>
        </div>
      </h1>
      <div className="py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
