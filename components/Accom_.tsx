import { useRecoilState } from "recoil";
import { FocusState, FocusImageState, MapState, ThisState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBolt,
  faLocationCrosshairs,
  faDroplet,
  faHeart,
  faInfoCircle,
  faTimes,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import Map_ from "./Map_";

interface Accom_Props {}

const Accom_ = ({}: Accom_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [focusImage_, setFocusImage_] = useRecoilState(FocusImageState);
  const [map_, setMap_] = useRecoilState(MapState);
  return (
    <div
      className={`w-full min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        showThis_ == "accom"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[750px] h-[450px] bg-white/60 backdrop-blur-md rounded-lg shadow-sm relative overflow-hidden`}
      >
        <div className={`w-[700px] h-[450px] absolute top-0`}>
          <img
            className={`h-full w-full object-cover`}
            //  @ts-ignore 
            src={`${focusImage_.image}`}
          />
        </div>

        <div
          className={`w-[50px] h-[450px] absolute right-0 flex flex-col justify-end items-center py-4 bg-white`}
        >
          {[faArrowLeft, faLocationCrosshairs, faArrowRight].map((obj) => {
            return (
              <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 my-2`} 
                // ${
                //   focus_.accr == "Full" && obj == faLocationCrosshairs
                //     ? "text-green-400"
                //     : focus_.accr == "Prov." && obj == faLocationCrosshairs
                //     ? "text-orange-400"
                //     : focus_.accr == "N/A" && obj == faLocationCrosshairs
                //     ? "text-red-400"
                //     : "text-black/40 hover:text-black/60"
                // } 
                onClick={() => {
                  if (obj == faLocationCrosshairs) {
                    setMap_(!map_);
                  }
                }}
                key={obj.iconName}
              >
                <FontAwesomeIcon icon={obj} className={`w-[20px] h-[20px]`} />
              </div>
            );
          })}
        </div>
        {/* <div
          className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 absolute top-0 right-0 m-4`}
          onClick={() => {
            setMap_(false);
            setShowThis_("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} className={`w-[20px] h-[20px]`} />
        </div> */}
        <div
          className={`w-[200px] h-[100px] rounded-[4px] bg-white/80 backdrop-blur-lg flex flex-col justify-center items-center absolute right-[60px] bottom-5 transition-all hover:duration-200 duration-[1500ms]`}
        >
          {
            map_ ? (
              <div className={`text-[15px] font-thin text-black/70 flex flex-row text-center p-2`}>
            <p className={`text-[13px] font-medium text-black/50`}>
              {/* @ts-ignore */}
              {`${focus_.contact?.location.address}`}
            </p>
          </div>
            ) : (
              <div className={`text-[15px] font-thin text-black/70 flex flex-row text-center p-2`}>
            <p className={`text-[15px] font-medium text-black/50`}>
              {/* @ts-ignore */}
              {`${focusImage_.name}`}
            </p>
          </div>
            )
          }
          {
            !map_ ? <div className={`text-[13px] font-normal text-center text-black/70 mt-[0px] flex flex-row`}>
            <p className={`mt-[0px]`}>
              {/* @ts-ignore */}
              {focusImage_.desc}
            </p>
          </div> : <p className={`mt-[0px]`}>xxx-xxx-xxxx</p>
          }
          {
            !map_ && <div
            className={`flex flex-row justify-center items-center w-full mt-1`}
          >
              {/* @ts-ignore */}
            {focus_?.services?.includes("Water") && (
              <FontAwesomeIcon
                icon={faDroplet}
                className={`w-[13px] h-[13px] m-1 text-black/50`}
              />
            )}
              {/* @ts-ignore */}
            {focus_?.services?.includes("Electricity") && (
              <FontAwesomeIcon
                icon={faBolt}
                className={`w-[13px] h-[13px] m-1 text-black/50`}
              />
            )}
              {/* @ts-ignore */}
            {focus_?.services?.includes("Internet") && (
              <FontAwesomeIcon
                icon={faTowerBroadcast}
                className={`w-[13px] h-[13px] m-1 text-black/50`}
              />
            )}
          </div>
          }
        </div>
        <Map_ />
      </div>
    </div>
  );
};

export default Accom_;
