const { expressjwt: jwt } = require("express-jwt");
const secret = require('../config').secret;

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
    }),
    optional: jwt({
        secret: secret,
        algorithms: ["HS256"],
        userProperty: 'payload',
        getToken: getTokenFromHeader,
        credentialsRequired: false
    })
};

module.exports = auth;