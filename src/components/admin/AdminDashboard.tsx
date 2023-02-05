import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import DashboardNavbar from "./components/DashboardNavbar";

const AdminDashBoard = () => {
  return (
    <Container
      maxWidth="lg"
      className="flex flex-col items-center justify-center"
    >
      <Box>
        <Typography variant="h5">Admin Dashboard</Typography>
        <Typography variant="h6" className="py-4">
          change logo, update banner, edit/lunch announcements, etc.
        </Typography>

        <DashboardNavbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AdminDashBoard;
