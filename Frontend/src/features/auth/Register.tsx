import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

const schema = z.object({
  username: z
    .string()
    .min(3, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // <-- initialize navigate
  const [loading, setLoading] = useState(false);

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
      await dispatch(registerUser(data)).unwrap();
      toast.success("Registered successfully!");
      navigate("/login");
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

        <div className="relative">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`w-full p-4 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-1.2rem]">
              {errors.password.message}
            </p>
          )}
        </div>

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
          Register
        </button>
        <p className="text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
      </form>
    </div>
  );
};

export default Register;
