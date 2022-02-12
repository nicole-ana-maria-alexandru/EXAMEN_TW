const db = require("../config/db");
const sequelize = require("sequelize");

const CrewMember = db.define(
  "crew_member",
  {
    nume: {
      type: sequelize.STRING,
      allownull: false,
      validate: {
        len: [5, 250],
      },
    },
    rol: {
      type: sequelize.ENUM('DIRECTOR','WRITER','CAMERAMAN'),
      allownull: false,
    },
  },
);

module.exports = CrewMember
