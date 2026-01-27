const ApiError = require('../error/ApiError');
const {User, Card} = require('../models/model');

class CardController {
    async getCards(req, res, next) {
        const {id} = req.user

        if (!id) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить карточку, возможно пользователь не существует'))
        }

        try {
            const cards = await Card.findAll({where: {userId: id}})

            return res.json(cards)
        } catch (err) {
            return next(ApiError.badRequest('Не удалось получить карточку'))
        }
    }

    async addCard(req, res, next) {
        const {email, id} = req.user

        if (!req.body || !req.body.name) {
            return next(ApiError.badRequest('Одно или несколько полей пустые'))
        }


        const candidate = await User.findOne({where: {email}})

        if (!email || !candidate) {
            return next(ApiError.badRequest('Возникла ошибка: вы не можете добавить карточку, возможно пользователь не существует'))
        }

        try {
            const card = await Card.create({
                userId: candidate.id,
                name: req.body.name,
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
                        userId: id
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