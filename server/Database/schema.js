const graghql = require('graphql');

const {
  Book,
  Auther
} = require('./Models')

// I can store my database using MongoDB
// but here I will use array to store the dummy data
// dummy data
let books = [
  {id:1, name: 'First Book', gener: 'Fantasy', autherID: 2},
  {id:2, name: 'Second Book', gener: 'Fantasy', autherID: 1},
  {id:3, name: 'Third Book', gener: 'Science', autherID: 2}
];

let authers = [
  {id:1, name: 'Auther 1', age: 32},
  {id:2, name: 'Auther 2', age: 54}
]

// the Graphql schema describe objects of data and types 
// My Schema contains (Book & Auther)
// the (Book & Auther) will be objects

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLList,
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
    auther: {
      type: autherType,
      resolve(parent, args){
        // console.log(555, parent);
        // const bookAuther = authers.filter(auth => auth.id === parent.autherID);
        // console.log(666, bookAuther);
        // return bookAuther[0]
      }
    }
  }
}
});

const autherType = new GraphQLObjectType({
  name: 'Auther',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: bookType,
      resolve(parent, args){
        // console.log(777, parent.id);
        // const autherBookss = books.filter(boo => boo.autherID === parent.id)
        // console.log(888, autherBookss);
      }
    }
  })
})

// define the relationships
const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args){
        // return books
      }
    },
    authers: {
      type: new GraphQLList(autherType),
      resolve(parent, args){
        // return authers
      }
    },
    book: { // this query for particular book
      type: bookType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args){
        // code to get data from db/other source
        // const particularBook = books.filter(book => book.id === args.id);
        // console.log(1111, books);
        // console.log(222, args.id);
        // const book = books.filter(item => item.id === args.id)
        // console.log(333, book);
        // return book[0];
      }
    },
    auther: {
      type: autherType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args){
        // const particularAuther = authers.filter(auth => auth.id === args.id)
        // console.log(particularAuther);
        // return particularAuther[0]
      }
    }
  }
})


// mutation data is add/delete or edit the data
const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuther: {
      type: autherType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args){
        let auther = new Auther({
          name: args.name,
          age: args.age
        });
        return auther.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutations
});


