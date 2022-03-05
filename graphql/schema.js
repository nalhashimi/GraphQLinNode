const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Status {
        status: String!
    }

    type RootQuery {
        getStatus: Status!
    }

    schema {
        query: RootQuery
    }
`);