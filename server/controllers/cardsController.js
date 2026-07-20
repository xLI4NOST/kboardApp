const ApiError = require('../error/ApiError');
const {User, Card, Dashboard} = require('../models/model');

class CardController {
    async getCards(req, res, next) {

        const {id} = req.user
        const {dashboardId} = req.params

        if (!id) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить карточку, возможно пользователь не существует'))
        }


        try {
            const dashboard = await Dashboard.findOne({where: {slug: dashboardId}})

            const cards = await Card.findAll({
                where: {
                    dashboardId: dashboard.id
                }
            })



            return res.json(cards)
        } catch (err) {
            return next(ApiError.badRequest('Не удалось получить карточку'))
        }
    }

    async addCard(req, res, next) {
        const {email, id} = req.user
        const {title, dashboardId} = req.body

        const dashboard = await Dashboard.findOne({
            where: {
                slug: dashboardId
            },
        })
        console.log(dashboard)

        if (!dashboard) {
            return next(ApiError.badRequest('Ошибка, такой дашборд не существует'))
        }

        if (!req.body || !req.body.title) {
            return next(ApiError.badRequest('Одно или несколько полей пустые'))
        }


        const candidate = await User.findOne({where: {email}})

        if (!email || !candidate) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить карточку, возможно пользователь не существует'))
        }

        try {
            const card = await Card.create({
                dashboardId: dashboard.id,
                name: title,
            })

            return res.json({card: card});
        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }

    async deleteCard(req, res, next) {
        if (!req.params.id) return next(ApiError.badRequest('Карточка не указана'))

        const {id} = req.user
        const deleteId = req.params.id

        if (!id || !deleteId) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете удалить карточку, возможно пользователь или карточка не существует'))
        }

        try {
            const deleted = await Card.destroy({
                where:
                    {
                        id: deleteId,
                    },
                include: {
                    model:Dashboard,
                    where:{
                        userId: id
                    }
                }
            })
            if (!deleted) {
                return next(ApiError.badRequest('Возникла ошибка: вы не можете удалить карточку, такой карточки не существует'))
            }

            return res.json({message: 'Удалено успешно'})

        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }


}

module.exports = new CardController();