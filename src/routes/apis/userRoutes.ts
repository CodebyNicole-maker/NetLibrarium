import { Request, Response } from "express";
import User from "../../model/user"; // Ensure User model is imported
import Thought from "../../model/thought"; // Import Thought model for cleanup
import mongoose from "mongoose";

/**
 * GET all users
 * @returns List of users and total user count
 */
export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find().populate("friends thoughts");
    const userCount = await User.countDocuments();
    return res.json({ users, userCount });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET a user by ID
 * @param userId (string) - ID of the user
 * @returns a single User object with stats
 */
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("friends thoughts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Create a new user
 * @param username (string) - User's name
 * @param email (string) - User's email
 * @returns The created user object
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "Username and Email are required!" });
    }
    const user = await User.create({ username, email });
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PUT Update a user by ID
 * @param userId (string) - ID of the user
 * @returns Updated User object
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE a user by ID
 * @param userId (string) - ID of the user
 * @returns Success or failure message
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "No such user exists" });
    }

    // Remove associated thoughts
    await Thought.deleteMany({ username: user.username });

    // Remove user from other users' friend lists
    await User.updateMany(
      { friends: userId },
      { $pull: { friends: userId } }
    );

    return res.json({ message: "User successfully deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST Add a friend to a user
 * @param userId (string) - ID of the user
 * @param friendId (string) - ID of the friend
 */
export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    if (user.friends.includes(new mongoose.Types.ObjectId(friendId))) {
      return res.status(400).json({ message: "Friend already added" });
    }

    user.friends.push(new mongoose.Types.ObjectId(friendId));
    await user.save();
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE Remove a friend from a user's friend list
 * @param userId (string) - ID of the user
 * @param friendId (string) - ID of the friend to remove
 */
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Friend removed successfully", user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
