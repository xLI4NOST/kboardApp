const router = require("express").Router();
const cardController = require("../controllers/cardsController");
// const taskController = require("../controllers/taskController");
const authMiddleWare = require("../middleware/AuthHandler");

router.get("/cards", authMiddleWare, cardController.getCards);
router.post("/addCard", authMiddleWare, cardController.addCard);
router.delete("/deleteCard/:id", authMiddleWare, cardController.deleteCard);



module.exports = router;