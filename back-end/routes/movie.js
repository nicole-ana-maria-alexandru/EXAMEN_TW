const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movie;

router.get("/", movieController.getAll);
router.get("/:id", movieController.getMovie);
router.post("/", movieController.addMovie);
router.patch("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
