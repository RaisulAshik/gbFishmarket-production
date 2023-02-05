import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnnouncements } from "../../../api/apiAdminAnnouncement";

interface Idata {
  id: number;
  title: string;
  image_link: string | undefined;
}
const FilteredAnnouncements = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Idata[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAnnouncements()
      .then((res) => {
        let getAnnouncements = categoryId
          ? res.data.announcements.filter(
              (item: { category: any; id: number }) =>
                item.category.id === parseInt(categoryId)
            )
          : ([] as Idata[]);
        setFilteredAnnouncements(getAnnouncements);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
    return () => {
      setFilteredAnnouncements([]);
    };
  }, [categoryId]);

  // setFilteredAnnouncements(getAnnouncements);
  return (
    <div className="grid w-full grid-cols-3 gap-4 mt-2 mb-12 ml-0 md:mt-2 md:ml-4 md:w-3/4 lg:w-3/4">
      {!isLoading &&
        filteredAnnouncements.map((item,index) => (
          <div className="flex flex-col items-center"key={index}>
            <div className="w-full bg-white h-36 md:h-48 ">
              <img
                src={item.image_link}
                alt={item.title}
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

export default FilteredAnnouncements;
