const taskModel = require("../models/taskModel");

// crear una tarea
const createTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = new taskModel({ ...req.body, userId });
    const data = await task.save();
    res.status(201).json({ message: "Tarea añadida correctamente", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { completed } = req.query;

    const filter = { userId };

    if (completed === "true") {
      filter.completed = true;
    } else if (completed === "false") {
      filter.completed = false;
    }

    const data = await taskModel.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const data = await taskModel.findOne({ _id: id, userId });
    if (!data) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// eliminar tarea por ID
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const data = await taskModel.deleteOne({ _id: id, userId });
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//eliminar todas las tareas
const deleteAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await taskModel.deleteMany({ userId });

    if (data.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron tareas para eliminar" });
    }

    res.json({ message: "Todas las tareas han sido eliminadas" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//actualizar una tarea por ID
const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, description, completed } = req.body;

    const data = await taskModel.updateOne(
      { _id: id, userId },
      { $set: { title, description, completed } }
    );
    if (data.nModified === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  deleteAllTasks,
};
