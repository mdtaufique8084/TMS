import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "../../types";
import axiosInstance from "../../api/axios"; 
import axios from "axios"; 

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Helper to extract error message
const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unknown error occurred";
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tasks");
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk<Task, Partial<Task>, { rejectValue: string }>(
  "tasks/create",
  async (task, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/tasks", task);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk<Task, { id: number; task: Partial<Task> }, { rejectValue: string }>(
  "tasks/update",
  async ({ id, task }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, task);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk<number, number, { rejectValue: string }>(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      return id;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      })
      // createTask
      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create task";
      })
      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
