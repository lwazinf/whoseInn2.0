import { useRecoilState } from "recoil";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { Loader } from "@googlemaps/js-api-loader";
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
  faMapMarkerAlt,
  faPeopleGroup,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, useAuth } from "../firebase";
import { v4 } from "uuid";

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
  const [tempStudents_, setStudentsTemp_] = useState("");
  const [tempPrice_, setPriceTemp_] = useState("");

  const currentUser_ = useAuth()

  const mockData_ = [
    {
      data: price,
      optionType: "input",
      options: [0],
      name: "Price",
      hoverData: "Pricing",
      icon: faCoins,
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
      data: map,
      optionType: "map",
      options: ["Select"],
      name: "Map",
      hoverData: "Location",
      icon: faMapMarkerAlt,
    },
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
      data: services,
      optionType: "toggle",
      options: ["Internet", "Electricity", "Water"],
      name: "Services",
      hoverData: "Services",
      icon: faBolt,
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

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const storeImage = async (image: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${location_.address}`;

      const storageRef = ref(storage, `locations/${location_.address}/` + fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error: any) => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: any) => {
            resolve(downloadURL);
            // setImages(images.push(downloadURL));
            const uuid_ = v4()
            await setDoc(doc(db, "locations", uuid_), {
              uid: uuid_,
              // owner: currentUser_?.uid,
              timestamp: serverTimestamp(),
              accr: accr_,
              location: location_,
              price: price_,
              students: students_,
              services: services_,
              image: downloadURL,
            });
          });
        }
      );
    });
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
                    storeImage(image_[0])
                  }
                }}
                key={obj.iconName}
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
                  value={obj.data == students ? tempStudents_ : tempPrice_}
                  className={`w-full h-[35px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                  onChange={(e) => {
                    if (obj.data == students) {
                      // @ts-ignore
                      isNaN(e.target.value)
                        ? setStudentsTemp_("")
                        : setStudentsTemp_(e.target.value);
                      // @ts-ignore
                      !(isNaN(e.target.value) || e.target.value == "") &&
                        setStudents_(parseInt(e.target.value));
                      e.target.value == "" && setStudents_(0);
                    } else {
                      // @ts-ignore
                      isNaN(e.target.value)
                        ? setPriceTemp_("")
                        : setPriceTemp_(e.target.value);
                      // @ts-ignore
                      !(isNaN(e.target.value) || e.target.value == "") &&
                        setPrice_(parseInt(e.target.value));
                      e.target.value == "" && setPrice_(0);
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
                          setAccr_(obj_.toString());
                        }}
                        key={obj_}
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
                  {image_.length == 0 ? (
                    <label htmlFor="images">
                      <div
                        className={`w-[120px] h-[30px] flex flex-col justify-center items-center bg-black/40 hover:bg-black/50 transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer mx-1 text-white text-[15px] font-black`}
                        onClick={() => {}}
                      >
                        Select
                      </div>
                    </label>
                  ) : (
                    <div
                      className={`w-[120px] h-[30px] flex flex-col justify-center items-center bg-red-500/50 hover:bg-red-500/80 transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer mx-1 text-white text-[15px] font-black`}
                      onClick={() => {
                        if (image_.length != 0) {
                          setImage_([]);
                        }
                      }}
                    >
                      Remove
                    </div>
                  )}
                </div>
              ) : obj.optionType == "toggle" ? (
                <div
                  className={`flex flex-row justify-center items-center w-full`}
                >
                  {obj.options.map((obj_) => {
                    return (
                      <div
                        className={`w-[100px] h-[30px] ${
                          services_.includes(obj_)
                            ? "bg-black/70 hover:bg-red-500/50"
                            : "bg-black/40 hover:bg-black/50"
                        } transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer flex flex-row justify-center items-center mx-1 text-white text-[15px] font-black`}
                        onClick={() => {
                          if (services_.includes(obj_)) {
                            setServices_(
                              services_.filter((e: any) => {
                                return e !== obj_;
                              })
                            );
                          } else {
                            setServices_([...services_, obj_]);
                          }
                        }}
                        key={obj_}
                      >
                        <div
                          className={`flex w-[80px] h-[30px] rounded-md flex-row items-center justify-center text-center transition-all duration-400`}
                        >
                          <p className={``}>{obj_}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Combobox
                  onSelect={async (e) => {
                    setValue(e);
                    const results = await getGeocode({address: e})
                    const { lat, lng } = await getLatLng(results[0])
                    setLocation_({address: e, lat: lat, lng: lng})
                    console.log(location_);
                    // console.log(results[0]);
                  }}
                >
                  <ComboboxInput
                    value={value}
                    onChange={(e: any) => {
                      setValue(e.target.value);
                      // setMap__(e.target.value)
                    }}
                    // disabled={!ready}
                    className={`w-full h-[35px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                    placeholder={`Search for an address..`}
                  />
                  <ComboboxPopover>
                    <ComboboxList>
                      {status == "OK" &&
                        data.map(({ place_id, description }) => {
                          return (
                            <ComboboxOption
                              key={place_id}
                              value={description}
                              className={`cursor-pointer`}
                              onClick={async () => {}}
                            />
                          );
                        })}
                    </ComboboxList>
                  </ComboboxPopover>
                </Combobox>
                
              )}
            </div>
          );
        })}
        <div
          className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200 absolute top-0 right-0 m-4`}
          onClick={() => {
            setAccr_("");
            setImage_([]);
            setPrice_(0);
            setServices_([]);
            setStudents_(0);
            setLocation_([]);
            setStudentsTemp_("");
            setPriceTemp_("");

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
