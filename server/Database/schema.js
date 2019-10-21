const graghql = require('graphql');

const {
  Book,
  Auther
} = require('./Models')

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = graghql;

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
    id: {type: GraphQLID},
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
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args){
        // console.log(777, parent.id);
        // const autherBookss = books.filter(boo => boo.autherID === parent.id)
        // console.log(888, autherBookss);
      }
    }
  })
})


const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args){
      }
    },
    authers: {
      type: new GraphQLList(autherType),
      resolve(parent, args){
      }
    },
    book: { // this query for particular book
      type: new GraphQLList(bookType),
      args: {id: {type: GraphQLID}},
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
      type: new GraphQLList(autherType),
      args: {id: {type: GraphQLID}},
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
    },
    addBook: {
      type: bookType,
      args: {
        name: {type: GraphQLString},
        gener: {type: GraphQLString},
        autherID: {type: GraphQLID}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          gener: args.gener,
          autherID: args.autherID
        })
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutations
});


