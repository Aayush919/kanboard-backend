// API endpoints to implement:
// POST /api/auth/login
// POST /api/auth/register
// GET /api/tasks
// POST /api/tasks
// PUT /api/tasks/:id
// DELETE /api/tasks/:id
// POST /api/ai/generate-content

import express from "express";
import requireParameters from "../Middlewares/Global/requireParameters"
import { createTask, deleteTask, generateAIContent, getAllTasks, updateTaskById, updateTaskStatus } from "./KanbanBoard.Controller";
const router=express.Router();

router.post("/ai/generate-content",requireParameters("title", "methodology"),generateAIContent)
router.post("/task-create",requireParameters("title","originalTitle","description","deadline","priority","status","methodology"),createTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks", getAllTasks);
router.patch("/tasks/:id/status", updateTaskStatus);
router.put('/tasks/:id', updateTaskById);

 
export default router;