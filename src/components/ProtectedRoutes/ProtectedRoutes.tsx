import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children, ...rest }: IProtectedRouteProps) => {
  if (isAuthenticated()) {
    return children;
  }
  return (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default ProtectedRoute;
