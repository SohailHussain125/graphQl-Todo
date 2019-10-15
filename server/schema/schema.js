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
  GraphQLNonNull
} = graphql;



const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    generation: { type: GraphQLString },
    authorId: { type: GraphQLID },
    auther: {
      type: AutherType,
      resolve(parent, args) {
        // return _.find(authers, { id: parent.autherId })
      return Auther.findById(parent.authorId)
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
        return Book.find({authorId:parent.id})
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
        return Book.findById(args.id);

      }
    },
    auther: {
      type: AutherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authers, { id: args.id })
        return Auther.findById(args.id)

      }
    }
    ,
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },

    authers: {
      type: new GraphQLList(AutherType),
      resolve(parent, args) {
        // return authers;
        return Auther.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
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
      type: BookType,
      args: {
        name: { type:new GraphQLNonNull(GraphQLString) },
        generation: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          generation: args.generation,
          authorId: args.authorId
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


