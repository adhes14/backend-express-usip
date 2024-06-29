import { Task } from "../models/tasks.js";

export async function getTasks(req, res) {
  res.send("Getting Tasks");
}

export async function createTasks(req, res) {
  res.send("Creating Tasks");
}