const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../../controllers/thoughtController');

// GET all and POST at /api/thoughts

router
  .route('/')
  .get(getAllThoughts)
  .post(addThought); // moved from router below /:userId

// /api/thoughts/<userId>
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:thoughtId/reactions')
  .post(addReaction)  

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;