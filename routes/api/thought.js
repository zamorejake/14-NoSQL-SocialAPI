const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

//all call /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//all thought id calls  /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//create reaction /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

//del reaction /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;