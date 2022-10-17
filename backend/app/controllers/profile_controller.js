const mongoose = require('mongoose');
const User = mongoose.model('User');
const FormatError = require('../utils/responseApi.js').FormatError;
const FormatSuccess = require('../utils/responseApi.js').FormatSuccess;

async function param_username(req, res, next, username) {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json(FormatError("No profile found", res.statusCode));
        }//if
        req.profile = user.toProfileJSON(user);
        return next();
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//try catch
}//param :username

async function get_profile(req, res) {
    res.json(req.profile);
}//get_profile

async function follow(req, res) {
    try {
        const user = await User.findOne({ id: req.auth.id });
        if (!user) {
            return res.status(404).json(FormatError("No profile found", res.statusCode));
        }
        const userToFollow = await User.findOne({ username: req.profile.username });
        user.follow(userToFollow._id);
        res.json(FormatSuccess("User followed"));
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//try catch
}

async function unfollow(req, res) {

}

const profile_controller = {
    get_profile: get_profile,
    param_username: param_username,
    follow: follow,
    unfollow: unfollow
}

module.exports = profile_controller;
