import { useRecoilState } from "recoil";
import { ThisState } from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle, faHeart, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Auth_Props {}

const Auth_ = ({}: Auth_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  return (
    <div
      className={`w-full min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        showThis_ == 'auth'
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
        <div
          className={`w-[50px] h-[450px] absolute right-0 flex flex-col justify-end items-center py-4 bg-white`}
        >
          {
            [faArrowRight].map((obj) => {
                return (
                    <div
            className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 my-2`}
            onClick={() => {}}
          >
            <FontAwesomeIcon icon={obj} className={`w-[20px] h-[20px]`} />
          </div>
                )
            })
          }
        </div>
        <div
          className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 absolute top-0 right-0 m-4`}
          onClick={() => {
            setShowThis_('');
          }}
        >
          <FontAwesomeIcon icon={faTimes} className={`w-[20px] h-[20px]`} />
        </div>
      </div>
    </div>
  );
};

export default Auth_;
