import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { getLogo } from "../../api/apiAdminDashboard";
//
//  raisin black = #2E2C2F
// deep space Sparkle = #475B63
// lavender = #FFEAEC
const NavBar = () => {
  const pervScrollY = useRef(0);
  pervScrollY.current = 110;
  const [makeSticky, setMakeSticky] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [logo, setLogo] = useState<string>("");
  const [toggleClass, setToggleClass] = useState(
    "min-w-max absolute bg-white text-base z-50 top-6 -right-8 py-2 list-none text-left  rounded-lg shadow-lg  mt-1 m-0 bg-clip-padding border-none hidden md:hidden"
  );

  useEffect(() => {
    getLogo()
      .then((res: any) => res.data)
      .then((res) => setLogo(res.data.file_link))
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const toggleMenuHandler = () => {
    if (!isToggle) {
      setToggleClass(
        "min-w-max absolute bg-white text-base z-50 top-8 -right-8 py-2 list-none text-left  rounded-lg shadow-lg  mt-1 m-0 bg-clip-padding border-none md:hidden"
      );
    } else {
      setToggleClass(
        "min-w-max absolute bg-white text-base z-50 top-8 -right-8 py-2 list-none text-left  rounded-lg shadow-lg  mt-1 m-0 bg-clip-padding border-none hidden md:hidden"
      );
    }
    setIsToggle(!isToggle);
  };

  const handleStickyNav = () => {
    const currentScrollY = window.scrollY;
    if (pervScrollY.current > currentScrollY) {
      setMakeSticky(" h-20");
    }
    if (pervScrollY.current < currentScrollY) {
      setMakeSticky("sticky h-16 ");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNav, { passive: true });
    return () => window.removeEventListener("scroll", handleStickyNav);
  }, [makeSticky]);

  return (
    <nav
      className={`bg-[#2c3941] items-center drop-shadow-md top-0 z-50 relative  ${makeSticky}`}
    >
      <div
        className={`flex flex-row mx-auto  justify-between  max-w-screen-xl px-8 xl:px-32 lg:px-24 md:px-12 sm:px-8 ${makeSticky}`}
      >
        {/* LOGO #2c3941*/}
        <div className="w-48">
          <Link to="/">
            <img
              src={require("../../assets/img/logo.PNG")}
              // src={require("../../assets/img/logo.png")}
              alt="logo"
              className={`h-20 py-3  ${makeSticky}`}
            />
          </Link>
        </div>
        {/* nav links */}
        <div className="flex">
          <ul className="hidden md:flex md:flex-row md:items-center md:space-x-6 md:justify-end">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { color: "#b8cc08" } : { color: "#3a6ea5" }
                }
              >
                <span className="text-sm font-semibold uppercase font-montserrat text-transform: ">
                  Home
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                style={({ isActive }) =>
                  isActive ? { color: "#b8cc08" } : { color: "#3a6ea5" }
                }
              >
                <span className="text-sm font-semibold uppercase font-montserrat text-transform:">
                  About Us
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                style={({ isActive }) =>
                  isActive ? { color: "#b8cc08" } : { color: "#3a6ea5" }
                }
              >
                <span className="text-sm font-semibold uppercase font-montserrat text-transform:">
                  Products
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/announcements"
                style={({ isActive }) =>
                  isActive ? { color: "#b8cc08" } : { color: "#3a6ea5" }
                }
              >
                <span className="text-sm font-semibold uppercase font-montserrat text-transform:">
                  Announcements
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                style={({ isActive }) =>
                  isActive ? { color: "#b8cc08" } : { color: "#3a6ea5" }
                }
              >
                <span className="text-sm  font-montserrat font-semibold hover:text-[#042a2b] text-transform: uppercase">
                  Contact Us
                </span>
              </NavLink>
            </li>
          </ul>
          {/* icon with dropdown menu */}
          <div className="flex items-center justify-center">
            <div>
              <div className="relative">
                {isToggle ? (
                  <AiFillCloseCircle
                    className="w-8 h-8 cursor-pointer hover:fill-indigo-500 md:hidden"
                    style={{ color: "#b8cc08" }}
                    onClick={toggleMenuHandler}
                  />
                ) : (
                  <GiHamburgerMenu
                    className="w-6 h-6 cursor-pointer hover:fill-indigo-500 md:hidden"
                    style={{ color: "#b8cc08" }}
                    onClick={toggleMenuHandler}
                  />
                )}
                {/* dropdown menu */}
                <ul
                  className={toggleClass}
                  aria-labelledby="dropdownMenuButton1s"
                >
                  <li>
                    <Link
                      to="/"
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent font-montserrat whitespace-nowrap hover:bg-gray-100"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-us"
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent font-montserrat whitespace-nowrap hover:bg-gray-100"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent font-montserrat dropdown-item whitespace-nowrap hover:bg-gray-100"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/announcements"
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent font-montserrat dropdown-item whitespace-nowrap hover:bg-gray-100"
                    >
                      Announcements
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent font-montserrat dropdown-item whitespace-nowrap hover:bg-gray-100"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                {/* end dropdown menu */}
              </div>
            </div>
          </div>
          {/* end pf icon with dropdown menu  */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
