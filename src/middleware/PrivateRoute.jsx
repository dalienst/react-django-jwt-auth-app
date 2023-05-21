import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import { publicLinks } from "../constants/links";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to={publicLinks.Login} replace />;
};

export default PrivateRoute;
