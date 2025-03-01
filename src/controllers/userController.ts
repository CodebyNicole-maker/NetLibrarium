
import { Request, Response } from 'express';
import User from '../model/user';


/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /api/user/:userId
 * @param string id
 * @returns a single Course object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const oneUser = await User.findById(userId);
      if(oneUser) {
        res.json(oneUser);
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

/**
 * POST User /users
 * @param object user
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    const { email, username } = req.body;
    try {
        const newUser = await User.create({
            email,
            username
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({
          message: error.message
        });
      }
    };

/**
 * PUT User based on id /user/:id
 * @param object id, username
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});
      
      if(!user) {
        res.status(404).json({
          message: 'No user with that ID'
        });
      } else {
        await User.findOneAndUpdate(
          { thoughts: req.params.userId },
          { $pull: { user: req.params.userId } },
          { new: true }
        );
        res.json({ message: 'User deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
