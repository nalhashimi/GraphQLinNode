const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Status {
        status: String!
    }

    type RootQuery {
        getStatus: Status!
    }

    type User {
        name: String!
    }

    input UserInputData {
        name: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User! 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);