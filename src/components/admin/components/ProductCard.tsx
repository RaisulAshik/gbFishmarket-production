import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { IProduct } from "../nestedComponents/Products/AllProducts";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../api/apiAdminProducts";
import { userInfo } from "../../../utils/auth";
interface IProps {
  item: IProduct;
  deleteProduct(id: number): void;
}
const ProductCard = ({ item, deleteProduct }: IProps) => {
  const navigation = useNavigate();
  const [product, setProduct] = useState<IProduct>(item);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoading(true);
    const token = userInfo().token as string;
    const getFormData = (object: IProduct): FormData =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key as keyof object]);
        return formData;
      }, new FormData());

    updateProduct(
      getFormData({ ...product, show_on_home: e.target.checked }),
      product.id,
      token
    )
      .then((res) => res.data)
      .then((data) => {
        console.log("api returned", data.result);
        setProduct(data.result);
        setLoading(false);
        setSuccess(
          `${product.title} is ${
            !product.show_on_home ? "now featured" : "no longer featured"
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

      <Grid key={product.id} item xs={12} md={6} lg={4}>
        <Paper>
          <div className="card">
            <div className="card-header">{product.title}</div>
            <div className="card-body">
              <img
                src={`${product.image_link}`}
                alt=""
                className="w-full h-48"
              />
              {product.subtitle}
            </div>
            <div className="items-center justify-around card-footer">
              <button
                className="btn btn-link btn-sm"
                onClick={() => {
                  navigation(`details/${product.id}`);
                }}
              >
                View details
              </button>
              <button
                className="btn btn-light-primary btn-sm"
                onClick={() => {
                  navigation(`edit/${product.id}`);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-link btn-outline-danger btn-sm"
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                Delete
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
                    checked={product.show_on_home}
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

export default ProductCard;
