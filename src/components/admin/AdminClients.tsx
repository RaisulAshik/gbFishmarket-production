import { useState, useEffect } from "react";
import { userInfo } from "../../utils/auth";
import { Container, Box, Typography, Paper, Divider } from "@mui/material";
import { NavLink, useLocation, Outlet } from "react-router-dom";

export default function AdminClients() {
  const location = useLocation();
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Clients
        </Typography>
      </Box>
      <Divider />
      <Box>
        <nav className="mt-4 tab tab-lg tab-full">
          {/* react-routers Navlink sends a active class when the path(to='/...) is selected. so the check i did with location.pathname to send the active class is unnecessary here but  i did to solve a small bug with the index route being always active */}

          <NavLink
            className={
              location.pathname === "/admin/clients"
                ? "tab-link active ring-transparent"
                : "tab-link ring-transparent"
            }
            to="/admin/clients/"
          >
            All Clients
          </NavLink>

          <NavLink
            className={
              location.pathname === "/admin/clients/products-of-client"
                ? "tab-link active ring-transparent"
                : "tab-link ring-transparent"
            }
            to="/admin/clients/products-of-client"
          >
            Add/edit client Products
          </NavLink>
        </nav>
      </Box>
      <Outlet />
    </Container>
  );
}
