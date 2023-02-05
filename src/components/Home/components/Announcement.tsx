import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnnouncementCategories } from "../../../api/apiAdminAnnouncement";
import { IAnnouncementsCategoryData } from "../../../data/announcements";
import AnnouncementCards from "./AnnouncementCard";

const Announcement = () => {
  const [allAnnouncementsCategories, setAllAnnouncementsCategories] = useState<
    IAnnouncementsCategoryData[]
  >([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(true);
    getAnnouncementCategories()
      .then((res) => {
        setAllAnnouncementsCategories(res.data.categoryAnnouncements);
        setLoadingData(false);
      })
      .catch((err) => {
        setLoadingData(false);
      });
    return () => {
      setAllAnnouncementsCategories([]);
      setLoadingData(false);
    };
  }, []);

  return (
    <>
      <div className="container flex flex-col items-center justify-center w-full max-w-screen-xl md:px-8 px-0 pt-4 pb-6 mx-auto">
        <h2 className="text-sm font-montserrat font-semibold text-[#b8cc08] text-transform: lowercase font-style: italic ">
          Sea food
        </h2>
        <h2 className="text-2xl text-[#b8cc08] font-montserrat font-semibold text-transform: uppercase ">
          OUR ANNOUNCEMENTS
        </h2>
        <div className="flex items-center justify-center pt-4 ">
          <img src={require("../../../assets/img/divider.png")} alt="divider" />
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center w-full max-w-screen-xl px-8 xl:px-24 lg:px-24 md:px-12 sm:px-8 pt-4 pb-6 mx-auto">
        {/* img diveder */}
        {/* end img divider */}

        <AnnouncementCards
          allAnnouncementsCategories={allAnnouncementsCategories}
          loadingData={loadingData}
        />
      </div>
      <div className="container flex flex-col items-center justify-center w-full max-w-screen-xl px-8 pt-4 pb-6 mx-auto">
        <button className="bg-[#2c3941] text-white py-2 px-4 rounded-lg">
          <Link to="/announcements">
            <span className="text-sm  font-montserrat font-semibold text-transform: uppercase">
              View All Announcements
            </span>
          </Link>
        </button>
      </div>
    </>
  );
};

export default Announcement;
