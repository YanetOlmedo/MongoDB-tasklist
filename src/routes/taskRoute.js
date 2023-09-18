const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  deleteAllTasks,
} = require("../controllers/taskController");

// rutas con funciones controladoras
router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.delete("/tasks", deleteAllTasks);
router.get("/tasks/:id", getTaskById);
router.delete("/tasks/:id", deleteTaskById);
router.put("/tasks/:id", updateTaskById);

module.exports = router;
