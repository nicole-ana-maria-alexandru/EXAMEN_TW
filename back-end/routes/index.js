const express = require("express");
const router = express.Router();
const crewMemberRouter = require("./CrewMember");
const dbRouter = require("./db");
const movieRouter = require("./movie");

router.use("/crewMember", crewMemberRouter);
router.use("/movie", movieRouter);
router.use("/", dbRouter);

module.exports = router;
