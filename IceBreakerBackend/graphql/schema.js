const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Status {
        status: String!
    }

    type UserId {
        id: String!
    }

    type IsTrue {
        isTrue: Boolean!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type RootQuery {
        getStatus: Status!
        loginUser(email: String!, password: String!): AuthData!
        createResetPasswordToken(email: String!): IsTrue!
        resetUserPassword(resetToken: String!, newPassword: String!): IsTrue!
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
        createUser(userInput: UserInputData): UserId! 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);