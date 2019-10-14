import { gql } from "apollo-boost";


const addBookMutation = gql`
mutation($name: String!,$generation: String!,$authorId: ID!){
  addBook(name:$name,generation:$generation,authorId:$authorId){
    name
    id
  }
}

`


export { addBookMutation } 