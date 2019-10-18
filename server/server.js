const express = require('express');
const graphqlHTTP = require('express-graphql');


const schema = require('./Database/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`The server listening on localhost:${PORT}`);
})
