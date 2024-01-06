const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const jwt = require("../services/token");
const apiKey = require("../services/auth");

router.post('/school/create', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.schoolController.create);
router.get('/school/fetch', jwt.verifyTokenFn, apiKey.apiKeyAuth, controller.schoolController.getSchool);

module.exports = router;