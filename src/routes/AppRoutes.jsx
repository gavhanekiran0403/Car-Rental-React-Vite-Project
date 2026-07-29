import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/user/Home";
import Cars from "../pages/user/Cars";
import Offers from "../pages/user/Offers";
import Services from "../pages/user/Services";
import ContactUs from "../pages/user/ContactUs";
import AboutUs from "../pages/user/AboutUs";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />} />
          <Route path="offers" element={<Offers />} />
          <Route path="services" element={<Services />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="aboutUs" element={<AboutUs />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Example */}
          {/* <Route index element={<Dashboard />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;