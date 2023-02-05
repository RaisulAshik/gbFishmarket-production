import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export interface IAnnouncement {
  id: number;
  title: string;
  short_description: string;
  image_name: string;
  image_link: string;
  show_on_home: boolean;
  category?:any;
  created_at?: Date;
  updated_at?: Date;
}

const AdminAnnouncement = () => {
  const location = useLocation();
  return (
    <Container
      maxWidth="lg"
      className="flex flex-col items-center justify-center"
    >
      <>
        <Box>
          <Typography variant="h5">Announcements Customaization</Typography>
          <Typography variant="h6" className="py-4">
            Add new announcements, edit existing announcements, Feature
            announcements to your homepage doscover sections
          </Typography>
          <Box>
            <nav className="mt-4 tab tab-lg tab-full">
              {/* react-routers Navlink sends a active class when the path(to='/...) is selected. so the check i did with location.pathname to send the active class is unnecessary here but  i did to solve a small bug with the index route being always active */}

              <NavLink
                className={
                  location.pathname === "/admin/announcement"
                    ? "tab-link active ring-transparent"
                    : "tab-link ring-transparent"
                }
                to="/admin/announcement/"
              >
                Browse All Announcements
              </NavLink>
              <NavLink
                className={
                  location.pathname === "/admin/announcement/category"
                    ? "tab-link active ring-transparent"
                    : "tab-link ring-transparent"
                }
                to="/admin/announcement/category"
              >
                Announcement Categories
              </NavLink>
            </nav>
          </Box>
        </Box>
        <Outlet />
      </>
    </Container>
  );
};

export default AdminAnnouncement;
