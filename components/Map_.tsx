import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { FocusState, MapState } from "./atoms/atoms";

interface Map_Props {}

const Map_ = ({}: Map_Props) => {
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [map_, setMap_] = useRecoilState(MapState);
  return (
    <div
      className={`w-[350px] h-full p-4 relative ${
        map_ ? "right-0" : "right-[350px]"
      } transition-all duration-200`}
    >
      <div
        className={`w-full h-full rounded-[4px] bg-white/20 backdrop-blur-lg relative overflow-hidden`}
      >
        <GoogleMap
          zoom={16}
          center={{
            // @ts-ignore 
            lat: Object.keys(focus_).length == 0 ? 0 : focus_.contact?.location.lat,
            // @ts-ignore 
            lng: Object.keys(focus_).length == 0 ? 0 : focus_.contact?.location.lng,
          }}
          mapContainerClassName={`w-full h-full opacity-80 transition-all duration-200`}
          options={{ disableDefaultUI: true }}
        >
          <Marker
            position={{
            // @ts-ignore 
              lat: Object.keys(focus_).length == 0 ? 0 : focus_.contact?.location.lat,
            // @ts-ignore 
            lng: Object.keys(focus_).length == 0 ? 0 : focus_.contact?.location.lng,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map_;
