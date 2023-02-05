import { getData, saveData, updateData } from './db.control.js';
import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';

let activePhase;

interface INewPhaseInput {
	phaseName: string;
	tasks: Array<string>;
}


export default {
	Query: {
		getAllPhase: () => {
			return getData('phase');
		},
		getActivePhase: () => {
			return activePhase;
		}
	},
	
	Mutation: {
		addNewPhase: (_, data: { data: INewPhaseInput }) => {
			const phaseId = uuidv4();
			const tasks = data.data.tasks.map((task) => ({
				_id: uuidv4(),
				completed: false,
				taskName: task
			}));
			
			const phase = {
				_id: phaseId,
				name: data.data.phaseName,
				tasks,
				completed: false,
			};
			if (!activePhase) {
				activePhase = phaseId;
			}
			saveData('phase', phase);
			return 'New Phase Added successfully';
		},
		
		// This mutation updates the completion status of a task within a phase.
		updatePhaseTask: (_, { taskId, phaseId, completed }: { taskId: string, phaseId: string, completed: boolean }) => {
			
			const phase = getData('phase');
			
			const phaseIndex = phase.findIndex(phaseData => phaseData._id === phaseId);
			
			if (phaseIndex === -1) throw new GraphQLError('Invalid Phase id');
			
			const taskIndex = phase[phaseIndex].tasks.findIndex(task => task._id === taskId);
			
			if (taskIndex === -1) throw new GraphQLError('Invalid task id');
			
			const updatedPhase = [...phase];
			
			updatedPhase[phaseIndex].tasks[taskIndex].completed = completed;

			updatedPhase[phaseIndex].completed = updatedPhase[phaseIndex].tasks.every(
			 (task: { completed: boolean }) => task.completed
			);
			
			updateData('phase', updatedPhase);
			
			if (updatedPhase[phaseIndex].completed && phaseIndex === activePhase) {
				activePhase = updatedPhase[phaseIndex]._id;
			}
			return 'Updated successfully';
			
		}
	}
	
};
