import Head from "next/head";
import Header from "../components/Header";
import NFTmint from "../components/NFTmint";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";
import { supportedChains } from "../constants";

const inter = Inter({ subsets: ["latin"] });
//const supportedChains = ["31337", "5", "80001", "43113"];

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (
    <div className={styles.container}>
      <Head>
        <title>Enneffetti</title>
        <meta name="description" content="Enneeffetti" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="flex flex-row justify-center">
              <NFTmint className="p-8" />
            </div>
          ) : (
            <div>{`Errore: rete non supportata. Passa a Goerli, Mumbai o Fuji`}</div>
          )}
        </div>
      ) : (
        <div>Please connect to a Wallet</div>
      )}
    </div>
  );
}
