import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white overflow-hidden px-4 sm:px-6"
      style={{ height: "calc(100vh - 80px)", paddingTop: "80px" }} 
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center text-gray-900">
        Welcome to Task Manager
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center text-gray-700 max-w-xl">
        Manage your tasks efficiently and stay organized. Track your work, set priorities, and achieve more.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition text-center"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
