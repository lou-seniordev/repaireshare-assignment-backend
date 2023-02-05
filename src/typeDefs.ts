export default `#graphql

type task {
    _id: String!
    completed: Boolean!
    taskName: String!
}

type Phase {
    _id: String!
    name: String!
    completed: Boolean!
    tasks: [task!]!
}

input addPhaseInput {
    phaseName: String!
    tasks: [String!]!
}


type Query {
    getAllPhase: [Phase]
    getActivePhase: String!
}

type Mutation {
    addNewPhase(data: addPhaseInput): String!
    updatePhaseTask(taskId: String! phaseId: String! completed:Boolean!): String!
}
`;



