import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "../../types";

const TasksPage = () => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto h-[85vh]">
      {/* Left side - Task form */}
      <div className="md:w-1/3 bg-white rounded-2xl shadow-md p-4 flex flex-col">
        <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />
      </div>

      {/* Right side - Task list */}
      <div className="md:w-2/3 bg-white rounded-2xl shadow-md p-4 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <TaskList onEdit={(task) => setTaskToEdit(task as Task)} />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
