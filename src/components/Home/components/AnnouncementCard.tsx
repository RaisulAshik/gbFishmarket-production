import { Link } from "react-router-dom";
import { IAnnouncementsCategoryData } from "../../../data/announcements";
interface IAnnProps {
  allAnnouncementsCategories: IAnnouncementsCategoryData[];
  loadingData: boolean;
}
const AnnouncementCards: React.FC<IAnnProps> = (props) => {
  const { allAnnouncementsCategories, loadingData } = props;
  return (
    <ul className="flex flex-row flex-wrap items-center  justify-center md:flex-row md:flex-wrap">
      {/* single card */}
      {allAnnouncementsCategories.map((item, index) => (
        <li
          key={index}
          className="max-w-sm md:max-w-sm lg:max-w-[18rem] mx-auto overflow-hidden bg-white rounded-lg  dark:bg-gray-800 mb-4 ml-0 lg:ml-9 md:ml-7 sm:ml-5 "
        >
          <Link to={`/announcements/announcement-category/${item.id}`}>
            <img
              className="object-cover w-36 lg:w-56 md:w-52 sm:w-48 transition duration-300 ease-in-out h-32 lg:h-52 md:h-48 sm:h-44 hover:opacity-50  "
              src={item.image_link}
              alt="avatar"
            />
          </Link>
          <div className="px-2 pt-8 text-center">
            <div className="block text-md text-transform: uppercase text-gray-800 dark:text-white">
              {item.title}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AnnouncementCards;
