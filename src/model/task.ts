import { model, ObjectId, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ITask {
	name: string;
	
	description: string;
	
	phaseId: ObjectId;
	
	completed: boolean;
}


const taskSchema = new Schema<ITask>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	phaseId: { type: Schema.Types.ObjectId, required: true },
	completed: { type: Boolean, default: false }
}, {
	timestamps: true
});


const task = model<ITask>('task', taskSchema);
export default task;
