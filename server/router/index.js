const router = require("express").Router();
const userRouter = require("./userRouter");
const cardsRouter = require("./cardsRouter");
const tasksRouter = require("./taskRouter");
const dashboardRouter = require("./dashboardRouter");

router.use("/user", userRouter);
router.use("/card", cardsRouter);
router.use("/task", tasksRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;