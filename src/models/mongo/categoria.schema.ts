import mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export interface ICategory extends Document {
  _id:string;
  name: string;
  flims: ObjectId[];
}

export const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
 flims: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
}, { timestamps: true });
