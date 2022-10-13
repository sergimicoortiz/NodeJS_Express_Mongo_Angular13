const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;


async function get_user(req, res) {
    try {
        const id = req.auth.id;
        if (id) {
            const user = await User.findOne({ id: id });
            if (user) {
                res.json(user.toAuthJSON());
            }
        } else {
            res.status(404).json(FormatError("An error has ocurred", res.statusCode));
        }
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//get_user

async function create_user(req, res) {
    try {
        if (!req.body.username) {
            return res.status(422).json(FormatError('Must pass a username'));
        }
        if (!req.body.password) {
            return res.status(422).json(FormatError('Must pass a password'));
        }
        if (!req.body.email) {
            return res.status(422).json(FormatError('Must pass a email'));
        }
        /* if (!req.body.image) {
            return res.status(422).json(FormatError('Must pass a image'));
        } */

        const user_exist = await User.findOne({ username: req.body.username });
        if (user_exist === null) {
            const user = new User();
            user.addUser(req.body.username, req.body.email, req.body.image, req.body.password);
            res.json(FormatSuccess('User created'));
        } else {
            res.status(200).json(FormatError("User already exist", res.statusCode));
        }
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//create_user


//PREGUNTAR NEXT
async function login(req, res, next) {
    if (!req.body.username) {
        return res.status(422).json(FormatError('Must pass a username'));
    }

    if (!req.body.password) {
        return res.status(422).json(FormatError('Must pass a password'));
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { return next(err); }
        if (user) {
            return res.json(user.toAuthJSON());
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}//login

const user_controller = {
    create_user: create_user,
    get_user: get_user,
    login: login
}

module.exports = user_controller;