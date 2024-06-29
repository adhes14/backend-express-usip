import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 255],
        msg: "Description must be between 1 and 255 characters long",
      },
      notNull: {
        msg: "Description is required",
      },
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notNull: {
        msg: "Status is required",
      },
    },
  },
});