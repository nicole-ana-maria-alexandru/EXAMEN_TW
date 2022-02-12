const db = require("../config/db");

const controller = {
  reset: async (req, res) => {
    db
      .sync({ force: true })
      .then(() => {
        res.status(201).send({
          message: "Reset BD",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  },
};

module.exports = controller;
