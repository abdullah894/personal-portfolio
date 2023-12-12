const express = require("express");
const router = express.Router();
const controller = require('../controller/controller');
router.get("/",controller.mainPage);
router.post("/submit-form",controller.userequest);







module.exports = router;
