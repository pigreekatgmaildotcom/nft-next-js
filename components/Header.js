import { ConnectButton } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";

export default function Header() {
  const { chainId } = useMoralis();
  const supportedChains = ["31337", "5", "80001", "43113"];

  var blockchainName = "";

  switch (parseInt(chainId)) {
    case 31337:
      blockchainName = "Locale";
      break;
    case 5:
      blockchainName = "Goerli (Ethereum)";
      break;
    case 80001:
      blockchainName = "Mumbai (Polygon)";
      break;
    case 43113:
      blockchainName = "Fuji (Avalanche)";
      break;
    default:
      blockchainName = "NFT";
  }

  return (
    <div className="shadow-lg shadow-black/40 flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="py-3 px-4 font-blog text-lg text-white">
        {blockchainName}
      </h1>
      <div className="py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
