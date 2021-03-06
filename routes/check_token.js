const express = require('express');
const request = require('request');
const router = express.Router();
const config = require('../src/ui/js/config');
const jwt = require('jsonwebtoken');

// get the secret used to sign the tokens from environment variable
const secret = process.env.CSSPEC_SECRET;

console.log('Feedback ClientID: ' + process.env.FEEDBACK_CLIENT_ID);
console.log('Feedback ClientSecret: ' +  process.env.FEEDBACK_CLIENT_SECRET);

function createCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    return value + expires + "; path=/";
}

function issueJWToken(user, token) {
    return jwt.sign({
        id: user.userid,
        name: user.username,
        role: user.role,
        access_token: token
    }, secret, { expiresIn: '2 days'});
}

function getRedirectUrl(user) {
    switch (user.role) {
        case 'STUDENT':
            return '/list';
        case 'TEACHER':
            return '/result';
        case 'ADMIN':
            return '/results';
        default:
            return '/error';
    }
}

function handleCheckTokenRequest(req, res, next) {
    let options = {
        url: config.authApi.checkToken,
        headers: {
            'x-auth-token': 'client_id=' + process.env.FEEDBACK_CLIENT_ID
                            + '&client_secret=' + process.env.FEEDBACK_CLIENT_SECRET,
            'Authorization': 'Bearer ' + req.body.hash
        },
        json: true
    };

    request.post(options, (error, response, body) => {
        if (error || response.statusCode != 200) {
            console.log("Error " + error);
            res.status(403).send({ error: 'Bad request'});
            return;
        }
        console.log('Verified: ' + body.username);
        let url = getRedirectUrl(body);

        console.log('Redirecting to: ' + url);
        res.cookie('FEEDBACK_CSSPEC', issueJWToken(body, req.body.hash));
        res.send({
            'redirect_uri': url
        });
    });
}

router.post('/', handleCheckTokenRequest);

module.exports = router;
