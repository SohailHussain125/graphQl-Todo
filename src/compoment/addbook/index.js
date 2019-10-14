import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthersQuery } from '../../graphql/queries';
import { addBookMutation } from '../../graphql/mutation';
import { flowRight as compose } from 'lodash';


class Addbook extends Component {
  constructor() {
    super();

    this.state = {
      bookname: "",
      generation: "",
      autherId: "",


    };


  }

  showAuhters = () => {

    const { authers, loading } = this.props.getAuthersQuery;

    if (loading) {
      return <div>Loading...</div>
    }
    else {
      return authers && authers.length && authers.map(book => {
        return <option key={book.id} value={book.id}>{book.name}</option>
      })
    }
  }


  handleChangeAuther = (e) => {
    const { value } = e.target;
    this.setState({
      autherId: value

    })

  }
  AddBook = () => {
    const { bookname, generation, autherId } = this.state;
console.log(this.props.addBookMutation)
    // this.props.addBookMutation({
    //   variables:{
    //     name:bookname,
    //     generation:generation,
    //     autherId:autherId
    //   }
    // })
  }

  render() {
    const { bookname, generation, autherId } = this.state;
    console.log(bookname,
      generation,
      autherId,
    )
    console.log('this.props', this.props)
    return (

      <div>
        <div>
          <label>
            Book name : <input type='text' onChange={e => this.setState({ bookname: e.target.value })} />
          </label>
          <label>
            Generation: <input type='text' onChange={e => this.setState({ generation: e.target.value })} />
          </label>
          <select onChange={e => this.handleChangeAuther(e)}>

            <option >select auther</option>
            {this.showAuhters()}
          </select>
        </div>
        <button onClick={() => this.AddBook()}>send</button>
      </div>
    );
  }
}
export default compose(
  graphql(getAuthersQuery, { name: "getAuthersQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })

)(Addbook)