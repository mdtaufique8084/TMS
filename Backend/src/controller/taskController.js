"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = __importDefault(require("../config/db"));
// Get all tasks for the logged-in user
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const tasks = yield db_1.default.task.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getTasks = getTasks;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { title, description, status } = req.body;
        if (!title)
            return res.status(400).json({ message: "Title is required" });
        const task = yield db_1.default.task.create({
            data: { title, description, status, userId },
        });
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createTask = createTask;
// Update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { id } = req.params;
        const { title, description, status } = req.body;
        const existing = yield db_1.default.task.findUnique({ where: { id: Number(id) } });
        if (!existing || existing.userId !== userId)
            return res.status(404).json({ message: "Task not found" });
        const updated = yield db_1.default.task.update({
            where: { id: Number(id) },
            data: { title, description, status },
        });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { id } = req.params;
        const existing = yield db_1.default.task.findUnique({ where: { id: Number(id) } });
        if (!existing || existing.userId !== userId)
            return res.status(404).json({ message: "Task not found" });
        yield db_1.default.task.delete({ where: { id: Number(id) } });
        res.json({ message: "Task deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteTask = deleteTask;
