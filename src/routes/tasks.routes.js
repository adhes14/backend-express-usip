import { Router } from "express";
import { createTasks, getTasks, getTask, updateTask, taskDone, deleteTask } from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js"

const router = Router();

router.get("/", authenticateToken, getTasks);

router.post("/", authenticateToken, createTasks);

router.get("/:id", authenticateToken, getTask);

router.put("/:id", authenticateToken, updateTask);

router.patch("/:id", authenticateToken, taskDone);

router.delete("/:id", authenticateToken, deleteTask);

export default router;
