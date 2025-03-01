import { Request, Response } from "express";
import Thought from "../../model/thought"; // Ensure Thought model is imported
import User from "../../model/user"; // Import User model for thought association

/**
 * GET all thoughts
 * @returns List of thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET a thought by ID
 * @param thoughtId (string) - ID of the thought
 * @returns a single Thought object
 */
export const getThoughtById = async (req: Request, res: Response): Promise<Response> => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).populate("reactions");
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Create a new thought
 * @param thoughtText (string) - The thought content
 * @param username (string) - Username who created the thought
 * @returns The created Thought object
 */
export const createThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { thoughtText, username } = req.body;
    if (!thoughtText || !username) {
      return res.status(400).json({ message: "Thought text and username are required!" });
    }

    const newThought = await Thought.create({ thoughtText, username });

    // Add the thought to the user’s list of thoughts
    await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    return res.status(201).json(newThought);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * PUT Update a thought by ID
 * @param thoughtId (string) - ID of the thought
 * @returns Updated Thought object
 */
export const updateThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID!" });
    }

    return res.json(thought);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE a thought by ID
 * @param thoughtId (string) - ID of the thought
 * @returns Success or failure message
 */
export const deleteThought = async (req: Request, res: Response): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID" });
    }

    // Remove the thought from the user’s thought list
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );

    return res.json({ message: "Thought successfully deleted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Add a reaction to a thought
 * @param thoughtId (string) - ID of the thought
 * @param reactionBody (string) - Reaction content
 * @param username (string) - Username of the reaction creator
 */
export const addReaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { reactionBody, username } = req.body;
    const { thoughtId } = req.params;

    if (!reactionBody || !username) {
      return res.status(400).json({ message: "Reaction body and username are required!" });
    }

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID!" });
    }

    return res.json(thought);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE Remove a reaction from a thought
 * @param thoughtId (string) - ID of the thought
 * @param reactionId (string) - ID of the reaction to remove
 */
export const removeReaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID!" });
    }

    return res.json({ message: "Reaction removed successfully!", thought });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
