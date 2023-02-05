import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../api/apiAdminProducts";

const ProductList = () => {
  const [allProducts, setAllProducts] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);

  React.useEffect(() => {
    getAllProducts()
      .then((res) => {
        setAllProducts(res.data);
        setLoadingData(false);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
    return () => {
      setLoadingData(false);
      setAllProducts([]);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 mt-2 md:mt-2 mb-12 ml-0 md:mt-0 md:ml-4 md:w-3/4 lg:w-3/4">
      {!loadingData &&
        allProducts.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <div className="w-full bg-white h-36 md:h-48 ">
              <img
                src={item.image_link}
                alt={item.image_name}
                className="object-cover w-full h-full hover:opacity-50"
                onClick={() => navigate(`/products/product-details/${item.id}`)}
              />
            </div>
            <div className="w-full h-12 ">
              <p className="text-sm text-center text-gray-800 md:text-base">
                {item.title}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
