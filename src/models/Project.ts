import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  id: string;
  description: string;
  role: string;
  name: string;
  tools: string[];
  priority: number;
}

const ProjectSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  tools: {
    type: [String],
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  }
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
