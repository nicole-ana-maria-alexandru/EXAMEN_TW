const CrewMember = require("./CrewMember");
const Movie = require("./Movie");

Movie.hasMany(CrewMember);
CrewMember.belongsTo(Movie);

module.exports = {
  CrewMember: CrewMember,
  Movie: Movie,
};
