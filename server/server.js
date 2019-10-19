const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./Database/schema');

const mongoose = require('mongoose');

const app = express();
require('dotenv').config()
// console.log(88888888888, process.env.MongoDB_URL);



// connect to MongoDB
mongoose.connect(process.env.MongoDB_URL);
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`The server listening on localhost:${PORT}`);
})
