import { useLocation, NavLink } from "react-router-dom";

const DashboardNavbar = () => {
  const location = useLocation();
  return (
    <nav className="mt-4 tab tab-lg tab-full">
      {/* react-routers Navlink sends a active class when the path(to='/...) is selected. so the check i did with location.pathname to send the active class is unnecessary here but  i did to solve a small bug with the index route being always active */}

      <NavLink
        className={
          location.pathname === "/admin"
            ? "tab-link active ring-transparent"
            : "tab-link ring-transparent"
        }
        to="/admin/"
      >
        Change logo
      </NavLink>

      <NavLink
        className={
          location.pathname === "/admin/banner"
            ? "tab-link active ring-transparent"
            : "tab-link ring-transparent"
        }
        to="/admin/banner"
      >
        Banner Customaization
      </NavLink>
      {/* <NavLink
        className={
          location.pathname === "/admin/associated-company"
            ? "tab-link active ring-transparent"
            : "tab-link ring-transparent"
        }
        to="/admin/associated-company"
      >
        Brands/Assosiated company
      </NavLink> */}
    </nav>
  );
};

export default DashboardNavbar;
