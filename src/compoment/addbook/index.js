import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthersQuery } from '../../graphql/queries';
import { addBookMutation } from '../../graphql/mutation';
import { flowRight as compose } from 'lodash';
import { getBooksQuery } from '../../graphql/queries'
import { Input, Form, Select, Button, Modal } from 'antd';
const { Option } = Select;
class Addbook extends Component {
  constructor() {
    super();

    this.state = {
      bookname: "",
      generation: "",
      autherId: "",


    };


  }
  onChange = (value) => {
    console.log(`selected ${value}`);
  }

  showAuhters = () => {

    const { authers, loading } = this.props.getAuthersQuery;

    if (loading) {
      return <div>Loading...</div>
    }
    else {
      return authers && authers.length && authers.map(book => {
        return <Option value={book.id}>{book.name}</Option>

      })
    }
  }


  handleChangeAuther = (value) => {
    this.setState({
      autherId: value

    })

  }
  AddBook = (e) => {
    e.preventDefault();
    const { bookname, generation, autherId } = this.state;
    this.props.addBookMutation({
      variables: {
        name: bookname,
        generation: generation,
        authorId: autherId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
    this.props.handleCancel();
  }

  render() {
    
    const { bookname, generation, autherId } = this.state;
    console.log(bookname,
      generation,
      autherId,
    )
    console.log('this.props', this.props)
    return (
      <Modal
        title="Add Book"
        visible={this.props.visible}
        onOk={this.AddBook}
        onCancel={this.props.handleCancel}
        okText="Submit"
      >
        <Form  onSubmit={(e) => this.AddBook(e)}>
          <Form.Item label="Book Name"><Input placeholder="Book Name..." onChange={e => this.setState({ bookname: e.target.value })} />
          </Form.Item>
          <Form.Item label="generation"><Input placeholder="Generation..." onChange={e => this.setState({ generation: e.target.value })} />
          </Form.Item>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Auther"
            onChange={e => this.handleChangeAuther(e)}
          >

            {this.showAuhters()}

          </Select>
        </Form>
      </Modal>
    );
  }
}
export default compose(
  graphql(getAuthersQuery, { name: "getAuthersQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })

)(Addbook)