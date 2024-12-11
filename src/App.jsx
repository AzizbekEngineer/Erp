import React from "react";
import Admin from "./pages/admin/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import Customer from "./pages/admin/customer/Customer";
import Store from "./pages/admin/store/Store";
import Seller from "./pages/admin/seller/Seller";
import Create from "./pages/create/Create";
import SingleCustomer from "./pages/single-customer/SingleCustomer";
import Paymet from "./pages/paymet/Paymet";
import Auth from "./pages/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import CreateProduct from "./pages/admin/createProduct/CreateProduct";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navigate to={"/login"} />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin/" element={<Admin />}>
            <Route path="customer" element={<Customer />} />
            <Route path="seller" element={<Seller />} />
            <Route path="store" element={<Store />} />
            <Route path="create" element={<Create />} />
            <Route path="customer/:id" element={<SingleCustomer />} />
            <Route path="profile" element={<Profile />} />
            <Route path="createProduct" element={<CreateProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
