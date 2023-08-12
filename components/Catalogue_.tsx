import { useRecoilState } from "recoil";
import { FocusState, FocusImageState, OpenState, ThisState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Catalogue_Props {}

const Catalogue_ = ({}: Catalogue_Props) => {
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [focusImage_, setFocusImage_] = useRecoilState(FocusImageState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  return (
    <div
      className={`w-full min-h-screen fixed ${
        open_ ? "top-0" : "top-[-100%]"
      } left-0 flex flex-col justify-center items-center bg-white/80 backdrop-blur-md transition-all duration-200 overflow-scroll`}
    >
      <div
        className={`w-[1300px] min-h-1 m-auto md:grid grid-cols-1 md:grid-cols-4 gap-1
        `}
      >
        {/* @ts-ignore */}
        {focus_?.products?.map((obj) => {
          return (
            <div
              className={`w-full cursor-pointer flex min-w-0 h-[322px] flex-col rounded-[4px] relative overflow-hidden opacity-70 hover:opacity-100 transition-all duration-75`}
              onClick={() => {
                setShowThis_("accom");
                setFocusImage_(obj)
                // setOpen_(false)
              }}
              key={obj}
            >
              <img src={obj.image} className={`w-full h-full object-cover`}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalogue_;
