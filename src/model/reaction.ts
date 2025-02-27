// Import schema and model from mongoose
import { Schema, model, Document } from 'mongoose';
// Define an interface for the Book document
interface IReact extends Document {
  reactionID: string;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
// Construct a new instance of the schema class
const reactSchema = new Schema<IReact>({
  // Configure individual properties using Schema Types
  reactionID: { type: String, required: true },
  reactionBody: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
  username: String,
  // Use built in date method to get current date
  createdAt: { type: Date, default: Date.now },
});
// Using model() to compile a model based on the schema 'bookSchema'
const React = model('React', reactSchema);
// Create a new instance of the model, a document
React
  .create({
    reactionID: '1',
    reactionBody: "Shock! Truly and honestly flabbergasted.",
    username: 'j2wavy',
  })
  .then(result => console.log('Created new document', result))
  .catch(err => console.log(err));
// Create a new instance with required title and optional author properties
React
  .create({
    reactionBody: 'Oh the horror!',
    username: 'suethesues'
  })
  .then(result => console.log('Created new document', result))
  .catch(err => console.log(err));
export default React;