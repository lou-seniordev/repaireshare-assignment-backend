import { Schema, model, ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IPhase {
	name: string;
	
	description: string
	
	startupId: ObjectId
	
}


const phaseSchema = new Schema<IPhase>({
	name: { type: String, required: true },
	description: {type: String, required: true},
	startupId: { type: Schema.Types.ObjectId, required: true }
}, {
	timestamps: true
});


const phase = model<IPhase>('phase', phaseSchema);
export default phase
