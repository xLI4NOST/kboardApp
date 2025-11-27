const ApiError = require('../error/ApiError');
const bcrypt = require("@node-rs/bcrypt");
const {User} = require('../models/model');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

class UserController {


    async registration(req, res, next) {
        const {email, password, role} = req.body;
        const candidate = await User.findOne({where: {email}})

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        if (candidate) {
            return next(ApiError.badRequest('Такой пользователь уже существует'))
        }

        const hashedPassword = await bcrypt.hash(String(password), 4);
        const user = await User.create({email, password: hashedPassword, role})
        const token = generateJwt(user.id, email, role)
        return res.json({token: token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'))
        }

        let comparePassword = await bcrypt.compare(String(password), String(user.password))

        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, email, comparePassword)
        return res.json({token: token});
    }

    async checkAuth(req, res, next) {
       const token = generateJwt(req.user.id, req.user.email, req.user.role);
       return res.json({token: token});
    }
}

module.exports = new UserController()