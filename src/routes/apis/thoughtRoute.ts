import { Router } from 'express';
const router = Router();
import { getThoughts, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';

// Route to get all thoughts and create a new thought
router.route('/').get(getThoughts).post(createThought);

// Route to update and delete a thought by its ID
router.route('/:thoughtId').put(updateThought).delete(deleteThought);

// Routes for reactions (nested under thoughts)
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;