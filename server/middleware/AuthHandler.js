const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const cookie = req.headers.cookie
        const token = cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        next()
    } catch (err) {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });

        res.status(401).json({message: 'Пользователь не авторизован или токен не валидный'});
    }
}