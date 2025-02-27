import { Schema, model, Document } from 'mongoose';
// Define an interface for the Friend document
interface IFriend extends Document {
  userID: string; // The ID of the user who owns this friend connection
  friendID: string; // The ID of the friend
  createdAt: Date;
}
// Construct a new instance of the schema class
const friendSchema = new Schema<IFriend>({
  userID: { type: String, required: true },
  friendID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// Compile a model based on the schema
const Friend = model('Friend', friendSchema);
// Create a new instance of the model, a document
Friend.create({
  userID: '12345',
  friendID: '67890',
})
  .then(result => console.log('Created new friend document', result))
  .catch(err => console.log(err));
export default Friend;