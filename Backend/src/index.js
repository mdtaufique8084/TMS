"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => res.json({ message: "Task Manager API running" }));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/tasks", taskRoutes_1.default);
exports.default = app;
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
}
