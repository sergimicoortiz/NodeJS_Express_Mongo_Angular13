const { expressjwt: jwt } = require("express-jwt");
const dotenv = require('dotenv').config();
//const secret = require('../config').secret;
const secret = process.env.SECRET || 'pepito';

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}//getTokenFromHeader

const auth = {
    required: jwt({
        secret: secret,
        algorithms: ["HS256"],
        userProperty: 'payload',
        getToken: getTokenFromHeader
    })/* ,
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    }) */
};

module.exports = auth;