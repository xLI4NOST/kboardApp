const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authHandler");

router.post("/registration", userController.registration);
router.post("/login", userController.login)
router.get("/auth", authMiddleware,  userController.checkAuth)

module.exports = router