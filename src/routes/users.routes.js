import { Router } from "express";
import { getUsers, createUsers, getUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.get("/:id", getUser);

// router
//   .route("/")
//   .get(getUsers)
//   .post(createUsers);

export default router;
