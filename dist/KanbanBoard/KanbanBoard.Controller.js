"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskById = exports.updateTaskStatus = exports.getAllTasks = exports.deleteTask = exports.createTask = exports.generateAIContent = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
const KanbanBoard_Modal_1 = __importDefault(require("./KanbanBoard.Modal"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const today = new Date();
const scrumDeadline = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]; // Format: YYYY-MM-DD
const agileDeadline = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]; // 
const generateAIContent = async (req, res) => {
    const { title, methodology } = req.body;
    if (!title || !methodology) {
        return res.status(400).json({ error: 'Title and methodology are required.' });
    }
    const systemPrompt = `You are an AI assistant that helps generate **detailed, realistic, and structured task content** for project management tools like Jira, Trello, or Asana. Given a task title and a methodology ("scrum" or "agile"), return data in **valid JSON format only** as described below:

{
  "suggestedTitle": string, // Capitalized and trimmed version of the input title
  "description": string, // Must be 3-5 lines, clear and professional
  "deadline": string (for scrum use this date: "${scrumDeadline}", for agile use this date: "${agileDeadline}"),
    "userStory": string // Include this only if methodology is scrum, in this format: "As a user, I want  so that ",

  "documentationRefs": [
    {
      "name": string, // Name of the documentation/article
      "url": string // Must be a valid and working link, preferably a Google article or top-ranking resource (like Atlassian, Scrum.org, etc.)
    },
    ...
    // Total 3 references
  ],
  "subtasks": [
    {
      "title": string, // Actionable, specific task (not vague or generic)
      "completed": false
    },
    ...
    // Total 5 subtasks
  ],
  "suggestedTags": [ string, string, string ] // 3 relevant, lowercase tags (e.g. "api", "scrum", "frontend")
}

Important Guidelines:
- **If methodology is 'scrum'**, also include a user story (in the format: "As a [role], I want to [do something] so that [benefit]") at the end of the description.
- Subtasks must be small, logically sequenced steps required to complete the main task.
- Documentation URLs must NOT be placeholder links. Prefer **Google Search results or reliable sites** (Scrum Guide, Atlassian, Google Developers, Medium, etc.).
- Only return clean, valid JSON. No explanation or extra text.`;
    const userMessage = `Title: ${title}\nMethodology: ${methodology}`;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // Or gpt-3.5-turbo if you want a cheaper model
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 800,
        });
        const aiRawContent = response.choices?.[0]?.message?.content;
        if (!aiRawContent) {
            return res.status(500).json({ error: 'No content received from AI.' });
        }
        let parsed;
        console.log(parsed = JSON.parse(aiRawContent), 'check>>');
        try {
            parsed = JSON.parse(aiRawContent);
        }
        catch (err) {
            return res.status(200).json({
                success: false,
                message: 'Could not parse AI response as JSON',
                raw: aiRawContent,
            });
        }
        return res.status(200).json({
            success: true,
            data: parsed,
        });
    }
    catch (error) {
        console.error('AI generation error:', error);
        return res.status(500).json({ error: 'AI generation failed.', details: error.message });
    }
};
exports.generateAIContent = generateAIContent;
const createTask = async (req, res) => {
    try {
        const { title, originalTitle, description, userStory, deadline, priority, status, methodology, tags, subtasks, documentationRefs, progress, } = req.body;
        const newTask = await KanbanBoard_Modal_1.default.create({
            title,
            originalTitle,
            description,
            userStory,
            deadline,
            priority,
            status,
            methodology,
            tags,
            subtasks,
            documentationRefs,
            progress: progress || 0,
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.createTask = createTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await KanbanBoard_Modal_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};
exports.deleteTask = deleteTask;
const getAllTasks = async (req, res) => {
    try {
        const tasks = await KanbanBoard_Modal_1.default.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};
exports.getAllTasks = getAllTasks;
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await KanbanBoard_Modal_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateTaskStatus = updateTaskStatus;
const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTask = await KanbanBoard_Modal_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask)
            return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};
exports.updateTaskById = updateTaskById;
