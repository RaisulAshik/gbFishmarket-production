import { GrLocation } from "react-icons/gr";
import { IlocationProps } from "../../../utils/interfaces";

const LocationPin = ({ lat, lng, address }: IlocationProps) => {
  return (
    <div className="">
      <GrLocation className="h-6 w-6 cursor-pointer fill-red-500" />
      {/* <p className="pin-text">{address}</p> */}
    </div>
  );
};

export default LocationPin;
