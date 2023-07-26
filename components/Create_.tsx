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
  DescState,
  ImageState,
  LocationState,
  ServicesState,
  NameState,
  CategoryState,
  NotifState,
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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, useAuth } from "../firebase";
import { v4 } from "uuid";
import Router from "next/router";

interface Create_Props {}

const Create_ = ({}: Create_Props) => {
  const name = "What is your entity's name?";
  const desc = "Give us a brief description of your entity..";
  const category = "Which category does your entity fall under?";
  const images = "Upload your company logo..";
  const map = "Where does your entity operate from?";
  const services = "Which services do you provide?";

  const [category_, setCategory_] = useRecoilState(CategoryState);
  const [image_, setImage_] = useRecoilState(ImageState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [services_, setServices_] = useRecoilState(ServicesState);
  const [name_, setName_] = useRecoilState(NameState);
  const [desc_, setDesc_] = useRecoilState(DescState);

  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [notif_, setNotif_] = useRecoilState(NotifState);
  const [option_, setOption_] = useState(0);
  const [tempDesc_, setDescTemp_] = useState("");
  const [tempName_, setNameTemp_] = useState("");

  const currentUser_ = useAuth();

  const mockData_ = [
    {
      data: name,
      optionType: "input",
      options: [0],
      name: "Price",
      hoverData: "Pricing",
      icon: faCoins,
    },
    {
      data: desc,
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
      data: category,
      optionType: "select",
      options: ["Equipment", "Packaging", "Material"],
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

  const runNotif_ = (notification: string) => {
    setNotif_(notification);
    setTimeout(() => {
      return setNotif_("");
    }, 2500);
  };

  const storeImage = async (image: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${location_.address}`;

      const storageRef = ref(
        storage,
        `suppliers/${location_.address}/` + fileName
      );

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
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL: any) => {
              resolve(downloadURL);
              // setImages(images.push(downloadURL));
              const uuid_ = v4();

              await setDoc(doc(db, "suppliers", uuid_), {
                uid: uuid_,
                // @ts-ignore
                owner: currentUser_?.uid,
                timestamp: serverTimestamp(),
                products: [],
                image: downloadURL,
                desc: desc_,
                category: category_,
                contact: {
                  location: location_,
                  email: "email",
                  phone: "phone",
                },
                // @ts-ignore
                country: location_.address
                  .split(",")
                  // @ts-ignore
                  .map((item) => item.trim())
                  .pop(),
                // @ts-ignore
                name: name_,
              }).then(() => {
                setShowThis_("");
                runNotif_(`${location_.address} Link created..`);
                Router.reload();
              });
            }
          );
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
        className={`w-[300px] md:w-[750px] h-[450px] bg-white backdrop-blur-md rounded-lg shadow-sm relative overflow-hidden`}
      >
        <div
          className={`w-[300px] h-[450px] absolute top-0 md:opacity-100 opacity-0 pointer-events-none`}
        >
          <img
            className={`h-full w-full object-cover md:opacity-100 opacity-0 pointer-events-none`}
            src={`https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
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
                    storeImage(image_[0]);
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
                  value={obj.data == desc ? tempDesc_ : tempName_}
                  className={`w-full h-[35px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
                  onChange={(e) => {
                    if (obj.data == desc) {
                      // @ts-ignore
                      setDescTemp_(e.target.value);
                      // @ts-ignore

                      setDesc_(e.target.value);
                      // @ts-ignore
                      e.target.value == "" && setDesc_(0);
                    } else if (obj.data == category) {
                      // @ts-ignore
                      setCategoryTemp_(e.target.value);
                      // @ts-ignore

                      setCategory_(e.target.value);
                      // @ts-ignore
                      e.target.value == "" && setCategory_(0);
                    } else {
                      // @ts-ignore
                      setNameTemp_(e.target.value);
                      // @ts-ignore
                      setName_(e.target.value);
                      // @ts-ignore
                      e.target.value == "" && setName_(0);
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
                          desc_ == obj_ ? "bg-black/70" : "bg-black/40"
                        } hover:bg-black/50 transition-all duration-200 rounded-[4px] shadow-sm cursor-pointer flex flex-row justify-center items-center mx-1 text-white text-[15px] font-black`}
                        onClick={() => {
                          setCategory_(obj_.toString());
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
                  className={`w-full h-[35px]`}
                  onSelect={async (address_) => {
                    setValue(address_);
                    const results = await getGeocode({ address: address_ });
                    const { lat, lng } = await getLatLng(results[0]);
                    setLocation_({
                      address: address_,
                      lat: lat,
                      lng: lng,
                    });
                  }}
                >
                  <ComboboxInput
                    value={value}
                    onChange={(e: any) => {
                      setValue(e.target.value);
                      // setMap__(e.target.value)
                    }}
                    // disabled={!ready}
                    className={`w-full h-[35px] text-[13px] bg-black/10 rounded-[2px] shadow-sm pl-2`}
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
                              className={`cursor-pointer bg-white hover:bg-gray-200 text-[13px] p-2 text-center min-w-[20px] min-h-[20px] border-b-[1px] border-b-black/10 border-solid`}
                              onClick={() => {
                                clearSuggestions();
                              }}
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
            setDesc_("");
            setImage_([]);
            // @ts-ignore
            setName_(0);
            setServices_([]);
            // @ts-ignore
            setDesc_(0);
            setLocation_([]);
            setDescTemp_("");
            setNameTemp_("");

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
