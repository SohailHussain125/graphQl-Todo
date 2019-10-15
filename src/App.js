import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './compoment/bookList/index.js';
import Addbook from './compoment/addbook/index'
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',

});




class App extends Component {
  constructor() {
    super();
    this.state = {
      bookId: "",
      visible: false,
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1 style={{ width: "100%", display: "flex", justifyContent: "center" }}>GraphQl TODO</h1>
          <div>
            <div>
              <BookList getBookId={(bookId) => { this.setState({ bookId: bookId }) }} showModal={this.showModal} />
             
              <Addbook visible={this.state.visible} handleCancel={this.handleCancel}/>
            </div>
            {/* <div> <BookDetail bookId={this.state.bookId} /> </div> */}
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;