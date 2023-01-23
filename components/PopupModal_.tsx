import { useRecoilState } from "recoil";
import { NotifState } from "./atoms/atoms";

interface PopupModal_Props {}

const PopupModal_ = ({}: PopupModal_Props) => {
  const [notif_, setNotif_] = useRecoilState(NotifState);
  return (
    <div
      className={`w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pointer-events-none transition-all duration-200`}
    >
      <div
        className={`w-full ${notif_.length > 0 ? 'h-[40px] p-4' : 'h-[0px] p-0'} bg-green-200/50 backdrop-blur-sm flex flex-col justify-center items-center transition-all duration-200`}
      >
        <p
          className={`text-black/60 text-[15px] transition-all duration-200 ${
            notif_.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {notif_}
        </p>
      </div>
    </div>
  );
};

export default PopupModal_;
