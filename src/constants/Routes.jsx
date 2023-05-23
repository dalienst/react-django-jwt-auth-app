/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicLinks, privateLinks } from "./links";
import PrivateRoute from "../middleware/PrivateRoute";
import Navbar from "../layouts/Navbar";

const Landing = React.lazy(() => import("../pages/Landing"));
const Register = React.lazy(() => import("../pages/Register"));
const EngRegister = React.lazy(() => import("../pages/EngRegister"));
const Login = React.lazy(() => import("../pages/Login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Profile = React.lazy(() => import("../pages/Profiles"));

function BaseRouter() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Working to get you there...</div>}>
          <Navbar />
          <Routes>
            <Route exact path={publicLinks.Landing} element={<Landing />} />
            <Route path={publicLinks.Login} element={<Login />} />
            <Route path={publicLinks.Register} element={<Register />} />
            <Route path={publicLinks.EngRegister} element={<EngRegister />} />

            <Route element={<PrivateRoute />}>
              <Route path={privateLinks.Dashboard} element={<Dashboard />} />
              <Route path={privateLinks.Profile} element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default BaseRouter;
