import logger from "../logs/logger.js";
import { User } from "../models/user.js";
import { compare } from "../common/bcrypt.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { STATUS } from "../constantes/index.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ error: "Usuario no autorizado" });
    }
    const token = jwt.sign({ userId: user.id, status: STATUS.ACTIVE }, process.env.JWT_SECRET, {
      expiresIn: eval(process.env.JWT_EXPIRATION),
    });
    return res.json({ token });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
