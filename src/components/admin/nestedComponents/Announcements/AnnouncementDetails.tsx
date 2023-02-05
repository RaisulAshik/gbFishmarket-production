import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { IAnnouncement } from "../../AdminAnnouncement";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
const AnnouncementDetails = () => {
  const { state } = useLocation() as any;
  const [announcement, setAnnouncement] = useState<IAnnouncement>(state);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-start justify-center w-full p-4 ">
        <div className="flex flex-row items-center justify-between w-full my-4 text-indigo-500 ">
          <div className="w-1/4">
            <button
              className=" btn btn-light-secondary btn-sm mr-28"
              onClick={() => navigate("/admin/announcement")}
            >
              <ArrowBackIosNewOutlinedIcon /> Go back
            </button>
          </div>
          <div className="flex items-center justify-around w-1/2">
            <Typography
              variant="h6"
              className="font-montserrat font-semibold"
              gutterBottom
            >
              Announcement details
            </Typography>
          </div>
          <div className="w-1/4 h-4"></div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full m-4 ">
        <div className="flex flex-row items-center justify-center w-full">
          <img
            src={announcement.image_link}
            alt={announcement.image_name}
            className="w-9/12 rounded-xl h-96"
          />
        </div>

        <div className="flex flex-row items-center justify-start w-full my-4">
          <div>
            <Typography variant="h6">{announcement.title}</Typography>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start w-full my-4">
          <div>
            <Typography variant="h6">
              {announcement.short_description}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start w-full my-4">
          <div>
            {announcement.show_on_home
              ? "Displayed on homepage"
              : "not displaying on homepage"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDetails;
