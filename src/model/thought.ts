// Import schema and model from mongoose
import { Schema, model, Document, Types } from "mongoose";
import React from "./reaction"; // Import the Reaction schema
// Define an interface for the Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<IReaction>;
}
// Define an interface for the Reaction subdocument
interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
}
// Construct a new instance of the schema class for reactions
const reactionSchema = new Schema<IReaction>(
  {
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
  }
);
console.log(reactionSchema)
// Construct a new instance of the schema class for thoughts
const thoughtSchema = new Schema<IThought>(
  {
    // Configure individual properties using Schema Types
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [React], // Array of nested Reaction documents
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Virtual property to get reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// Using model() to compile a model based on the schema 'thoughtSchema'
const Thought = model<IThought>("Thought", thoughtSchema);
// Create a new instance of the model, a document
Thought.create({
  thoughtText: "This is my first thought!",
  username: "lulovesu",
})
  .then((result) => console.log("Created new document", result))
  .catch((err) => console.log(err));
export default Thought;