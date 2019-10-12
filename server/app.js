const express = require('express');
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://graphql-user-database:test123@ds233268.mlab.com:33268/graphql-databbase')

mongoose.connection.once("open" , ()=>console.log("data base connected"));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));
 
app.listen("4000", () => console.log("running port 4000"))