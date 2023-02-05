import { GOOGLE_API_KEY, GOOGLE_MAP_ID } from "../../../utils/config";
import GoogleMapReact from "google-map-react";
// import LocationPin from "./LocationPin";
import { IlocationProps } from "../../../utils/interfaces";

interface ILocalMapProps {
  location: IlocationProps;
  zoomLevel?: number;
}

// { location, zoomLevel }: ILocalMapProps

const LocalMap = ({ location, zoomLevel }: ILocalMapProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 pb-0 mx-auto">
      <h2 className="text-2xl text-[#b8cc08] font-montserrat font-semibold text-transform: uppercase ">
        DISCOVER OUR LOCATION
      </h2>
      <div className=" flex items-center justify-center py-4">
        <img src={require("../../../assets/img/divider.png")} alt="divider" />
      </div>

      <div className="h-screen max-h-[80vh] w-full border-2  border-black">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
          options={{
            mapId: GOOGLE_MAP_ID,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            const marker = new maps.Marker({
              position: { lat: 22.426005, lng: 89.2636501 },
              map,
              title: "Our location",
            });
            const infowindow = new maps.InfoWindow({
              content: "Our location",
            });
            marker.addListener("mouseover", () => {
              infowindow.open(map, marker);
            });
            marker.addListener("mouseout", () => {
              infowindow.close(map, marker);
            });
          }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default LocalMap;
