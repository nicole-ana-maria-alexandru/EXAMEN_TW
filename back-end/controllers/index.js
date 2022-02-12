const crewMemberController = require("./crewMember");
const movieController = require("./movie");
const dbController = require("./db");

const controllers = {
  crewMember: crewMemberController,
  db: dbController,
  movie: movieController,
};

module.exports = controllers;
