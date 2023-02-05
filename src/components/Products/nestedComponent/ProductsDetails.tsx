import React, { useState, useEffect } from "react";
import { getAllProducts, getProduct } from "../../../api/apiAdminProducts";
import { useParams, useNavigate } from "react-router-dom";
import { IProduct } from "../../admin/nestedComponents/Products/AllProducts";
import { Card } from "@mui/material";
import ImageZoom from "../components/ImageZoom";
//this will be a dummy component for now

const ProductsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const renderHTML = (rawHTML: string) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  useEffect(() => {
    id &&
      getProduct(parseInt(id))
        .then((res) => res.data)
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
        });
  }, [id]);
  return (
    <>
      {product && (
        <div className="w-full mt-8 mb-12 ml-0 md:mt-0 md:ml-4 md:w-3/4 lg:w-3/4 ">
          <div className="flex flex-col items-start justify-start md:flex-row">
            <div className="w-full md:w-1/2">
              <Card
                onClick={() => {
                  setSelectedImage(product.image_link);
                  setImageOpen(true);
                }}
              >
                <img
                  src={product.image_link}
                  alt=""
                  className="w-full rounded-lg h-60 md:h-56 lg:h-72"
                />
              </Card>
              <div className="hidden w-full mt-12 md:flex md:flex-row md:items-center md:justify-center font-montserrat">
                <button
                  className="text-white  bg-[#b8cc08] btn hover:bg-pink-900"
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                >
                  Contact sales
                </button>
              </div>
            </div>
            <div className="w-full h-auto p-4 md:w-1/2">
              <div className="flex flex-row items-center justify-center w-full h-12 font-montserrat font-semibold">
                <h2 className="mb-2 text-2xl ">{product.title}</h2>
              </div>
              <div className="flex flex-col items-center w-full font-montserrat">
                <p className="mb-2 text-base text-gray-500">
                  {product.subtitle}
                </p>
                <p className="mb-2 text-sm text-gray-500">
                  {product.short_description}
                </p>
              </div>
              <div>
                <p className="text-sm text-left text-gray-500 font-montserrat">
                  {renderHTML(product.long_description)}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center w-full mt-12 md:hidden font-montserrat">
                <button
                  className="text-white  bg-[#b8cc08] btn hover:bg-pink-900"
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                >
                  Contact sales
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedImage && imageOpen && (
        <ImageZoom
          record={selectedImage}
          imageShow={imageOpen}
          imageClose={() => setImageOpen(false)}
        />
      )}
    </>
  );
};

export default ProductsDetails;
