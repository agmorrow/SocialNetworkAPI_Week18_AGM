const router = require("express").Router();
const {
	createThought,
	getThoughts,
	getThoughtsById,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../../controllers/thoughtController");

// /api/thoughts
router.route("/")
.post(createThought)
.get(getThoughts);

// /api/thoughts/:id
router
	.route("/:id")
	.get(getThoughtsById)
	.put(updateThought)
	.delete(deleteThought);

//	/api/thoughts/:id/reactions
router.route("/:id/reactions").post(createReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;