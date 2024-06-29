import { Router } from "express";
import { getUsers, createUsers, getUser, updateUser, activeInactive, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.patch("/:id", activeInactive);

router.delete("/:id", deleteUser);

// router
//   .route("/")
//   .get(getUsers)
//   .post(createUsers);

export default router;
