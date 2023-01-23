import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { CacheState, ThisState, FocusState } from "../components/atoms/atoms";
import { useEffect } from "react";
import { getLocations } from "../firebase";

const Home: NextPage = () => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
  useEffect(() => {
    const y_ = async () => {
      const x_ = await getLocations();
      // @ts-ignore
      setCache_(x_);
    };
    y_();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3x0RxMZbl6LRapAhKlegw6Xmp9rupr0g&libraries=places"></script>
      <main className="flex w-full h-full flex-col items-center justify-center text-center">
        <div
          className={`m-auto grid grid-cols-3 gap-4 flex flex-col items-center justify-center`}
        >
          {cache_?.map((obj) => {
            return (
              <div
                className={`w-[350px] h-[200px] bg-white rounded-lg shadow-sm cursor-pointer overflow-hidden relative opacity-80 hover:opacity-100 transition-all duration-200 p-1`}
                onClick={() => {
                  setShowThis_("accom");
                  setFocus_(obj);
                }}
                key={obj}
              >
                {/* @ts-ignore */}
                <img
                  className={`w-full h-full object-cover rounded-lg`}
                  // @ts-ignore
                  src={obj?.image}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
