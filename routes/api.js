const express = require('express');
const router = express.Router();
const request = require('request');

const baseAcademicApi = 'http://139.59.32.247:5000/academic';

router.get('/courses_opted', (req, res, next) => {
    if (req.userRole !== 'STUDENT') {
        res.status(401).send({error: 'Invalid request', reason: 'userId does not correspond to a student'});
        return;
    }
    request({
        url: baseAcademicApi + '/courses?isDetailed=true&token=' + req.accessToken + '&studentId=' + req.userId,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            res.send(list);
        } else {
            res.status(500).send({ error: 'Unable to fetch list of courses for user: ' + req.userId});
        }
    });
});

router.get('/courses', (req, res, next) => {
    const url = baseAcademicApi + '/courses?token=' + req.accessToken;

    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        console.log('Academic returned: ' + response.statusCode);
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            res.send(list);
        } else {
            res.status(401).send({error: 'Bad request'});
        }
    });
});

router.get('/courses/:courseId', (req, res, next) => {
    const url =  baseAcademicApi + '/courses?token=' + req.accessToken
                    + (req.params.courseId ? ('&courseId=' + req.params.courseId) : '');
    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        console.log('Academic returned: ' + response.statusCode);
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            const course = list.find(course => course.courseId == req.params.courseId);
            if (!course) {
                res.status(404).send({error: 'courseId not found'});
            } else {
                res.send(course);
            }
        } else {
            res.status(401).send({error: 'Bad request'});
        }
    });
});

module.exports = router;
