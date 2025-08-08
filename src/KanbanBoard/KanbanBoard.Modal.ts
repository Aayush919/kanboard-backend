import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  originalTitle: string;
  description: string;
  userStory?: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  methodology: 'scrum' | 'kanban';
  tags: string[];
  subtasks: string[];
  documentationRefs: string[];
  progress: number;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    originalTitle: { type: String, required: true },
    description: { type: String, required: true },
    userStory: { type: String },
    deadline: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done','overdue'], required: true },
    methodology: { type: String, enum: ['scrum', 'kanban',"agile"], required: true },
    tags: [String],
  subtasks: [
    {
      title: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ],
  documentationRefs: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);
