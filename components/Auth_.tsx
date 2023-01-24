import { useRecoilState } from "recoil";
import { IsSignInState, NotifState, ThisState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faHeart,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signIn_, signUp_ } from "../firebase";
import Router from "next/router";

interface Auth_Props {}

const Auth_ = ({}: Auth_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  // const [currentUser_, setCurrentUser_] = useRecoilState();
  return (
    <div
      className={`w-full min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        showThis_ == "auth"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[750px] h-[450px] bg-white backdrop-blur-md rounded-lg shadow-sm relative overflow-hidden`}
      >
        <div className={`w-[300px] h-[450px] absolute top-0`}>
          <img
            className={`h-full w-full object-cover`}
            src={`https://images.pexels.com/photos/4939668/pexels-photo-4939668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
          />
        </div>
        <Gateway_ />
        <div
          className={`w-[50px] h-[450px] absolute right-0 flex flex-col justify-end items-center py-4 bg-white`}
        >
          {/* {[
            // faArrowRight
          ].map((obj) => {
            return (
              <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 my-2`}
                onClick={() => {}}
                key={obj.iconName}
              >
                <FontAwesomeIcon icon={obj} className={`w-[20px] h-[20px]`} />
              </div>
            );
          })} */}
        </div>
        <div
          className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 absolute top-0 right-0 m-4`}
          onClick={() => {
            setShowThis_("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} className={`w-[20px] h-[20px]`} />
        </div>
      </div>
    </div>
  );
};

export default Auth_;

interface Gateway_Props {}

const Gateway_ = ({}: Gateway_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [notif_, setNotif_] = useRecoilState(NotifState);
  const [isSignIn_, setIsSignIn_] = useRecoilState(IsSignInState);
  const [password_, setPassword_] = useState("");
  const [email_, setEmail_] = useState("");

  const runNotif_ = (notification: string) => {
    setNotif_(notification);
    setTimeout(() => {
      return setNotif_("");
    }, 2500);
  };
  return (
    <div
      className={`w-[400px] h-full absolute top-0 right-[50px] flex flex-col justify-center items-center`}
    >
      <div
        className={`flex relative w-full h-full flex-col items-center justify-center mx-2 
        
         p-2`}
      >
        <p
          className={`text-[20px] text-black/80 font-black text-center w-full mb-5`}
        >
          {isSignIn_ ? "Sign In" : "Sign Up"}
        </p>
        <p
          className={`text-[13px] text-black/50 font-medium text-left w-[215px]`}
        >
          E-Mail
        </p>
        <input
          type={"text"}
          placeholder={`email address..`}
          onChange={(obj) => {
            setEmail_(obj.target.value);
          }}
          className={`bg-black/20 hover:bg-black/30 rounded-md m-2 mt-1 h-[35px] p-2 transition-all duration-400 font-thin`}
        />
        <p
          className={`text-[13px] text-black/50 font-medium text-left w-[215px] mt-1`}
        >
          Password
        </p>
        <input
          type={"password"}
          placeholder={`password..`}
          onChange={(obj) => {
            setPassword_(obj.target.value);
          }}
          className={`bg-black/20 hover:bg-black/30 rounded-md m-2 h-[35px] p-2 transition-all duration-400 font-thin`}
        />
        {/* <input type={'password'} placeholder={`confirm password..`} className={`bg-white/50 rounded-md m-2 h-[35px] p-2 font-thin`}/> */}
        <div
          className={`flex relative overflow-hidden hover:w-[225px] w-[220px] h-[40px] rounded-md flex-col items-center justify-center mx-2 mt-3 bg-blue-400/80 hover:bg-blue-400 p-2 shadow-sm cursor-pointer hover:text-[15px] text-[16px] text-white/80 hover:text-white transition-all duration-400`}
          onClick={async () => {
            try {
              if(isSignIn_){
                await signIn_(email_, password_).then((obj_) => {
                  console.log("User logged in");
                  setShowThis_("");
                  runNotif_("User logged in");
                });
              }else{
                await signUp_(email_, password_).then((obj_) => {
                  console.log("User created and logged in");
                  setShowThis_("");
                  runNotif_("User created and logged in");
                });
              }
            } catch {
              console.log("Error!!");
            }
          }}
        >
          <p className={`font-bold text-center`}>
            {isSignIn_ ? "Sign In" : "Sign Up"}
          </p>
        </div>
        <p
          className={`text-[13px] text-black/30 hover:text-black/50 font-medium text-center mt-[2px] cursor-pointer transition-all duration-400 h-[13px]`}
        >
          {isSignIn_ ? "Forgot your password?" : ""}
        </p>
        <p
          className={`text-[13px] text-black/50 font-medium text-center w-full mt-8`}
        >
          
          {isSignIn_ ? "Don't have a WI account?" : "Already have an account?"}
        </p>
        <div
          className={`flex relative overflow-hidden hover:w-[240px] w-[235px] h-[40px] rounded-md flex-col items-center justify-center mx-2 mt-1 hover:bg-black/50 bg-black/30 p-2 shadow-sm cursor-pointer hover:text-[15px] text-[16px] text-white/80 hover:text-white/80 transition-all duration-400`}
          onClick={() => {
            setIsSignIn_(!isSignIn_)
          }}
        >
          <p className={`font-bold text-center`}>
          {isSignIn_ ? "Create new account" : "Sign In here"}
          </p>
        </div>
      </div>
    </div>
  );
};
