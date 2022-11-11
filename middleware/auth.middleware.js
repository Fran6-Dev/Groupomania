require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');


// Verification de l'user à l'aide du jwt
exports.checkUser = (req, res, next) => {
    console.log('cookie2', req.cookies.jwt)
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

// Permet de savoir si l'utilisateur est connecter grâce a son token
exports.requireAuth = (req, res, next) => {
    console.log('cookie33', req.cookies.jwt)
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
