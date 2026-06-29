const router = require('express').Router();
const dashBoardController = require('../controllers/dashBoardController');
const authMiddleware = require('../middleware/AuthHandler');

router.get('/dashboards', authMiddleware, dashBoardController.getDashBoards)
router.post('/createDashBoard', authMiddleware, dashBoardController.addDashboard)
router.delete('/deleteDashBoard/:id', authMiddleware, (req, res) => {})

module.exports = router;