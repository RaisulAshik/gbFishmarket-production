import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../../utils/auth";
import { updateProductCategory } from "../../../api/apiAdminProducts";
import { Alert } from "@mui/material";

export interface Icategory {
  id: number;
  title: string;
  image_name: string;
  image_link: string;
  show_on_home: boolean;
  created_at?: string;
  updated_at?: string;
}
interface ICategoryProps {
  item: Icategory;
}

const CategoryCard = ({ item }: ICategoryProps) => {
  const [category, setCategory] = useState(item);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoading(true);
    const token = userInfo().token as string;
    const getFormData = (object: Icategory): FormData =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key as keyof object]);
        return formData;
      }, new FormData());

    updateProductCategory(
      getFormData({ ...category, show_on_home: e.target.checked }),
      category.id,
      token
    )
      .then((res) => res.data)
      .then((data) => {
        console.log("api returned", data.result);
        setCategory(data.result);
        setLoading(false);
        setSuccess(
          `${category.title} is ${
            !category.show_on_home ? "now featured" : "no longer featured"
          }`
        );
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        setError("failed to update");
        setTimeout(() => {
          setError("");
        }, 2500);
      });
  };

  return (
    <>
      <Snackbar open={!!success} autoHideDuration={6000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Grid key={category.id} item xs={12} md={6} lg={4}>
        <Paper>
          <div className="card">
            <div className="card-header">{category.title}</div>
            <div className="card-body">
              <img
                src={`${category.image_link}`}
                alt=""
                className="w-full h-48"
              />
            </div>
            <div className="items-center justify-around card-footer">
              <button
                className="btn btn-light-primary btn-sm"
                onClick={() => {
                  navigate(`edit-category/${category.id}`);
                }}
              >
                Edit
              </button>
              <label className="flex flex-row items-center justify-between">
                <span className="ml-2 mr-2">Featured</span>
                {loading ? (
                  <div className="space-x-1">
                    <div className="spinner text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <input
                    type="checkbox"
                    checked={category.show_on_home}
                    className="border-indigo-500 form-checkbox "
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleFeatured(e);
                    }}
                  />
                )}
              </label>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default CategoryCard;
