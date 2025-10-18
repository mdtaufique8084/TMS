import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task } from "../../types";

const TasksPage = () => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto">
      <div className="md:w-1/3">
        <TaskForm taskToEdit={taskToEdit} clearEdit={() => setTaskToEdit(null)} />
      </div>
      <div className="md:w-2/3">
        <TaskList onEdit={(task) => setTaskToEdit(task as Task)} />
      </div>
    </div>
  );
};

export default TasksPage;
