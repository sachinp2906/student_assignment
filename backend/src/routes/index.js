const express = require("express");
const router = express.Router();

router.use(require('./studentRoute'));
router.use(require('./userRoute'));
router.use(require('./schoolRoute'));
router.use(require('./classRoute'));

module.exports = router;