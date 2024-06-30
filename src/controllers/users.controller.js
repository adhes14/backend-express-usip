import { STATUS } from "../constantes/index.js";
import logger from "../logs/logger.js";
import { Task } from "../models/tasks.js";
import { User } from "../models/user.js";

export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "status"],
      order: [["id", "ASC"]],
      where: {
        status: STATUS.ACTIVE,
      },
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function createUsers(req, res) {
  const { username, password } = req.body;
  logger.info(`Creating user ${username}`);
  try {
    const user = await User.create({ username, password });
    return res.json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ["username", "status"],
      where: { id },
    });
    if (user) {
      return res.json(user);
    }
    res.status(404).json({ error: "Usuario no encontrado" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.username = username;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function activeInactive(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Falta el status" });
  }
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (user.status === status) {
      return res.status(409).json({ error: "El usuario ya tiene ese status" });
    }
    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await Task.destroy({ where: { user_id: id } });
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function getTasks(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["username"],
      include: {
        model: Task,
        attributes: ["id", "name", "done"],
        where: { done: false },
      },
    });
    if (user) {
      return res.json(user);
    }
    res.status(404).json({ error: "Usuario no encontrado" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
