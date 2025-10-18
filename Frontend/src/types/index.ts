export interface User {
  id: number;
  username: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
  userId: number;
  createdAt: string;
  updatedAt: string;
}
