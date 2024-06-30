import { Task } from "../models/tasks.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js"
import logger from "../logs/logger.js";

export async function getTasks(req, res) {
  const { userId } = req.user;
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "done"],
      where: {
        user_id: userId,
      },
    });
    res.json(tasks);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function createTasks(req, res) {
  const { name } = req.body;
  const { userId } = req.user;
  try {
    const task = await Task.create({ name, user_id: userId });
    return res.json(task);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function getTask(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await Task.findOne({
      attributes: ["name", "done"],
      where: { id, user_id: userId },
    });
    if (task) {
      return res.json(task);
    }
    res.status(404).json({ error: "Task not found" });
  }
  catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const { userId } = req.user;
  try {
    const task = await Task.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    task.name = name;
    await task.save();
    res.json(task);
  }
  catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function taskDone(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await Task.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    task.done = true;
    await task.save();
    res.json(task);
  }
  catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const task = await Task.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    await task.destroy();
    res.json(task);
  }
  catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}