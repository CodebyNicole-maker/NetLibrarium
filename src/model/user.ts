// Import schema and model from mongoose
import { Schema, model, Document, Types} from 'mongoose';
// import Thought from '../model/thought';
// Define an interface for the Book document
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
  }
// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
  // Configure individual properties using Schema Types
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  thoughts: [
    {
      type: Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);
// Using model() to compile a model based on the schema 'bookSchema'
const User = model<IUser>("User", userSchema);
// Create a new instance of the model, a document
User.create({
    username: "lulovesu",
    email: "lillian@gmail.com",
    thoughts: [],
    friends: [],
  })
    .then((result) => console.log("Created new document", result))
    .catch((err) => console.log(err));
  export default User;