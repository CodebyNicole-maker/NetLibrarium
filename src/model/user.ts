import { Schema, model, Document, Types } from 'mongoose';
import validator from 'validator';

/**
 * Interface representing a User document in MongoDB.
 */
export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount: number; // Virtual property
}

/**
 * Mongoose Schema for User Model.
 */
const userSchema = new Schema<IUser>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      validate: [validator.isEmail, 'Invalid email address'] 
    },
    thoughts: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Thought' 
    }],
    friends: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

/**
 * Virtual to count number of friends.
 */
userSchema.virtual('friendCount').get(function (this: IUser): number {
  return this.friends.length;
});

/**
 * Static method to get a user by ID with populated data.
 */
userSchema.statics.findUserById = async function (userId: string) {
  return this.findById(userId).populate('friends').populate('thoughts');
};

/**
 * Middleware Hook: Pre-remove cleanup - Deletes associated thoughts when a user is deleted.
 */
// userSchema.pre<IUser>('remove', async function (next) {
//   console.log(`Removing user: ${this.username} and cleaning up related thoughts.`);
//   await this.model('Thought').deleteMany({ _id: { $in: this.thoughts } });
//   next();
// });

/**
 * Middleware Hook: Pre-save - Prevents case-insensitive duplicate usernames.
 */
// userSchema.pre<IUser>('save', async function (next) {
//   const existingUser = await this.constructor.findOne({ username: new RegExp(`^${this.username}$`, 'i') });
//   if (existingUser && existingUser._id.toString() !== this._id.toString()) {
//     throw new Error('Username already exists');
//   }
//   next();
// });

/**
 * User Model.
 */
const User = model<IUser>('User', userSchema);

export default User;
