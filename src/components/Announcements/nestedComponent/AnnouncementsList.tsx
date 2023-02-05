import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnnouncements } from "../../../api/apiAdminAnnouncement";
const AnnouncementsList = () => {
  const [allAnnouncements, setAllAnnouncements] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    getAnnouncements()
      .then((res) => res.data)
      .then((data) => {
        setAllAnnouncements(data.announcements);
        setLoadingData(false);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
    return () => {
      setLoadingData(false);
      setAllAnnouncements([]);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 mt-2 md:mt-2 mb-12 ml-0 md:mt-0 md:ml-4 md:w-3/4 lg:w-3/4">
      {!loadingData &&
        allAnnouncements.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="w-full bg-white h-36 md:h-48 ">
              <img
                src={item.image_link}
                alt={item.image_name}
                className="object-cover w-full h-full hover:opacity-50"
                onClick={() =>
                  navigate(`/announcements/announcement-details/${item.id}`)
                }
              />
            </div>
            <div className="w-full h-12 ">
              <p className="text-base text-center text-gray-800 md:text-xl">
                {item.title}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnnouncementsList;
