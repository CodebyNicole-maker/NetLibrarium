import { Request, Response } from 'express';
import { Thought, User } from '../model/index.js'; //user and thought for challenge

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find(); //user.find or thought.find for controllers
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const oneThought = await Thought.findById(thoughtId);
      if(oneThought) {
        res.json(oneThought);
      } else {
        res.status(404).json({
          message: 'Thought not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  /**
 * POST Thought /thoughts
 * @param object username
 * @returns a single Thought object
*/
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
      const newThought = await Thought.create({
        thoughtText,
        username
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  /**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string 
*/
export const deleteThought = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId});
      if(thought) {
          await User.findOneAndUpdate(
          { username: thought.username },
          { $pull: {thoughts: thought._id} },
          { runValidators: true, new: true }
        );
      }
      await Thought.deleteOne({ _id: req.params.thoughtId});
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } 
      res.status(201).json({message: 'Thought has been deleted'});
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
}