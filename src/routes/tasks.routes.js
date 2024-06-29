import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Getting Tasks");
});

router.post("/", (req, res) => {
  res.send("Creating Task");
});

export default router;
