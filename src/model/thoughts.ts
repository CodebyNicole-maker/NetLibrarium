import { Schema, model, Document, Types } from "mongoose";
import moment from "moment"; // For date formatting

// Reaction Subdocument Interface
export interface IReaction {
  reactionId?: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt?: Date;
}

// Thought Interface
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

// Reaction Schema (Subdocument)
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: { 
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId() 
    },
    reactionBody: { 
      type: String, 
      required: true, 
      maxlength: 280 
    },
    username: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (timestamp: Date) => moment(timestamp).format("MMM DD, YYYY [at] hh:mm A") 
    }
  },
  {
    toJSON: { getters: true },
    id: false
  }
);

// Thought Schema (Main Document)
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { 
      type: String, 
      required: true, 
      minlength: 1, 
      maxlength: 280 
    },
    // createdAt: { 
    //   type: Date, 
    //   default: Date.now, 
    //   get: (timestamp: Date) => moment(timestamp).format("MMM DD, YYYY [at] hh:mm A") 
    // },
    username: { 
      type: String, 
      required: true 
    },
    reactions: [reactionSchema] // Array of reactions (subdocuments)
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false
  }
);

// Virtual to count reactions
thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

// Static method to find a thought by ID
thoughtSchema.statics.findThoughtById = async function (thoughtId: string) {
  return this.findOne({ _id: thoughtId }).populate("reactions");
};

// Middleware Hook (Pre-remove: Cleanup related data if needed)
// thoughtSchema.pre<IThought>("remove", async function (next) {
//   console.log(`Cleaning up reactions for thought: ${this._id}`);
//   next();
// });

// Create & Export Thought Model
const Thought = model<IThought>("Thought", thoughtSchema);
export default Thought;
