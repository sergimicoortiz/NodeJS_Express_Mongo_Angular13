"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const connectdb = require("../config/config_db.js");
const users = require('./data_users.js');

async function main() {
    await connectdb(process.env.MONGO_URI);
    require("../models/user_module.js");
    const User = mongoose.model('User');
    await User.collection.drop();
    for (let u = 0; u < users.length; u++) {
        const user = new User;
        user.addUser(users[u].username, users[u].email, users[u].image, users[u].password);
        console.log(`User ${users[u].username} added`);
    }//for users
}

main();