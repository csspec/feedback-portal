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

    let body = parseJWT(req.cookies['FEEDBACK_CSSPEC']);

    if (body) {
        console.log("[\u2713] Verified user...");
        req.userId = body.id;
        req.userName = body.name;
        req.userRole = body.role;
        req.accessToken = body.access_token;
    } else {
        console.log('[\u274C] User is not verified...');
    }
    next();
}

module.exports = userAware;
