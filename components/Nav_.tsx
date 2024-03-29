import {
  faAdd,
  faCog,
  faEnvelope,
  faNewspaper,
  faPaperPlane,
  faPowerOff,
  faQrcode,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { signOut_, useAuth } from "../firebase";
import { useRecoilState } from "recoil";
import { HoverState, NotifState, OpenState, ThisState } from "./atoms/atoms";
import Router from "next/router";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [notif_, setNotif_] = useRecoilState(NotifState);
  const [hoverData_, setHoverData_] = useRecoilState(HoverState);
  

  const currentUser_ = useAuth();

  const runNotif_ = (notification: string) => {
    setNotif_(notification);
    setTimeout(() => {
      return setNotif_("");
    }, 2500);
  };

  return (
    <div className={`md:w-[60px] min-w-0 md:h-[350px] h-[60px] fixed md:bottom-auto bottom-0 md:left-0 m-4 flex w-full min-h-0 justify-center items-center`}>
      <div
        className={`md:w-[60px] min-w-0 md:h-[350px] h-[60px] rounded-lg shadow-sm bg-white/60 backdrop-blur-md md:flex-col flex-row justify-center items-center flex`}
      >
        {/* <div
        className={`w-[80px] h-[120px] md:relative md:pointer-events-auto absolute pointer-events-none flex flex-row justify-center items-center`}
      ></div> */}
        {/* <div
        className={`w-[80px] h-[1px] flex flex-row justify-center items-center bg-black/0 mb-8 mt-4`}
      /> */}
        {[
          {
            icon: open_ ? faTimes: faQrcode,
            action: "navigate to homepage",
            element: "Home",
            alt: currentUser_ != null ? "" : "auth",
          },
          {
            icon: faAdd,
            action: "add accom modal",
            element: "Create",
            alt: currentUser_ != null ? "create" : "auth",
          },
          {
            icon: faPaperPlane,
            action: "popup filters",
            element: "Requests",
            alt: currentUser_ != null ? "" : "auth",
          },
          {
            icon: faCog,
            action: "settings",
            element: "Settings",
            alt: currentUser_ != null ? "" : "auth",
          },
          {
            icon: currentUser_ != null ? faPowerOff : faUser,
            action: "authentication",
            element: "Auth",
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
                onMouseEnter={() => {
                  setHoverData_(obj.element);
                }}
                onMouseLeave={() => {
                  setHoverData_("");
                }}
                onClick={async () => {
                  if (obj.alt == "auth" && currentUser_ != null) {
                    await signOut_().then((obj__) => {
                      runNotif_("User signed out");
                      setShowThis_("auth");
                    });
                  } else if (obj.action == "navigate to homepage") {
                    setOpen_(false)
                    setShowThis_("");
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
    </div>
  );
};

export default Nav_;
