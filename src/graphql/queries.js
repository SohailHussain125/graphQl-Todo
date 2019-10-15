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

const getSpecificBook = gql`
  query($id:ID){
    book(id:$id){
      name
      generation
      auther{
        name
      }
    }
  
  
}
`
export { getAuthersQuery, getBooksQuery, getSpecificBook };