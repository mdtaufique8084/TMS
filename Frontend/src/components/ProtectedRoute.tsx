import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
