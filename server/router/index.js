const router = require("express").Router();
const userRouter = require("./userRouter");
const cardsRouter = require("./cardsRouter");
const tasksRouter = require("./taskRouter");

router.use("/user", userRouter);
router.use("/card", cardsRouter);
router.use("/task", tasksRouter);

module.exports = router;