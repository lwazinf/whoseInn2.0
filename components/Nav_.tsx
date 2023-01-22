import {
  faAdd,
  faCog,
  faEnvelope,
  faNewspaper,
  faPowerOff,
  faQrcode,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { signOut_, useAuth } from "../firebase";
import { useRecoilState } from "recoil";
import { ThisState } from "./atoms/atoms";
import Router from "next/router";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);

  const currentUser_ = useAuth();

  return (
    <div
      className={`w-[80px] h-[550px] rounded-lg shadow-sm bg-white/60 backdrop-blur-md fixed left-0 m-4 flex flex-col justify-start items-center`}
    >
      <div
        className={`w-[80px] h-[120px] flex flex-row justify-center items-center`}
      ></div>
      {/* <div
        className={`w-[80px] h-[1px] flex flex-row justify-center items-center bg-black/0 mb-8 mt-4`}
      /> */}
      {[
        { icon: faQrcode, action: "navigate to homepage", alt: "" },
        { icon: faAdd, action: "add accom modal", alt: currentUser_ != null ? "create" : "auth" },
        { icon: faEnvelope, action: "popup filters", alt: "" },
        { icon: faCog, action: "settings", alt: "" },
        {
          icon: currentUser_ != null ? faPowerOff : faUser,
          action: "authentication",
          alt: "auth",
        },
      ].map((obj) => {
        return (
          <div
            className={`w-[80px] h-[60px] flex flex-row justify-center items-center my-[1px]`}
            key={obj.action}
          >
            <div
              className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200`}
              onClick={async () => {
                if (obj.alt == "auth" && currentUser_ != null) {
                  await signOut_().then((obj__) => {
                    console.log("User signed out");
                  });
                } else {
                  setShowThis_(obj.alt);
                  if (obj.alt == "") {
                    Router.push("/");
                  }
                }
              }}
            >
              <FontAwesomeIcon
                icon={obj.icon}
                className={`w-[20px] h-[20px]`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Nav_;
