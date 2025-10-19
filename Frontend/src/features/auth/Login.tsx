import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginUser } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 

const schema = z.object({
  username: z.string().min(3, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await dispatch(loginUser(data)).unwrap();
      // toast.success("Login successful!");
      navigate("/tasks");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Email */}
        <div className="relative">
          <input
            {...register("username")}
            placeholder="Email"
            className={`w-full p-4 rounded-xl border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-1.2rem]">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password with toggle */}
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            className={`w-full p-4 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition`}
          />
          {/* Eye icon toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-1.2rem]">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-blue-500 text-white p-4 rounded-xl font-bold hover:bg-blue-600 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-500 mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
