import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export interface IMovie extends Document {
  _id:string;
  title: string;
  description?: string; 
  category: ObjectId; 
  year?: number; 
  director?: string; 
  actors: string[];
}


export const movieSchema = new mongoose.Schema<IMovie>({
  title: {
    type: String,
    required: true,
  },
  description: String,
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  year: Number,
  director: String,
  actors: [String],
}, { timestamps: true });