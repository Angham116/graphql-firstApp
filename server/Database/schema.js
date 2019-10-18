const graghql = require('graphql');

// the Graphql schema describe objects of data and types 
// My Schema contains (Book & Auther)
// the (Book & Auther) will be objects

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graghql 
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


export {
  bookType,
  autherType
}

