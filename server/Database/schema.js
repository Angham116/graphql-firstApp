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
        return Auther.findById(parent.autherID)
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
    book: {
      type: new GraphQLList(bookType),
      resolve(parent, args){
        return Auther.findById({id: parent.id})
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
        return Book.find({})
      }
    },
    authers: {
      type: new GraphQLList(autherType),
      resolve(parent, args){
        return Auther.find({})
      }
    },
    book: {
      type: bookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Book.findById(args.id)
      }
    },
    auther: {
      type: autherType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Auther.findById(args.id)
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


