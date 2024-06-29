import { Router } from "express";
import {
  getUsers,
  createUsers,
  getUser,
  updateUser,
  activeInactive,
  deleteUser,
  getTasks,
} from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.get("/:id", authenticateToken, getUser);

router.put("/:id", authenticateToken, updateUser);

router.patch("/:id", authenticateToken, activeInactive);

router.delete("/:id", authenticateToken, deleteUser);

router.get("/:id/tasks", authenticateToken, getTasks);

// router
//   .route("/")
//   .get(getUsers)
//   .post(createUsers);

export default router;
