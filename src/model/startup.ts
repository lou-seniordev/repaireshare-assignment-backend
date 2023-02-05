import { Schema, model, ObjectId } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IStartup {
	fullname: string;
	email: string;
	startUp: string;
	currentPhase: ObjectId
	
}


const stateUpSchema = new Schema<IStartup>({
	fullname: { type: String, required: true },
	startUp: { type: String, required: true },
	email: { type: String, required: true },
	currentPhase: { type: Schema.Types.ObjectId, required: true }
},{
	timestamps: true
});


const startup = model<IStartup>('startup', stateUpSchema);

export default startup
