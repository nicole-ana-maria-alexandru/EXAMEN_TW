const CrewMember = require("../models").CrewMember;

const controller = {
  getAll: async (req, res) => {
    try {
      const crew_members = await CrewMember.findAll();
      return res.status(200).json({crew_members});
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getCrewMember: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const crew_member = await CrewMember.findByPk(id);
      if (!crew_member) {
        return res.sendStatus(404);
      }
      return res.status(200).json(crew_member);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getCrewMemberByMovie: async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const offset = parseInt(req.params.offset);
      const crew_member = await CrewMember.findAndCountAll({
        where: {
          movieId: movieId,
        },
        limit: 1,
        offset,
      });
      if (!crew_member) {
        return res.sendStatus(404);
      }
      return res.status(200).json(crew_member);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  addCrewMember: async (req, res) => {
    try {
      const { nume, rol, movieId } = req.body;
      if (!nume || !rol) {
        return res.sendStatus(400);
      }
    
      const crew_member = await CrewMember.create({
        nume,
        rol,
        movieId
      });

      return res.status(201).json({ message: "CrewMember created!", crew_member });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  updateCrewMember: async (req, res) => {
    try {
      const { nume, rol, movieId } = req.body;
      const id = parseInt(req.params.id);
      let crew_member = await CrewMember.findByPk(id);
      if (!crew_member) {
        return res.sendStatus(404);
      }
      crew_member.nume = nume;
      crew_member.rol = rol;
      crew_member.movieId = movieId;
      await crew_member.save();

      return res
        .status(200)
        .json({ message: "Data updated succesfully!", crew_member });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteCrewMember: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const crew_member = await CrewMember.findByPk(id);
      if (!crew_member) {
        return res.sendStatus(404);
      }
      await crew_member.destroy();
      res.statusCode = 200;
      return res.json({ message: "CrewMember deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
