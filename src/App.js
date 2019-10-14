import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './compoment/bookList/index.js';
import Addbook from './compoment/addbook/index'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',

});




class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1 style={{width:"100%" ,display:"flex",justifyContent:"center"}}>GraphQl TODO</h1>
          <BookList/>
          <Addbook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;