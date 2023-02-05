import Layout from "../Common/Layout";
import { productsCategoryData } from "../../data/produtsData";
import Container from "@mui/material/Container";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { IAnnouncementsCategoryData } from "../../data/announcements";
import { useEffect, useState } from "react";
import { getAnnouncementCategories } from "../../api/apiAdminAnnouncement";
const Announcements = () => {
  const [allAnnouncementsCategories, setAllAnnouncementsCategories] = useState<
    IAnnouncementsCategoryData[]
  >([]);
  const [loadingData, setLoadingData] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let pathnamearry = location.pathname.split("/");

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
    <Layout title="Our Announcements">
      {/* page banner */}
      <div className="w-full h-96">
        <div className="relative w-full h-96">
          <img
            src={require("../../assets/img/banner_ann.jpg")}
            className="relative w-full min-w-full h-96"
            style={{ objectFit: "cover" }}
            alt="aboutimg"
          />
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full bg-black h-96 bg-opacity-30 font-montserrat">
            <p className="text-3xl md:text-5xl text-white text-transform: uppercase">
              Announcements
            </p>
            <div className="flex flex-row my-2 text-xl md:text-2xl text-white capitalize transition-colors duration-500 ">
              <p
                className="px-1 cursor-pointer hover:text-orange-400 "
                onClick={() => {
                  navigate("/");
                }}
              >
                home
              </p>{" "}
              {"|"}
              <p
                className="px-1 cursor-pointer hover:text-orange-400"
                onClick={() => {
                  navigate("/announcements");
                }}
              >
                {" "}
                announcements
              </p>
              {pathnamearry.length === 4 &&
              pathnamearry[2] === "announcement-category" ? (
                <>
                  {"|"}
                  <p>
                    {
                      productsCategoryData.find(
                        (item) => item.id === parseInt(pathnamearry[3])
                      )?.name
                    }
                  </p>
                </>
              ) : (
                <></>
              )}
              {pathnamearry.length === 4 &&
              pathnamearry[2] === "announcement-details" ? (
                <>
                  {"|"}
                  <p>
                    {
                      productsCategoryData.find(
                        (item) => item.id === parseInt(pathnamearry[3])
                      )?.name
                    }
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* end of page banner */}
      {/* Announcements section */}
      <Container maxWidth="lg">
        <div className="flex flex-col items-center justify-start w-full px-2 md:px-16 mt-2 md:mt-24 md:flex-row md:items-start">
          {/* category filter container  */}
          <div className="flex flex-row items-center justify-start w-full px-4 py-8 md:flex-col md:w-1/4 lg:w-1/4 bg-slate-100">
            <ul className="w-full">
              <li className="flex flex-row items-center justify-start h-4 m-3 font-montserrat font-semibold">
                Categories
              </li>
              <li className="flex flex-row items-center justify-start h-4 m-3 font-montserrat font-semibold">
                <div className="bg-[#3a6ea5] h-2 w-2 rounded-full"></div>{" "}
                <p
                  className={
                    location.pathname === "/announcements"
                      ? "pl-3 text-base text-[#3a6ea5] cursor-pointer font-montserrat font-semibold"
                      : "pl-4 text-sm hover:transform hover:duration-200 hover:text-[#3a6ea5] hover:ease-in hover:scale-125 cursor-pointer"
                  }
                  onClick={() => navigate("/announcements")}
                >
                  All Products
                </p>
              </li>
              {!loadingData &&
                allAnnouncementsCategories.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center justify-start h-4 m-3 "
                  >
                    <div className="bg-[#3a6ea5] h-2 w-2 rounded-full"></div>{" "}
                    <p
                      className={
                        location.pathname ===
                        `/announcements/announcement-category/${item.id}`
                          ? "pl-3 text-base text-[#3a6ea5] cursor-pointer font-montserrat font-semibold"
                          : "pl-4 text-sm hover:transform hover:duration-200 hover:text-[#3a6ea5] hover:ease-in hover:scale-125 cursor-pointer"
                      }
                      onClick={() =>
                        navigate(
                          `/announcements/announcement-category/${item.id}`
                        )
                      }
                    >
                      {item.title}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          <>
            {/* category items image cards container */}
            <Outlet />
          </>
        </div>
      </Container>

      {/* end of product section */}
    </Layout>
  );
};

export default Announcements;
