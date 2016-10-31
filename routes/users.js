const request = require('request');
const jwt = require('jsonwebtoken');

function parseJWT(token) {
    const secret = process.env.CSSPEC_SECRET;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return false;
    }
}

// make server aware of the user
function userAware(req, res, next) {
    if (!req.cookies || !req.cookies['FEEDBACK_CSSPEC']) {
        next();
        return;
    }

    console.log("Checking the user...");

    let body = parseJWT(req.cookies['FEEDBACK_CSSPEC']);

    if (body) {
        req.userId = body.id;
        req.userName = body.name;
        req.userRole = body.role;
        req.accessToken = body.accessToken;
    }
    next();
}

module.exports = userAware;
