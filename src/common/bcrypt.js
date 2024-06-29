import logger from "../logs/logger.js";
import bcrypt from "bcrypt";
import 'dotenv/config';

export const encrypt = async (password) => {
  try {
    const saltRounds = +process.env.BCRYPT_ROUNDS ?? 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    logger.error(error);
    throw new Error("Error encrypting password");
  }
};

export const compare = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error(error.message);
    throw new Error("Error comparing passwords");
  }
}