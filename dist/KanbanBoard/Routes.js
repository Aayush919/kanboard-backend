"use strict";
// API endpoints to implement:
// POST /api/auth/login
// POST /api/auth/register
// GET /api/tasks
// POST /api/tasks
// PUT /api/tasks/:id
// DELETE /api/tasks/:id
// POST /api/ai/generate-content
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireParameters_1 = __importDefault(require("../Middlewares/Global/requireParameters"));
const KanbanBoard_Controller_1 = require("./KanbanBoard.Controller");
const router = express_1.default.Router();
router.post("/ai/generate-content", (0, requireParameters_1.default)("title", "methodology"), KanbanBoard_Controller_1.generateAIContent);
router.post("/task-create", (0, requireParameters_1.default)("title", "originalTitle", "description", "deadline", "priority", "status", "methodology"), KanbanBoard_Controller_1.createTask);
router.delete("/tasks/:id", KanbanBoard_Controller_1.deleteTask);
router.get("/tasks", KanbanBoard_Controller_1.getAllTasks);
router.patch("/tasks/:id/status", KanbanBoard_Controller_1.updateTaskStatus);
router.put('/tasks/:id', KanbanBoard_Controller_1.updateTaskById);
exports.default = router;
