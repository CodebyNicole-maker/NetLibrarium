import Thought from '../model/thought.js'
import User from '../model/user.js'
import { Request, Response } from 'express';

//get thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

//create a thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but no user with that ID'
            });
        }

        res.json('Thought created successfully!');
        return;
    } catch (err) {
        console.error;
        res.status(500).json(err);
    }

    return;
}

//update a thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'Could not update thought' })
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

//delete thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought found with that ID!" });
            return;
        } else {
            res.json({ message: "Thought deleted!", deleteThought: thought })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// Create a new reaction for a specific thought
export const createReaction = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought found with that ID!" });
            return;
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

// Delete a reaction from a thought
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought found with that ID!" });
            return;
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export default { getThoughts, createThought, updateThought, deleteThought, createReaction, deleteReaction };
//     return;