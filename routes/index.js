var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Feedback Home', userId: 'null' });
});

/* GET redirect page */
router.get('/redirect', function(req, res, next) {
    res.render('redirect_handler', {
        title: 'Redirecting...'
    });
});

router.get('/results', function(req, res, next) {
    if (req.userRole !== 'ADMIN') {
        console.log("User was not admin");
        res.status(403);
        return;
    }
    res.render('results', {
        userId: req.userId,
        title: 'Admin Console'
    });
});

router.get(['/list', '/form'], function(req, res, next) {
    if (req.userRole !== 'STUDENT') {
        console.log("User was not student");
        res.status(403);
        return;
    }

    res.render('list', {
        userId: req.userId,
        title: 'Feedback form'
    });
});

router.get('/logout', function(req, res, next) {
    res.cookie('FEEDBACK_CSSPEC', "");
    res.render('index', { title: 'Feedback Home', userId: 'null' });
});

module.exports = router;
