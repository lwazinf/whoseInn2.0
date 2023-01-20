import { useRecoilState } from "recoil";
import {
  ThisState,
  AccrState,
  ImageState,
  LocationState,
  ServicesState,
  PriceState,
  StudentsState,
} from "./atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faCamera,
  faCheckCircle,
  faCoins,
  faHeart,
  faInfoCircle,
  faMapMarkerAlt,
  faPeopleGroup,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Create_Props {}

const Create_ = ({}: Create_Props) => {
  const acc = "Your current level of accreditation..";
  const images = "Choose a cover image for your accommodation..";
  const price = "Your price per room..";
  const map = "Let's find your location..";
  const students = "How many rooms are available??";
  const services = "Which services do you provide?";

  const [accr_, setAccr_] = useRecoilState(AccrState);
  const [image_, setImage_] = useRecoilState(ImageState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [services_, setServices_] = useRecoilState(ServicesState);
  const [price_, setPrice_] = useRecoilState(PriceState);
  const [students_, setStudents_] = useRecoilState(StudentsState);

  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [option_, setOption_] = useState(0);

  const mockData_ = [
    {
      data: acc,
      optionType: "select",
      options: ["N/A", "Prov.", "Full"],
      name: "Acc",
      hoverData: "Accreditation",
      icon: faCheckCircle,
    },
    {
      data: images,
      optionType: "images",
      options: ["Select"],
      name: "Images",
      hoverData: "Images",
      icon: faCamera,
    },
    {
      data: map,
      optionType: "map",
      options: ["Select"],
      name: "Map",
      hoverData: "Location",
      icon: faMapMarkerAlt,
    },
    {
      data: students,
      optionType: "input",
      options: [0],
      name: "Students",
      hoverData: "Students",
      icon: faPeopleGroup,
    },
    {
      data: services,
      optionType: "toggle",
      options: ["Internet", "Electricity", "Water"],
      name: "Services",
      hoverData: "Services",
      icon: faBolt,
    },
    {
      data: price,
      optionType: "input",
      options: [0],
      name: "Price",
      hoverData: "Pricing",
      icon: faCoins,
    },
  ];

  const onMutate = (e: any) => {
    if (e.target.files) {
      // setModal(true)
      const tempData_: any = [
        e.target.files[0],
        URL.createObjectURL(e.target.files[0]),
      ];
      setImage_(tempData_);
    } else {
      console.log("No Images Selected!");
    }
  };

  return (
    <div
      className={`w-full min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        showThis_ == "create"
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
            src={`https://images.pexels.com/photos/14613134/pexels-photo-14613134.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
          />
        </div>
        <div
          className={`w-[50px] h-[450px] absolute right-0 flex flex-col justify-end items-center py-4 bg-white`}
        >
          {[faArrowRight].map((obj) => {
            return (
              <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 my-2`}
                onClick={() => {
                  if (mockData_.length != option_ + 1) {
                    setOption_(option_ + 1);
                  } else {
                    // Confirmation Step..
                    console.log({
                      accr: accr_,
                      location: location_,
                      price: price_,
                      students: students_,
                      services: services_,
                      image: image_,
                    });
                  }
                }}
              >
                <FontAwesomeIcon icon={obj} className={`w-[20px] h-[20px]`} />
              </div>
            );
          })}
        </div>
        {mockData_.map((obj) => {
          return (
            <div
              className={`w-[400px] h-[450px] absolute right-[50px] flex flex-col justify-end items-center pl-6 pb-5 transition-all duration-200 ${
                obj.data == mockData_[option_].data && showThis_ == "create"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              key={obj.data}
            >
              <p
                className={`mb-8 text-[20px] font-black text-center w-[400px] h-[450px] flex flex-col justify-center items-center text-black/50 pt-7 ${
                  obj.data == mockData_[option_].data && showThis_ == "create"
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {obj.data}
              </p>
              {obj.optionType == "input" ? (
                <input
                  type={"text"}
                  placeholder={`Your answer here..`}
                  className={`w-full h-[30px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                  onChange={(e) => {
                    if (obj.data == students) {
                      setStudents_(e.target.value);
                    } else {
                      setPrice_(e.target.value);
                    }
                  }}
                />
              ) : obj.optionType == "select" ? (
                <div
                  className={`flex flex-row justify-center items-center w-full`}
                >
                  {obj.options.map((obj_) => {
                    return (
                      <div
                        className={`w-[100px] h-[30px] ${
                          accr_ == obj_ ? "bg-black/70" : "bg-black/40"
                        } hover:bg-black/50 transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer flex flex-row justify-center items-center mx-1 text-white text-[15px] font-black`}
                        onClick={() => {
                          setAccr_(obj_);
                        }}
                      >
                        {obj_}
                      </div>
                    );
                  })}
                </div>
              ) : obj.optionType == "images" ? (
                <div
                  className={`w-[100px] h-[30px] flex flex-col justify-center items-center`}
                >
                  <input
                    type={"file"}
                    id="images"
                    max="6"
                    accept=".jpg,.png,.jpeg"
                    onChange={onMutate}
                    multiple
                    required
                    hidden
                    className={`w-full h-[30px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                  />
                  <label htmlFor="images">
                    <div
                      className={`w-[120px] h-[30px] flex flex-col justify-center items-center bg-black/40 hover:bg-black/50 transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer mx-1 text-white text-[15px] font-black`}
                    >
                      Select
                    </div>
                  </label>
                </div>
              ) : obj.optionType == "toggle" ? (
                <div
                  className={`flex flex-row justify-center items-center w-full`}
                >
                  {obj.options.map((obj_) => {
                    return (
                      <div
                        className={`${
                          services_.includes(obj_)
                            ? "bg-blue-500/80 hover:bg-red-500/40 text-white"
                            : "hover:bg-blue-500/40 bg-white/50 hover:text-white text-blue-300"
                        } flex w-[81px] h-[31px] rounded-md flex-row items-center justify-center text-center transition-all duration-400 cursor-pointer m-1`}
                        onClick={() => {
                          console.log(services_)
                          if(services_.includes(obj_)){
                          }else{
                            setServices_([...services_, obj_])
                          }
                        }}
                        key={obj_}
                      >
                        <div
                          className={`flex w-[80px] h-[30px] rounded-md flex-row items-center justify-center text-center transition-all duration-400`}
                        >
                          <p className={`font-medium text-[14px]`}>{obj_}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div
          className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 absolute top-0 right-0 m-4`}
          onClick={() => {
            setAccr_("");
            setImage_("");
            setPrice_("");
            setServices_("");
            setStudents_("");
            setLocation_("");

            setShowThis_("");
            setOption_(0);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className={`w-[20px] h-[20px]`} />
        </div>
      </div>
    </div>
  );
};

export default Create_;
