const express = require("express");
const { graphqlHTTP }  = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

console.log("Hello World");

const app = express();

app.use('/test', (req, res, next) => {
    next("Test");
    // return;
  });

app.use('/', (req, res, next) => {
    console.log(req);
    next("In root");
  });


app.listen(3002);