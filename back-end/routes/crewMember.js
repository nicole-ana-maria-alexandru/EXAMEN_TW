const express = require("express");
const router = express.Router();
const crewMemberController = require("../controllers").crewMember;

router.get("/", crewMemberController.getAll);
router.get("/byMovie/:movieId/:offset/", crewMemberController.getCrewMemberByMovie);
router.get("/:id/", crewMemberController.getCrewMember);
router.post("/", crewMemberController.addCrewMember);
router.patch("/:id/", crewMemberController.updateCrewMember);
router.delete("/:id/", crewMemberController.deleteCrewMember);

module.exports = router;
