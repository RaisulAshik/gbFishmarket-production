import React, { useState, useEffect } from "react";
import {
  getProductCategories,
  createProductCategory,
} from "../../../../api/apiAdminProducts";
import { Formik } from "formik";
import { CircularProgress, Container, Grid } from "@mui/material";
import CategoryCard from "../../components/CategoryCard";
import { useNavigate } from "react-router-dom";

interface ICategory {
  id: number;
  title: string;
  image_name: string;
  image_link: string;
  show_on_home: boolean;
}

const CategoryProducts = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  // const [refrase, setRefrase] = useState({});
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoadingData(true);
    getProductCategories()
      .then((res) => {
        setAllCategories(res.data.categoryProducts);
        setLoadingData(false);
      })
      .catch((err) => {
        setLoadingData(false);
      });
    return () => {
      setAllCategories([]);
      setLoadingData(false);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      {allCategories.length === 0 && (
        <div className="py-4 font-semibold font-montserrat">
          No categories were found
        </div>
      )}
      <div className="w-full h-20 my-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/admin/products/category/add-category");
          }}
        >
          add a category
        </button>
      </div>
      {!loadingData ? (
        <Grid container spacing={2}>
          {allCategories.map((item, index) => {
            return <CategoryCard item={item} key={item.id} />;
          })}
        </Grid>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-8">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default CategoryProducts;
