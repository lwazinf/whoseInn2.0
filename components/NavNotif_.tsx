import { useRecoilState } from "recoil";
import { HoverState } from "./atoms/atoms";

interface NavNotif_Props {}

const NavNotif_ = ({}: NavNotif_Props) => {
  const [hoverData_, setHoverData_] = useRecoilState(HoverState);
  
  return (
    <div
      className={`w-[100px] h-[350px] fixed right-[60px] md:left-[60px] m-4 flex flex-col justify-center items-center pointer-events-none opacity-0 md:opacity-100`}
    >
      {/* <div
        className={`w-[80px] h-[120px] md:relative md:pointer-events-auto absolute pointer-events-none flex flex-row justify-center items-center`}
      ></div> */}
      {/* <div
        className={`w-[80px] h-[1px] flex flex-row justify-center items-center bg-black/0 mb-8 mt-4`}
      /> */}
      {[
        'Home', 'Create', 'Requests', 'Settings', 'Auth'
      ].map((obj) => {
        return (
          <div
            className={`w-[80px] h-[60px] flex flex-row md:justify-start justify-end items-center my-[1px] pointer-events-none`}
            key={obj}
          >
            <div
              className={`min-h-[20px] min-w-[0px] bg-white/50 backdrop-blur-md flex flex-row relative overflow-hidden justify-center items-center text-black/40 hover:text-black/60 transition-all rounded-[4px] shadow-sm p-[2px] px-2 ${hoverData_ == obj ? 'opacity-100 duration-200 ml-[0px]' : 'opacity-0 duration-1000 ml-[-10px]'}`}
              onClick={async () => {
                
              }}
            >
              <p className={`text-left text-black/50 text-[13px] font-normal`}>
                {obj}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavNotif_;
