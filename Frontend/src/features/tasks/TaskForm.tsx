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

      //  Block submission if token missing
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

        //  Check for unauthorized error
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
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gradient-to-r from-green-50 to-white shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        {taskToEdit ? "Edit Your Task" : "Create a New Task"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Task Title"
            className={`w-full p-4 rounded-xl border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 bottom-[-1.2rem]">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Task Description (optional)"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
            rows={5}
          />
        </div>

        <div>
          <select
            {...register("status")}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-xl font-bold hover:bg-green-600 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            <AiOutlineCheck className="text-2xl" />
          )}
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
