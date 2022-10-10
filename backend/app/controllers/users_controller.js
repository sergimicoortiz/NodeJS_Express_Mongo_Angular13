const mongoose = require('mongoose');
const User = mongoose.model('User');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;


async function get_user(req, res) {
    try {
        const show_user = await User.findOne({ "a": req.body.username });
        res.json(show_user);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}

async function create_user(req, res) {
    try {
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


async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        const test = user.validPassword(req.body.password, user.salt, user.hash);
        console.log(test);
        //res.json(user);
        res.send('a');
    } catch (error) {
        console.error(error);
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}//login

const user_controller = {
    create_user: create_user,
    get_user: get_user,
    login: login
}

module.exports = user_controller;