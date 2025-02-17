const express = require("express");
const router = express.Router();
const userController = require("./src/controllers/usersController");
const taskController = require("./src/controllers/tasksController");
const authenticate = require("./src/controllers/authentication");
const auth = require("./src/middlewares/login");
const subTasksController = require("./src/controllers/subTasksController");

// rotas de usuarios
router.post("/user", userController.store);
router.get("/user", auth, userController.index);
router.put("/user/:id", auth, userController.update);
router.delete("/user/:id", auth, userController.delete);

// rotas de tarefas
router.post("/task", auth, taskController.store);
router.get("/task", auth, taskController.index);
router.put("/task/:id", auth, taskController.update);
router.get("/taskid/:id", auth, taskController.taskById);
router.delete("/task/:id", auth, taskController.delete);
router.get("/task/:id", auth, taskController.tasksUser);

// rotas de subtarefas
router.post("/subtask", auth, subTasksController.store);
router.get("/subtask/:id", auth, subTasksController.subTaskByTask);
router.put("/subtask/:id", auth, subTasksController.update);
router.delete("/subtask/:id", auth, subTasksController.delete);

//rotas de autenticação
router.post("/login", authenticate.login);

module.exports = router;
