import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600 mb-2 sm:mb-0">
          TaskManager
        </NavLink>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {token ? (
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
