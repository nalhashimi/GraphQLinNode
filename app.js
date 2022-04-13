const express = require("express");
const { graphqlHTTP }  = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const mongoose = require("mongoose");

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mdlr6.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const port = process.env.PORT || 3001;


const app = express();  

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver, 
  graphiql: true,
  customFormatErrorFn(err) {
    if(!err.originalError) {
        return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'an error occured';
    const code = err.statusCode || 500;
    return {message: message, status: code, data: data};
  }
}));

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // https.createServer({key: privateKey, cert: certificate}, app).listen(port);
    app.listen(port);
    console.log("Now Listening On Port 3001");
  })
  .catch((error) => {
    console.log(error);
  });