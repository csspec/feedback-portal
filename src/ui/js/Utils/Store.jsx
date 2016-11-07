import {makeAjaxRequest} from '../Ajax';
import config from '../config';
import './third_party/json2';
import './third_party/jStorage';

class JStorageWrapper {
    constructor(storage) {
        this._storage = storage;
    }

    getItem(key) {
        return this._storage.get(key)
    }

    deleteItem(key) {
        return this._storage.deleteKey(key);
    }

    setItem(key, value) {
        this._storage.set(key, value);
    }

    setTTL(key, timeout) {
        this._storage.setTTL(key, timeout);
    }

    clearTTL(key) {
        this.setTTL(key, 0);
    }

    keys() {
        return this._storage.index();
    }

    listenKeyChange(key, callback) {
        this._storage.listenKeyChange(key, callback);
    }

    stopListeningKey(key) {
        this._storage.stopListening(key);
    }

    log(key) {
        this.listenKeyChange(key, (k, action) => {
            console.log(k + ": " + action);
        })
    }
}

class CacheStore {
    constructor(store) {
        this._fbstore = store;
    }

    getFeedbackTemplate(callback, errorCallback) {
        let template = this._fbstore.getItem(config.feedbackApi.templateLink);
        if (template === null) {
            makeAjaxRequest({
                url: config.feedbackApi.templateLink,
                success: template => {
                    this._fbstore.setItem(config.feedbackApi.templateLink,
                                JSON.stringify(template.questionList));
                    callback(template.questionList);
                },
                error: errorCallback
            });
        } else {
            callback(JSON.parse(template));
        }
    }

    getTeachersList(callback, errorCallback) {
        let teachersList = this._fbstore.getItem(config.identityApi.teachers);
        if (teachersList === null) {
            makeAjaxRequest({
                url: config.identityApi.teachers,
                success: list => {
                    this._fbstore.setItem(config.identityApi.teachers, JSON.stringify(list));

                    // expires after 3 minutes
                    this._fbstore.setTTL(config.identityApi.teachers, 1000 * 60 * 3);
                    this._fbstore.log(config.identityApi.teachers);
                    callback(list);
                },
                error: errorCallback
            })
        } else {
            callback(JSON.parse(teachersList));
        }
    }

    getObject(url, callback, error) {
        setTimeout(() => {
            let object = this._fbstore.getItem(url);

            if (object) {
                callback(JSON.parse(object));
                return;
            }

            makeAjaxRequest({
                url: url,
                success: object => {
                    this._fbstore.setItem(url, JSON.stringify(object));
                    this._fbstore.setTTL(url, 1000 * 3 * 60);
                    this._fbstore.log(url);
                    callback(object);
                },
                error: error
            });
        });
    }

    getObjectNoCaching(url, callback, error) {
        makeAjaxRequest({
            url: url,
            success: object => {
                callback(object);
            },
            error: error
        });
    }

    getCourse(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getTeacher(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getUser(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getCoursesFeedback(url, callback, error) {
        this.getObject(url, callback, error);
    }

    getCoursesFeedbackForTeacher(teacherId, callback, error) {
        this.getObject(config.feedbackApi.resultsApi + "/teachers/" + teacherId, callback, error);
    }

    getCourseByCourseId(courseId, callback, error) {
        this.getCourse('/api/courses/' + courseId, callback, error);
    }

    getTeacherByTeacherId(teacherId, callback, error) {
        this.getTeacher(config.identityApi.teachers + '/' + teacherId, callback, error);
    }

    getCoursesFeedbackForCourse(courseId, callback, error) {
        this.getObject(config.feedbackApi.resultsApi + '/courses/' + courseId, callback, error);
    }

    getAllCourses(callback, error) {
        this.getObject('/api/courses', callback, error);
    }


    getCoursesOptedByStudent(studentId, callback, error) {
        makeAjaxRequest({
            url: '/api/courses_opted',
            success: callback,
            error: error
        });
    }

    getCoursesByDepartmentId(departmentId, callback, error) {
        this.getObject('/api/department/' + departmentId + '/courses', callback, error);
    }

    getStudentsByCourseId(courseId, callback, error) {
        this.getObjectNoCaching('/api/course/' + courseId + '/students', callback, error);
    }
}

export default function injectStore() {
    if (window._injected) {
        console.warn("Store was injected twice");
        return;
    }

    window.fbApi = new CacheStore(new JStorageWrapper(window.$.jStorage));
    window._injected = true;
}
