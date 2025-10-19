import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask, updateTask } from "./taskSlice";
import { useAppDispatch } from "../../app/hooks";
import type { Task } from "../../types";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface TaskFormData {
  title: string;
  description?: string;
  status: "pending" | "completed";
}

interface TaskFormProps {
  taskToEdit?: Task | null;
  clearEdit: () => void;
}

const TaskForm = ({ taskToEdit, clearEdit }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: { status: "pending" },
  });

  useEffect(() => {
    if (taskToEdit) {
      setValue("title", taskToEdit.title);
      setValue("description", taskToEdit.description || "");
      setValue("status", taskToEdit.status);
    }
  }, [taskToEdit, setValue]);

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized! Please log in first.");
        setLoading(false);
        return;
      }

      if (taskToEdit) {
        const result = await dispatch(updateTask({ id: taskToEdit.id, task: data }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result as any).error?.message?.includes("401")) {
          toast.error("Session expired! Please log in again.");
          return;
        }

        toast.success("Task updated successfully!");
        clearEdit();
      } else {
        const result = await dispatch(createTask(data));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result as any).error?.message?.includes("401")) {
          toast.error("Unauthorized! Please log in again.");
          return;
        }

        toast.success("Task added successfully!");
      }

      reset();
    } catch (err) {
      const error = err as { message?: string };
      toast.error(`Something went wrong! ${error.message || ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-100 transition-all hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
        {taskToEdit ? "Edit Task" : "Create a New Task"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter task title"
            className={`w-full p-3 rounded-lg border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 placeholder-gray-400 text-base transition`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Add more details (optional)"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 placeholder-gray-400 text-base transition"
            rows={4}
          />
        </div>

        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base transition"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
          ) : (
            <AiOutlineCheck className="text-lg" />
          )}
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
