import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { STATUS } from "../constantes/index.js";
import { Tasks } from "./tasks.js";
import logger from "../logs/logger.js";
import { encrypt } from "../common/bcrypt.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username is already in use",
    },
    validate: {
      len: {
        args: [4, 20],
        msg: "Username must be between 4 and 20 characters long",
      },
      notNull: {
        msg: "Username is required",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 20],
        msg: "Username must be between 4 and 20 characters long",
      },
      notNull: {
        msg: "Username is required",
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: STATUS.ACTIVE,
    validate: {
      isIn: {
        args: [[STATUS.ACTIVE, STATUS.INACTIVE]],
        msg: `Status must be ${STATUS.ACTIVE} or ${STATUS.INACTIVE}`,
      },
      notNull: {
        msg: "Status is required",
      },
    },
  },
});

User.hasMany(Tasks, {
  foreignKey: "user_id",
  sourceKey: "id",
});

Tasks.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

User.beforeCreate(async (user) => {
  try {
    user.password = await encrypt(user.password);
  } catch (error) {
    logger.error(error);
    throw new Error("Error encrypting password");
  }
});

User.beforeUpdate(async (user) => {
  try {
    user.password = await encrypt(user.password);
  } catch (error) {
    logger.error(error);
    throw new Error("Error encrypting password");
  }
});
