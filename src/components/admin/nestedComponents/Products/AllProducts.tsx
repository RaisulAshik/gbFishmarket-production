import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import {
  getAllProducts,
  deleteProduct,
} from "../../../../api/apiAdminProducts";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ProductCard from "../../components/ProductCard";
import { userInfo } from "../../../../utils/auth";
import { CircularProgress } from "@mui/material";

export interface IProduct {
  id: number;
  title: string;
  subtitle: string;
  long_description: string;
  short_description: string;
  image_name: string;
  image_link: string;
  show_on_home: boolean;
  category_id?: string;
  client_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

/* grid layout that has 5 column  */
const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [refrase, setRefrase] = useState({});
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleDelete = (id: number) => {
    const token = userInfo().token as string;
    deleteProduct(id, token)
      .then((res) => res.data)
      .then((data) => {
        console.log("api returned", data.message);
        setSuccess("Product deleted successfully");
        setRefrase({});
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("failed to delete");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  useEffect(() => {
    setLoadingData(true);
    getAllProducts()
      .then((res) => res.data)
      .then((data) => {
        setProducts(data);
        setLoadingData(false);
        // console.log(data);
      })
      .catch((err) => {
        setLoadingData(false);
        console.log(err);
      });
    return () => {
      setLoadingData(false);
      setProducts([]);
    };
  }, [refrase]);
  return (
    <Container
      maxWidth="lg"
      className="p-4 border-2 border-gray-300 rounded-lg "
    >
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
      {products.length === 0 && <div>No products</div>}
      {!loadingData ? (
        <Grid container spacing={2}>
          {products.map((item, index) => {
            return (
              <ProductCard
                item={item}
                deleteProduct={(id: number) => {
                  handleDelete(id);
                }}
              />
            );
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

export default AllProducts;
