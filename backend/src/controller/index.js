const studentController = require('./studentController');
const userController = require('./userController');
const schoolController = require('./schoolController');
const classController = require('./classController');

const controller = {
    studentController,
    userController,
    schoolController,
    classController
}

module.exports = controller