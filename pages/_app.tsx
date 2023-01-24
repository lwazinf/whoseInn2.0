import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav_ from "../components/Nav_";
import Accoms_ from "../components/Accom_";
import Auth_ from "../components/Auth_";
import Create_ from "../components/Create_";
import PopupModal_ from "../components/PopupModal_";
import { useEffect } from "react";
import { getLocations } from "../firebase";
import { useRecoilState } from "recoil";
import { CacheState } from "../components/atoms/atoms";
import NavNotif_ from "../components/NavNotif_";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <RecoilRoot>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>WhoseInn :: Welcome</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <Accoms_/>
        <Create_/>
        <Auth_/>
        <NavNotif_/>
        <Nav_/>
        <PopupModal_/>
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
