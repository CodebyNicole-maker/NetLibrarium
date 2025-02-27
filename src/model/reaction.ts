// Import schema and model from mongoose
import { Schema, Types, Document } from "mongoose";
// Define an interface for the Reaction schema
interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
// Construct a new instance of the schema class
const React = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false, // Prevents Mongoose from creating an extra `_id` field for subdocuments
  }
);
export default React;