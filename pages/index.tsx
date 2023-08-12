import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  CacheState,
  ThisState,
  FocusState,
  DeleteState,
  OpenState,
} from "../components/atoms/atoms";
import { useEffect, useState } from "react";
import { auth, db, getLocations } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEye,
  faPencil,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc } from "firebase/firestore";
import Router from "next/router";

const Home: NextPage = () => {
  const [cache_, setCache_] = useRecoilState(CacheState);

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
          className={`m-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex flex-col items-center justify-center`}
        >
          {cache_?.map((obj) => {
            return <Setup_ obj_={obj} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

interface Setup_Props {
  obj_: any;
}

const Setup_ = ({ obj_: obj }: Setup_Props) => {
  const [mouseStatus_, setMouseStatus_] = useState(false);
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [delete_, setDelete_] = useRecoilState(DeleteState);

  const [open_, setOpen_] = useRecoilState(OpenState)

  const deleteThis_ = async (id_: any) => {
    await deleteDoc(doc(db, "suppliers", id_));
    Router.reload();
  };
  return (
    <div className={`flex min-w-0 h-[200px] flex-col relative`}>
      <div
        // @ts-ignore
        className={`w-[350px] h-[200px] 
                  hover:bg-black
                 rounded-lg backdrop-blur-ls shadow-sm overflow-hidden relative transition-all duration-800 p-[1px] ${
                   mouseStatus_ ? "blur-md opacity-100" : "blur-none opacity-0"
                 }`}
        onClick={() => {
          // setShowThis_("accom");
          // setFocus_(obj);
        }}
        // @ts-ignore
        key={obj?.uid}
      >
        {/* @ts-ignore */}
        <img
          className={`w-full h-full object-cover rounded-lg`}
          // @ts-ignore
          src={obj?.image}
        />
      </div>
      <div
        className={`h-[225px] w-full flex flex-col justify-end items-center absolute ${
          mouseStatus_
            ? "bottom-[-25px] opacity-100"
            : "opacity-0 bottom-[-15px]"
        } transition-all duration-200`}
      >
        <p className={`font-black text-[13px] text-black/50 absolute`}>
          {obj.name}
        </p>
        <p className={`font-normal text-[11px] text-black/30 absolute bottom-[-20px]`}>
          {obj.desc}
          
        </p>
      </div>
      <div
        // @ts-ignore
        className={`w-[350px] h-[200px] 
                 rounded-lg backdrop-blur-ls shadow-sm overflow-hidden opacity-80 hover:opacity-100 transition-all duration-800 hover:p-[1px] p-[3px] absolute
                 `}
        onClick={() => {
          // setShowThis_("accom");
        }}
        // @ts-ignore
        key={obj?.uid}
        onMouseEnter={() => {
          setMouseStatus_(true);
        }}
        onMouseLeave={() => {
          setMouseStatus_(false);
        }}
      >
        {/* @ts-ignore */}
        <img
          className={`w-full h-full object-cover rounded-lg`}
          // @ts-ignore
          src={obj?.image}
        />
        <div
          className={`min-w-2 min-h-2 px-1 pt-1 rounded-[7px] bg-white/60 backdrop-blur-lg absolute bottom-0 right-0 m-3 ${
            // @ts-ignore
            delete_ == obj.id
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          <FontAwesomeIcon
            icon={faEye}
            className={`w-[15px] h-[15px] text-black/70   cursor-pointer my-1 hover:text-black transition-all duration-200`}
            onClick={() => {
              // setShowThis_("accom");
              setFocus_(obj);
              setOpen_(true)
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={`w-[15px] h-[15px] text-black/70  cursor-pointer my-2 hover:text-black transition-all duration-200`}
            onClick={() => {
              // @ts-ignore
              setDelete_(obj?.id);
            }}
            onMouseEnter={() => {}}
          />
        </div>
        <div
          // @ts-ignore
          className={`w-full h-full absolute top-0 justify-center items-center flex flex-row pt-[50px]  transition-all duration-200 ${
            // @ts-ignore
            delete_ == obj?.id
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <p
            className={`text-[15px] text-center font-black text-black/80 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-lg`}
          >
            Delete item?
          </p>
        </div>
        <div
          // @ts-ignore
          className={`w-full h-full absolute top-0 left-0 flex flex-row justify-center items-center pt-[150px] pb-[25px] pl-[122px] pr-[114px] transition-all duration-200 ${
            // @ts-ignore
            delete_ == obj?.id
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`w-full h-full flex flex-row justify-center items-center rounded-lg transition-all duration-200 relative overflow-hidden`}
          >
            <div
              className={`w-full h-full hover:bg-red-100/10 bg-white/60 backdrop-blur-lg flex flex-row justify-center items-center rounded-l-[4px] transition-all duration-200 cursor-pointer text-black/50 hover:text-white/50`}
              onClick={() => {
                setDelete_("");
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <FontAwesomeIcon icon={faTimes} className={`w-[25px] h-[25px]`} />
            </div>

            <div className={`w-2 h-full`} />

            <div
              className={`w-full h-full hover:bg-white/10 bg-white/60 backdrop-blur-lg flex flex-row justify-center items-center rounded-r-[4px] transition-all duration-200 cursor-pointer text-black/50 hover:text-white/50`}
              onClick={() => {
                // @ts-ignore
                deleteThis_(obj?.id);
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <FontAwesomeIcon icon={faCheck} className={`w-[25px] h-[25px]`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
