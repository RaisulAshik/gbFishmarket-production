import { Link } from "react-router-dom";

interface IProductsProps {
  allProductsCategories: any[];
  loadingData: boolean;
}

const ProductCards: React.FC<IProductsProps> = (props) => {
  const { allProductsCategories, loadingData } = props;
  /*
leaving it as it is now 
*/

  return (
    <ul className="flex flex-row flex-wrap items-center  justify-items-center md:flex-row md:flex-wrap">
      {/* single card */}
      {!loadingData &&
        allProductsCategories.map((item, index) => (
          <li
            key={index}
            className="max-w-sm md:max-w-sm lg:max-w-[18rem] mx-auto overflow-hidden bg-white rounded-lg  dark:bg-gray-800 mb-4 ml-0 lg:ml-9 md:ml-7 sm:ml-5 "
          >
            <Link to={`/products/category/${item.id}`}>
              <img
                className="object-cover w-full transition duration-300 ease-in-out h-28 lg:h-48 md:h-44 sm:h-40 hover:opacity-50  "
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

export default ProductCards;
