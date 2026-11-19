import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/user/Home";
import Cars from "../pages/user/Cars";
import Offers from "../pages/user/Offers";
import Services from "../pages/user/Services";
import ContactUs from "../pages/user/ContactUs";
import AboutUs from "../pages/user/AboutUs";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Profile from "../pages/user/Profile";
import UserNotifications from "../pages/user/UserNotifications";
import BookingDetails from "../pages/user/BookingDetails";
import Payment from "../pages/user/Payment";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import Invoice from "../pages/user/Invoice";
import Favorites from "../pages/user/Favorites";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDirectory from "../pages/admin/AdminDirectory";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminRoute from "../components/admin/AdminRoute";
import UserRoute from "../components/user/UserRoute";

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
          <Route path="login" element={<Login />} />
          <Route path="admin-login" element={<Login mode="admin" />} />
          <Route path="register" element={<Register />} />
          <Route element={<UserRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="user-notifications" element={<UserNotifications />} />
          <Route path="booking-details/:id" element={<BookingDetails />}/>
          <Route path="payment/:id" element={<Payment />}/>
          <Route path="payment-success" element={<PaymentSuccess />}/>
          <Route path="invoice" element={<Invoice />}/>
          <Route path="favorites" element={<Favorites />}/>
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDirectory type="users" />} />
            <Route path="owners" element={<AdminDirectory type="owners" />} />
            <Route path="cars" element={<AdminDirectory type="cars" />} />
            <Route path="banks" element={<AdminDirectory type="banks" />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="notifications" element={<AdminProfile notifications />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
