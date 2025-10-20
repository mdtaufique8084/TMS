import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "../src/routes/authRoutes";
import taskRoutes from "../src/routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Prefix your API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default serverless(app);
