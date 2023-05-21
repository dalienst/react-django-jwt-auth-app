/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicLinks, privateLinks } from "./links";
import PrivateRoute from "../middleware/PrivateRoute";

const Landing = React.lazy(() => import("../pages/Landing"));
const Register = React.lazy(() => import("../pages/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

function BaseRouter() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Working to get you there...</div>}>
          <Routes>
            <Route exact path={publicLinks.Landing} element={<Landing />} />
            <Route path={publicLinks.Login} element={<Login />} />
            <Route path={publicLinks.Register} element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path={privateLinks.Dashboard} element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default BaseRouter;
