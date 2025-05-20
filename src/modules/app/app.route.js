const express = require("express");
const router = express.Router();
const { status, toggleStatus } = require("./app.controller");

router.get("/status", status);
router.post("/toggle", toggleStatus);

module.exports = router;
