import Head from "next/head";
import Header from "../components/Header";
import NFTmint from "../components/NFTmint";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";
import { supportedChains } from "../constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  return (
    <div className={styles.container}>
      <Head>
        <title>Enneffetti</title>
        <meta name="description" content="Enneeffetti" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/NFTLogo.png" />
      </Head>
      <Header></Header>
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className="flex flex-row justify-center">
              <NFTmint className="p-8" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div>
                <div className="text-center tracking-wide font-sans text-4xl lg:text-7xl text-indigo-700 font-semibold">
                  {`Oooops! :-(`}
                </div>
                <div className="py-4 text-md lg:text-2xl font-sans leading-tight text-black text-center">
                  Rete non supportata. Passa a Goerli, Mumbai o Fuji
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div>
            <div className="text-center tracking-wide font-sans text-4xl lg:text-5xl text-indigo-700 font-semibold">
              Per cominciare...
            </div>
            <div className="py-10 text-4xl lg:text-5xl font-sans leading-tight text-black text-center">
              ...collega un wallet!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
