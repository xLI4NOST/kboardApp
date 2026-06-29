const ApiError = require('../error/ApiError');
const {User, Dashboard} = require('../models/model');

class DashBoardController {
    async addDashboard(req, res, next) {
        const {id, email} = req.user

        if (!id || !email) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить дашборд, возможно пользователь не существует'))
        }

        const candidate = await User.findOne({where: {email}})

        try {
            const dashboard = await Dashboard.create({
                userId: id,
                name: req.body.title,
            })

            return res.json({dashboard: dashboard});

        } catch (err){
            return next(ApiError.internal({message: err}));
        }
    }

    async getDashBoards(req, res, next) {
        const {id, email} = req.user

        if (!id || !email) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить дашборд, возможно пользователь не существует'))
        }

        try {
            const dashboards = await Dashboard.findAll({where: {userId: id}})

            return res.json(dashboards);

        } catch (err){
            return next(ApiError.internal({message: err}));
        }
    }
}

module.exports = new DashBoardController();