const ApiError = require('../error/ApiError');
const {Task, Card} = require("../models/model");
const {where} = require("sequelize");

class TaskController {
    async getTasks(req, res, next) {
        const {id} = req.user
        const {cardId} = req.params

        try {
            const selectedCard = await Card.findOne({
                where:
                    {
                        userId: id,
                        id: cardId
                    }
            })

            if (!selectedCard) return next(ApiError.badRequest('Ошибка, возможно такой карточки не существует'))

            const tasksList = await Task.findAll({
                where: {
                    cardId: cardId
                }
            })

            return res.json(tasksList)
        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }

    async addTask(req, res, next) {
        if (!req.body) return next(ApiError.badRequest('Обязательные поля должны быть заполнены!'))
        const {id} = req.user

        if (!req.body.title || !req.body.priority || !req.body.cardId) {
            return next(ApiError.badRequest('Добавляемая сущность не прошла валидацию'))
        }

        try {
            const card = await Card.findOne({
                where: {
                    id: req.body.cardId,
                    userId: id
                }
            })

            if (!card) return next(ApiError.forbidden('Вы не можете добавить задачу в чужую карточку'))

            const lastTask = await Task.findOne({
                where: {
                    cardId: req.body.cardId,
                },
                order: [['order', 'DESC']]
            })
            const order = lastTask ? lastTask.order + 1 : 1

            const newTask = await Task.create({
                cardId: req.body.cardId,
                priority: req.body.priority,
                title: req.body.title,
                subtitle: req.body.description,
                order: order
            })

            return res.json({message: 'Задача успешно добавлена'});
        } catch (err) {
            return next(ApiError.internal({message: err}));
        }


    }

    async deleteTask(req, res, next) {
        const {taskId} = req.params
        const {id} = req.user

        try {
            const task = await Task.findOne({
                where: {
                    id: taskId
                },
                include: {
                    model: Card,
                    where: {userId: id}
                }
            })
            if (!task) return next(ApiError.badRequest('Возможно у вас нет прав для удаления данной задачи'))

            task.destroy()
            return res.json({message: "Задача успешно удалена"})

        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }

    async updateTask(req, res, next) {
        if (!req.body) return next(ApiError.badRequest('Нет новых данных для обновления'))

        const {taskId} = req.params
        const {id} = req.user
        const {title, subtitle, priority} = req.body
        try {
            const task = await Task.findOne({
                where: {id: taskId},
                include: {
                    model: Card,
                    where: {userId: id}
                }
            })
            if (!task) return next(ApiError.badRequest('Задача не найдена'))

            task.title = title || task.title
            task.subtitle = subtitle || task.subtitle
            task.priority = priority || task.priority

            task.save()


            return res.json({message: 'Задача обновлена успешно'})
        } catch (err) {
            return next(ApiError.internal({message: err}));
        }


    }

    async moveTask(req, res, next) {
        const {id} = req.user
        const {taskId} = req.params
        const {cardId} = req.body

        try {
            const task = await Task.findOne({
                where: {
                    id: taskId
                },
            })
            const overCard = await Card.findOne({
                where: {
                    id: cardId,
                    userId: id
                }
            })

            if (!task || !overCard) return next(ApiError.badRequest('Ошибка, возможно задача или карточка не существуют'))

            task.cardId = cardId
            task.save()
            return res.json({message: 'Изменения сохранены'})

        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }

    async changeOrderTask(req, res, next) {

        const tasks = req.body


        try {
            for (let task of tasks) {
                await Task.update({
                        order: task.order,
                    },
                    {
                        where: {
                            id: task.id
                        }
                    }
                )
            }

            return res.json({message: 'Порядок обновлен'})
        } catch (err) {
            return next(ApiError.internal({message: err}));
        }
    }

}

module.exports = new TaskController();