import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../../api/apiAdminProducts";
import { IProduct } from "./AllProducts";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetailsProducts = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const renderHTML = (rawHTML: string) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  useEffect((): void => {
    if (id) {
      getProduct(parseInt(id))
        .then((res) => res.data)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [id]);

  const {
    title,
    subtitle,
    long_description,
    short_description,
    image_name,
    image_link,
    show_on_home,
  } = product;

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-row items-center justify-between w-full my-4 text-indigo-500 ">
        <div className="w-1/4">
          <button
            className=" btn btn-light-secondary btn-sm mr-28"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowBackIosNewOutlinedIcon /> Go back
          </button>
        </div>
        <div className="flex items-center justify-around w-1/2">
          <Typography
            variant="h6"
            className="font-montserrat font-semibold"
            gutterBottom
          >
            Edit Product
          </Typography>
        </div>
        <div className="w-1/4 h-4"></div>
      </div>
      {(loading && <div>Loading...</div>) || (
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {/* image */}
            <Box className="w-full p-4 border-2 border-gray-300 rounded-lg h-72">
              <img
                src={`${image_link}`}
                alt={image_name}
                className="w-full h-full"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            {/* details */}
            <Box className="w-full p-4 border-2 border-gray-300 rounded-lg">
              <Stack spacing={2}>
                <Paper className="p-4">
                  <Typography variant="h4">{title}</Typography>
                </Paper>
                <Paper className="p-4">
                  <Typography variant="h6">{subtitle}</Typography>
                </Paper>
                <Paper className="p-4">
                  <Typography variant="body1">{renderHTML(long_description)}</Typography>
                </Paper>
                <Paper className="p-4">
                  <Typography variant="body1">{short_description}</Typography>
                </Paper>
                <Paper className="p-4">
                  <Typography variant="body1">{image_name}</Typography>
                </Paper>
                {/* <Typography variant="body1">{image_link}</Typography> */}
                <Paper className="p-4">
                  <Typography variant="overline">
                    {show_on_home
                      ? "This Product is Featured in discover section"
                      : "This Product is Featured in discover section"}
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default DetailsProducts;
