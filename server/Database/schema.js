const graghql = require('graphql');


// I can store my database using MongoDB
// but here I will use array to store the dummy data
// dummy data
let books = [
  {id:1, name: 'First Book', gener: 'Fantasy'},
  {id:2, name: 'Second Book', gener: 'Fantasy'},
  {id:3, name: 'Third Book', gener: 'Science'}
];


// the Graphql schema describe objects of data and types 
// My Schema contains (Book & Auther)
// the (Book & Auther) will be objects

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
GraphQLSchema
} = graghql;
// this dstructure make: grap the variable of this function for us from graphql(instance of graphql package )
// then the GraphQLObjectType is function that take an object 

const bookType = new GraphQLObjectType({
  name: 'Book',
  // fields is function
  fields: () => {
    return {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    gener: {type: GraphQLString},
  }
}
});

const autherType = new GraphQLObjectType({
  name: 'Auther',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  })
})

// define the relationships
const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: { // this query for particular book
      type: bookType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args){
        // code to get data from db/other source
        // const particularBook = books.filter(book => book.id === args.id);
        // console.log(1111, books);
        console.log(222, args.id);
        const book = books.filter(item => item.id === args.id)
        console.log(333, book);
        return books[0];
      }
    }
  }
})


// export {
//   bookType,
//   autherType
// }

module.exports = new GraphQLSchema({
  query: rootQuery
});


