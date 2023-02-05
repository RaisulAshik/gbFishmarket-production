import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Paper,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";

import { Formik, FormikHelpers } from "formik";
import FileUpload, { FileUploadProps } from "../components/FileUpload";
import { addBanner, getBanner } from "../../../api/apiAdminDashboard";
import AddBannerModal from "./Banner/AddBannerModal";
import BannerDetailsModal from "./Banner/BannerDetailsModal";
import { IBanner } from "./Banner/data";
import EditBannerModal from "./Banner/EditBannerModal";

const AdminBanner = () => {
  const [open, setOpen] = React.useState(false);
  const [bannerDetailsOpen, setBannerDetailsOpen] = React.useState(false);
  const [editBannerDetailsOpen, setEditBannerDetailsOpen] =
    React.useState(false);
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IBanner>();
  const [selectedRowEdit, setSelectedRowEdit] = useState<IBanner>();
  const [banners, setBanners] = useState<IBanner[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsLoading(true);
    getBanner().then((res) => {
      setBanners(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        className="p-4 border-2 border-gray-300 rounded-lg "
      >
        <Grid container spacing={2} style={{ marginBottom: "10px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Button variant="contained" onClick={handleOpen}>
              Add Banner
            </Button>

            <AddBannerModal show={open} close={handleClose} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {banners.map((item, index) => (
            <Grid key={item.id} item xs={12} md={6} lg={4}>
              <Paper>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${item.file_link}`}
                    alt="green iguana"
                    sx={{ height: "140px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                      {item.description !== null
                        ? item.description.length > 35
                          ? item.description.substring(0, 35) + "..."
                          : item.description
                        : "No description"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(item);
                        setBannerDetailsOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setSelectedRowEdit(item);
                        setEditBannerDetailsOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <BannerDetailsModal
          record={selectedRow}
          bannerShow={bannerDetailsOpen}
          bannerClose={() => setBannerDetailsOpen(false)}
        />
        <EditBannerModal
          editRecord={selectedRowEdit}
          editBannerShow={editBannerDetailsOpen}
          editBannerClose={() => setEditBannerDetailsOpen(false)}
        />
      </Container>
    </>
  );
};
export default AdminBanner;
