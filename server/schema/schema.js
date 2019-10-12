const graphql = require('graphql');
const _ = require("lodash");
const Auther = require('../modals/auther');
const Book = require("../modals/books");

const { GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;



const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    generation: { type: GraphQLString },
    autherId: { type: GraphQLString },
    auther: {
      type: AutherType,
      resolve(parent, args) {
        // return _.find(authers, { id: parent.autherId })

      }
    }
  })
});

const AutherType = new GraphQLObjectType({
  name: 'Auther',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    bookcollection: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { autherId: parent.id })
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other sorce
        // return _.find(books, { id: args.id })

      }
    },
    auther: {
      type: AutherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authers, { id: args.id })
      }
    }
    ,
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },

    authers: {
      type: new GraphQLList(AutherType),
      resolve(parent, args) {
        // return authers;
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuther: {
      type: AutherType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let auther = new Auther({
          name: args.name,
          age: args.age
        });
        return auther.save();
      }
    },
    addBook: {
      type:BookType,
      args:{
        name:{type:GraphQLString},
        generation:{type:GraphQLString},
        autherId:{type:GraphQLString}
      },
      resolve(parent,args){
        let book = new Book({
          name:args.name,
          generation:args.generation,
          autherId:args.autherId
        })
         return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})


