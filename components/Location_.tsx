import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

const apiKey = "AIzaSyB3x0RxMZbl6LRapAhKlegw6Xmp9rupr0g";

interface Location_Props {}

const Location_ = ({}: Location_Props) => {

  return (
    <div className={`w-[400px] h-[450px] absolute flex flex-col justify-end items-center pl-6 transition-all duration-200`}>
      {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
      <input
                  type={"text"}
                  placeholder={`Your answer here..`}
                  className={`w-full h-[35px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                />
      {/* </Autocomplete> */}
    </div>
  );
};

export default Location_;
