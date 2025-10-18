import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import TasksPage from "../features/tasks/TasksPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LandingPage from "../features/LandingPage";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />

      {/* Global Toaster */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }}
      />

      <Routes>
        {/* Landing page for non-authenticated users */}
        <Route
          path="/"
          element={token ? <Navigate to="/tasks" /> : <LandingPage />}
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/tasks" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/login" /> : <Register />}
        />

        {/* Protected tasks page */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* Optional: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
