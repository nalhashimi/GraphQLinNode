const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Status {
        status: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type RootQuery {
        getStatus: Status!
        loginUser(email: String!, password: String!): AuthData!
    }

    type User {
        name: String!
        email: String!
        password: String!
    }

    input UserInputData {
        name: String!
        email: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User! 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);