import { useEffect, useState, type ChangeEvent } from "react";
import { fetchTasks, deleteTask } from "./taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Task } from "../../types";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineSearch,
} from "react-icons/ai";
import { toast } from "react-hot-toast";

interface TaskListProps {
  onEdit: (task: Partial<Task>) => void;
}

const TaskList = ({ onEdit }: TaskListProps) => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Search filters
  const [searchTitle, setSearchTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setDeletingId(id);
    dispatch(deleteTask(id))
      .then(() => toast.success("Task deleted successfully!"))
      .catch(() => toast.error("Failed to delete task."))
      .finally(() => setDeletingId(null));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Filter tasks by title, status, and date
  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesDate = !filterDate || task.createdAt.startsWith(filterDate);
    return matchesTitle && matchesStatus && matchesDate;
  });

  if (loading)
    return (
      <div className="text-center mt-12 text-gray-500 text-lg font-medium">
        Loading tasks...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-2 p-8 bg-gradient-to-r from-white to-green-50 shadow-lg rounded-2xl border border-gray-100 h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
        My Tasks
      </h2>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <div className="relative w-full md:w-1/3">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-700 text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(e.target.value)
          }
          className="w-full md:w-1/4 border border-gray-300 py-3 px-4 rounded-xl text-gray-700 text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 py-3 px-4 rounded-xl text-gray-700 text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
        />
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:shadow-md hover:border-green-400 transition-all duration-200"
            >
              <div className="mb-4 md:mb-0 w-full">
                <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1 text-base">{task.description}</p>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 items-center">
                  <span className="flex items-center gap-1">
                    <AiOutlineCalendar /> {formatDate(task.createdAt)}
                  </span>
                </div>

                <span
                  className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => onEdit(task)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition"
                >
                  <AiOutlineEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                  className={`flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition ${
                    deletingId === task.id ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <AiOutlineDelete />
                  {deletingId === task.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 text-lg font-medium mt-10">
              No tasks found. Try adjusting your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
