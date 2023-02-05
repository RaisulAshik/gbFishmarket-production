import React, { Suspense, lazy } from "react";

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Common/ScrollToTop";
import Home from ".//Home/Home";

import AboutUs from "./AboutUs/AboutUs";
// about-us nested route components
import AboutDetails from "./AboutUs/components/Deatils";
import History from "./AboutUs/components/History";
import MessageFromCEO from "./AboutUs/components/MessageFromCEO";
import CompanyPhilosophy from "./AboutUs/components/CompanyPhilosophy";
import Teams from "./AboutUs/components/Teams";
//products nested route components
import Products from "./Products/Products";
import ProductList from "./Products/nestedComponent/ProductList";
import ProductDetails from "./Products/nestedComponent/ProductsDetails";
import FilteredProducts from "./Products/nestedComponent/FilteredProducts";
import AddCategory from "./admin/nestedComponents/Products/AddCategoryProducts";
import EditCategory from "./admin/nestedComponents/Products/EditCategoryProducts";
// import FilteredProducts
import ContactUs from "./ContactUs/ContactUS";
import NotFound404 from "./404/NotFound404";
import Login from "./admin/LogIn";

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import "tw-elements"; // remove this and check if it has ant breaking changes in the app.
import AdminProducts from "./admin/AdminProducts";
import AdminClients from "./admin/AdminClients";
import AdminCompany from "./admin/AdminCompany";
import AdminContactInbox from "./admin/AdminContactInbox";
import LogoChange from "./admin/nestedComponents/LogoChange";
import AdminBanner from "./admin/nestedComponents/AdminBanner";
import AdminAnnouncement from "./admin/AdminAnnouncement";
import DetailsProducts from "./admin/nestedComponents/Products/DetailsProducts";
import AllProducts from "./admin/nestedComponents/Products/AllProducts";
import AddProduct from "./admin/nestedComponents/Products/AddProduct";
import EditProduct from "./admin/nestedComponents/Products/EditProduct";
import CategoryProducts from "./admin/nestedComponents/Products/CategoryProducts";
import AllClients from "./admin/nestedComponents/Clients/AllClients";
import EditClient from "./admin/nestedComponents/Clients/EditClients";
import ClientProducts from "./admin/nestedComponents/Clients/ClientProducts";
import AddClient from "./admin/nestedComponents/Clients/AddClient";
import ClientDetails from "./admin/nestedComponents/Clients/ClientDetails";
import AllAnnouncements from "./admin/nestedComponents/Announcements/AllAnncouncements";
import AddAnnouncement from "./admin/nestedComponents/Announcements/AddAnnouncement";
import AnnouncementDetails from "./admin/nestedComponents/Announcements/AnnouncementDetails";
import EditAnnouncement from "./admin/nestedComponents/Announcements/EditAnnouncement";
import Announcements from "./Announcements/Announcements";
import AnnouncementsList from "./Announcements/nestedComponent/AnnouncementsList";
import FilteredAnnouncements from "./Announcements/nestedComponent/FilteredAnnouncements";
import AnnouncementsDetails from "./Announcements/nestedComponent/AnnouncementsDetails";
import CategoryAnnouncements from "./admin/nestedComponents/Announcements/CategoryAnnouncements";
import AddAnnouncementCategory from "./admin/nestedComponents/Announcements/AddCategoryAnnouncements";
import EditAnnouncementsCategory from "./admin/nestedComponents/Announcements/EditCategoryAnnouncements";
// import AdminSisterCompanyLogo from "./admin/nestedComponents/AdminSisterCompanyLogo";
const LazyAdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const LazyAdminDashboard = lazy(() => import("./admin/AdminDashboard"));

const Main = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<AboutUs />}>
          <Route index element={<AboutDetails />} />
          <Route path="history" element={<History />} />
          <Route path="message-from-ceo" element={<MessageFromCEO />} />
          <Route path="company-philosophy" element={<CompanyPhilosophy />} />
          <Route path="teams" element={<Teams />} />
        </Route>
        <Route path="products" element={<Products />}>
          <Route index element={<ProductList />} />
          <Route path="category/:categoryId" element={<FilteredProducts />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
        </Route>
        <Route path="announcements" element={<Announcements />}>
          <Route index element={<AnnouncementsList />} />
          <Route
            path="announcement-category/:categoryId"
            element={<FilteredAnnouncements />}
          />
          <Route
            path="announcement-details/:id"
            element={<AnnouncementsDetails />}
          />
        </Route>
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        {/* admin routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <LazyAdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route
            // path="/admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyAdminDashboard />
              </Suspense>
            }
          >
            {/* general section nested layout */}
            <Route index element={<LogoChange />} />
            <Route path="banner" element={<AdminBanner />} />
            {/* <Route
              path="associated-company"
              element={<AdminSisterCompanyLogo />}
            /> */}
          </Route>
          <Route path="announcement" element={<AdminAnnouncement />}>
            <Route index element={<AllAnnouncements />} />
            <Route path="category" element={<CategoryAnnouncements />} />
            <Route
              path="category/add-category"
              element={<AddAnnouncementCategory />}
            />
            <Route
              path="category/edit-category/:id"
              element={<EditAnnouncementsCategory />}
            />
            <Route path="add-announcement" element={<AddAnnouncement />} />
            <Route path="details/:id" element={<AnnouncementDetails />} />
            <Route path="edit/:id" element={<EditAnnouncement />} />
          </Route>
          <Route path="products" element={<AdminProducts />}>
            <Route index element={<AllProducts />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="category" element={<CategoryProducts />} />
            <Route path="category/add-category" element={<AddCategory />} />
            <Route
              path="category/edit-category/:id"
              element={<EditCategory />}
            />
          </Route>
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/details/:id" element={<DetailsProducts />} />
          <Route path="clients" element={<AdminClients />}>
            <Route index element={<AllClients />} />
            <Route path="add-client" element={<AddClient />} />
            <Route path="products-of-client" element={<ClientProducts />} />
          </Route>
          <Route path="clients/edit/:id" element={<EditClient />} />
          <Route path="clients/details/:id" element={<ClientDetails />} />
          <Route path="company" element={<AdminCompany />} />
          <Route path="inbox" element={<AdminContactInbox />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </ScrollToTop>
  );
};

export default Main;

/*
          
           I’m Vengeance
            |\_|\
            | a_a\
            | | "]
        ____| '-\___
        /.----.___.-'\
        //        _    \
    //   .-. (~v~) /|
    |'|  /\:  .--  / \
    // |-/  \_/____/\/~|
    |/  \ |  []_|_|_] \ |
    | \  | \ |___   _\ ]_}
    | |  '-' /   '.'  |
    | |     /    /|:  | 
    | |     |   / |:  /\
    | |     /  /  |  /  \
    | |    |  /  /  |    \
    \ |    |/\/  |/|/\    \
    \|\ |\|  |  | / /\/\__\
    \ \| | /   | |__
        / |   |____)
        |_/ -->

*/
