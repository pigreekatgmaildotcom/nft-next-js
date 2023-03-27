import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="shadow-lg shadow-black/40 flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="py-3 px-4 font-blog text-2xl text-white">NFT</h1>
      <div className="py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
