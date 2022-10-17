const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.local.user = null;
        next();
    }
}

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log('No token')
    }
}

exports.getName = (req, res, next) => {
    const searchName = req.UserModel.pseudo;

    if (searchName) {
        localStorage.setItem('userPseudo', JSON.stringify(searchName));
    } else {
        console.log('Pas de pseudo trouvé');
    }

    res.status(200).json(searchName);
}