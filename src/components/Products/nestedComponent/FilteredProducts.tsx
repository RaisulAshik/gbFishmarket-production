import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../../../api/apiAdminProducts";

interface Idata {
  id: number;
  title: string;
  image_link: string;
  image_name: string;
}
const FilteredProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Idata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        let getProducts = categoryId
          ? res.data.filter(
              (item: { category: any; id: number }) =>
                item.category.id === parseInt(categoryId)
            )
          : [];
        setFilteredProducts(getProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
    return () => {
      setFilteredProducts([]);
    };
  }, [categoryId]);

  // setFilteredProducts(getProducts);
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 mt-2 md:mt-2 mb-12 ml-0 md:mt-0 md:ml-4 md:w-3/4 lg:w-3/4">
      {!isLoading &&
        filteredProducts.map((item) => (
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

export default FilteredProducts;
