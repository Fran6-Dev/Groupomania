const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

exports.signUp = async (req, res, next) => {
    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
        return;
    }
}

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ user: user._id });
        return;
    }
    catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors });
        return;
    }
}

exports.logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

// create a user with admin role  (admin can delete all posts from a user)
exports.createAdmin = async (req, res) => {
    const newUser = new UserModel({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
        role: "admin",
        posts: []
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}