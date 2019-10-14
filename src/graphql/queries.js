import { gql } from "apollo-boost";

const getAuthersQuery = gql`
{
  authers{
    name
    id
  } 
}
`


const getBooksQuery = gql`
{
  books{
    name
    generation
    id
  } 
}
`
export {getAuthersQuery , getBooksQuery};