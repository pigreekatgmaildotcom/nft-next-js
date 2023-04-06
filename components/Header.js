import { ConnectButton, CryptoLogos } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";

export default function Header() {
  const { chainId } = useMoralis();

  var blockchainName = "";
  var name = false;

  switch (parseInt(chainId)) {
    case 31337:
      blockchainName = "ethereum";
      name = true;
      break;
    case 5:
      /*blockchainName = "Goerli (Ethereum)";*/
      blockchainName = "ethereum";
      name = true;
      break;
    case 80001:
      /*blockchainName = "Mumbai (Polygon)";*/
      blockchainName = "polygon";
      name = true;
      break;
    case 43113:
      /*blockchainName = "Fuji (Avalanche)";*/
      blockchainName = "avalanche";
      name = true;
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
      <div className="py-2 px-4 flex">
        {name ? (
          <CryptoLogos
            chain={blockchainName}
            onClick={function noRefCheck() {}}
            size="40px"
          />
        ) : (
          <div className="py-1 px-2 font-blog text-lg text-white">
            Enneeffeti
          </div>
        )}
      </div>
      <div className="py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
