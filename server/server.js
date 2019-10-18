const express = require('express');
const graphqlHTTP = require('express-graphql');


const app = express();

app.use('/graphql', graphqlHTTP({
  
}))
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`The server listening on localhost://${PORT}`);
})
