import { STATUS } from "../constantes/index.js";
import logger from "../logs/logger.js";
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
