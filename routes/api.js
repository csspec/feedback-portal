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
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            res.send(list);
        } else {
            console.log("Academic returned " + error);
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
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            const course = list.find(course => course.courseId == req.params.courseId);
            if (!course) {
                res.status(404).send({error: 'courseId not found'});
            } else {
                res.send(course);
            }
        } else {
            console.log("Academic returned " + error);
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
        if (!error && response.statusCode == 200) {
            const list = body.data.items;
            res.send(list);
        } else {
            res.status(400).send({error: 'Bad request'});
        }
    });
});

function get(url, req, callback, errorCallback) {
    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            errorCallback(error, response);
        }
    });
}

function getStudent(sid, req, callback, errorCallback) {
    const url = config.identityApi.studentLink + '/' + sid;
    get(url, req, callback, errorCallback);
}

function getTeacher(tid, req, callback, errorCallback) {
    get(config.identityApi.userLink + '/' + tid, req, callback, errorCallback);
}

function sendList(list, getter, req, res, callback) {
    let counter = 0;
    let error = false;
    let ignore = false;
    let result = [];

    if (list.length === 0) {
        res.status(200).send([]);
        return;     
    }
    list.forEach(id => {
        counter++;
        console.log(list);
        getter(id, req, user => {
            result.push(user);

            if (user.common)
                console.log(user.common.userName);
            counter--;

            if (ignore) {
                return;
            }

            if (error) {
                console.log("error");
                callback(error);
                ignore = true;
            }

            if (counter === 0) {
                res.send(result);
            }
        }, (err, response) => {
            console.log("error", err, response);
            error = true;
        });
    });
}

function getStatus(sid, req, callback, error) {
    get(config.feedbackApi.statusLink + '/' + req.params.courseId + '/' + sid, req, callback, error);
}

function getStatusForStudents(list, req, res, callback, errorCallback) {
    let counter = 0;
    let error = false;
    let ignore = false;
    let result = [];

    if (list.length === 0) {
        res.status(200).send([]);
        return;     
    }

    list.forEach(id => {
        counter++;
        console.log(list);
        getStatus(id, req, status => {
            counter--;

            if (!status.status)
                result.push(id);
            if (ignore) {
                return;
            }

            if (error) {
                console.log("error");
                errorCallback(error);
                ignore = true;
            }

            if (counter === 0) {
                callback(result);
            }
        }, (err, response) => {
            console.log("error", err, response);
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
        if (!error && response.statusCode == 200) {
            const list = body.data.studentIds;

            getStatusForStudents(list, req, res, newlist =>
                sendList(newlist, getStudent, req, res, error => {
                    if (error)
                        res.status(424).send({ error: 'Failed dependency' });
                }), error => {
                    if (error)
                        res.status(424).send({ error: 'Failed dependency' });
                });
        } else {
            res.status(400).send({error: 'Bad request'});
        }
    });
});

router.get('/course/:courseId/teachers', (req, res, next) => {
    const url = config.academicApi + '/teachers?token=' + req.accessToken
                + '&courseId=' + req.params.courseId;

    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const list = body.data.teacherIds;
            sendList(list, getTeacher, req, res, error => {
                if (error)
                    res.status(424).send({ error: 'Failed dependency' });
            });
        } else {
            res.status(400).send({error: 'Bad request'});
        }
    });
});

function getCourses(tid, req, callback, error_callback) {
    const url = config.academicApi + '/courses?token=' + req.accessToken
                + '&teacherId=' + req.params.teacherId;

    request({
        url: url,
        headers: {
            'Authorization': 'Bearer ' + req.accessToken
        },
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            error_callback(error, response);
        }
    });    
}

router.get('/teachers/:teacherId/courses', (req, res, next) => {
    getCourses(req.params.teacherId, req, body => {
        const list = body.data.items;
        res.send(list);
    }, (error, response) => {
        res.status(400).send({error: 'Bad request'});
    });
});

module.exports = router;
