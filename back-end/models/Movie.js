const db = require("../config/db");
const sequelize = require("sequelize");
const CrewMember = require("./CrewMember");

const Movie = db.define("movie", {
  titlu: {
    type: sequelize.STRING,
    allownull: false,
    validate: {
      len: [3, 250]
    }
  },
  categorie: {
    type: sequelize.ENUM('COMEDY','DRAMA','HORROR'),
    allownull: false,
  },
  data_publicarii: {
    type: sequelize.DATEONLY,
    allownull: false,
  },
});

Movie.hasMany(CrewMember);
CrewMember.belongsTo(Movie);

module.exports = Movie;
