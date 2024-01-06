const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const jwt = require("../services/token");
const apiKey = require("../services/auth");

router.post('/student/create', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.studentController.create);
router.get('/student/allStudent' , jwt.verifyTokenFn , apiKey.apiKeyAuth , controller.studentController.getAllStudent);
router.post('/student/assignClass', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.studentController.assignClassToStudent);
router.get('/student/studentInEveryClass', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.studentController.studentInEveryClass);
router.get('/student/classMates/:studentId', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.studentController.classMates);

module.exports = router;