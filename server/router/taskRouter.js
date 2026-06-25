const router = require("express").Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authHandler");

router.post('/add', authMiddleware, taskController.addTask);
router.get("/:cardId/tasks", authMiddleware, taskController.getTasks)
router.delete("/deleteTask/:taskId", authMiddleware, taskController.deleteTask);
router.patch("/updateTask/:taskId", authMiddleware, taskController.updateTask);
router.patch("/changeOrderTasks", authMiddleware, taskController.changeOrderTask)
router.patch("/moveTask/:taskId", authMiddleware, taskController.moveTask);

module.exports = router;