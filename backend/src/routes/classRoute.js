const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const jwt = require("../services/token");
const apiKey = require("../services/auth");

router.post('/class/create', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.classController.create);
router.get('/class/fetch/:schoolId', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.classController.getClass);

module.exports = router;