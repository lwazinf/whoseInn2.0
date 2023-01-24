import { useRecoilState } from "recoil";
import { HoverState } from "./atoms/atoms";

interface NavNotif_Props {}

const NavNotif_ = ({}: NavNotif_Props) => {
  const [hoverData_, setHoverData_] = useRecoilState(HoverState);
  
  return (
    <div
      className={`w-[100px] h-[350px] fixed right-0 md:left-[65px] m-4 flex flex-col justify-center items-center`}
    >
      {/* <div
        className={`w-[80px] h-[120px] md:relative md:pointer-events-auto absolute pointer-events-none flex flex-row justify-center items-center`}
      ></div> */}
      {/* <div
        className={`w-[80px] h-[1px] flex flex-row justify-center items-center bg-black/0 mb-8 mt-4`}
      /> */}
      {[
        'Home', 'Create', 'Requests', 'settings', 'Auth'
      ].map((obj) => {
        return (
          <div
            className={`w-[80px] h-[60px] flex flex-row justify-start items-center my-[1px] pointer-events-none`}
            key={obj}
          >
            <div
              className={`min-h-[20px] min-w-[0px] bg-white/50 flex flex-row justify-center items-center text-black/40 hover:text-black/60 transition-all rounded-[2px] p-[2px] ${hoverData_ == obj ? 'opacity-100 duration-200' : 'opacity-0 duration-1000'}`}
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
