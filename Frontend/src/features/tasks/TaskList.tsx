import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "./taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Task } from "../../types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface TaskListProps {
    onEdit: (task: Partial<Task>) => void;
}

const TaskList = ({ onEdit }: TaskListProps) => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (!confirm) return;

        setDeletingId(id);
        dispatch(deleteTask(id))
            .then(() => {
                toast.success("Task deleted successfully!");
            })
            .catch(() => {
                toast.error("Failed to delete task.");
            })
            .finally(() => setDeletingId(null));
    };

    if (loading) return <div className="text-center mt-10 text-gray-500">Loading tasks...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">My Tasks</h2>

            {/* Scrollable container */}
            <div className="max-h-[55vh] overflow-y-auto grid gap-6">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="border p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 hover:bg-white transition"
                    >
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                            <span
                                className={`mt-2 inline-block px-3 py-1 rounded-full text-white font-semibold ${task.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                                    }`}
                            >
                                {task.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onEdit(task)}
                                className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                            >
                                <AiOutlineEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                disabled={deletingId === task.id}
                                className={`flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition ${deletingId === task.id ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                <AiOutlineDelete />
                                {deletingId === task.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">No tasks available. Add a new task above!</p>
                )}
            </div>
        </div>
    );

};

export default TaskList;
