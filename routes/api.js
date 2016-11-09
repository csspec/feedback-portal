const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../src/ui/js/config');

router.get('/courses_opted', (req, res, next) => {
    if (req.userRole !== 'STUDENT') {
        res.status(400).send({error: 'Invalid request', reason: 'userId does not correspond to a student'});
        return;
    }
    request({
        url: config.academicApi + '/courses?isDetailed=true&token=' + req.accessToken + '&studentId=' + req.userId,
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
    const url = config.academicApi + '/courses?token=' + req.accessToken;

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
            res.status(400).send({error: 'Bad request'});
        }
    });
});

router.get('/courses/:courseId', (req, res, next) => {
    const url =  config.academicApi + '/courses?token=' + req.accessToken
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
            res.status(400).send({error: 'Bad request'});
        }
    });
});

router.get('/department/:departmentId/courses', (req, res, next) => {
    const url = config.academicApi + '/courses?token=' + req.accessToken
                + '&offeredBy=' + (req.params.departmentId);

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
            res.status(400).send({error: 'Bad request'});
        }
    });
});

function getStudent(sid, req, callback, errorCallback) {
    const url = config.identityApi.studentLink + '/' + sid;
    console.log(sid);
    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true,
    }, (error, response, body) => {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            errorCallback(error);
        }
    });
}

function sendList(list, req, res, callback) {
    let counter = 0;
    let error = false;
    let ignore = false;
    let result = [];

    list.forEach(studentId => {
        counter++;
        if (studentId == '1') {
            counter--;
            return;
        }
        getStudent(studentId, req, student => {
            result.push(student);
            console.log(student.userName);
            counter--;

            if (ignore) {
                return;
            }

            if (error) {
                callback(error);
                ignore = true;
            }

            if (counter === 0) {
                res.send(result);
            }
        }, () => {
            error = true;
        });
    });
}

router.get('/course/:courseId/students', (req, res, next) => {
    const url = config.academicApi + '/students?token=' + req.accessToken
                + '&courseId=' + req.params.courseId;

    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        console.log('Academic returned: ' + response.statusCode);
        if (!error && response.statusCode == 200) {
            const list = body.data.studentIds;
            sendList(list, req, res, error => {
                if (error)
                    res.status(424).send({ error: 'Failed dependency' });
            });
        } else {
            res.status(400).send({error: 'Bad request'});
        }
    });
});

module.exports = router;
