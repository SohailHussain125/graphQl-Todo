import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../graphql/queries'
import { Collapse, Icon, Row, Col ,Button} from 'antd';
import { flowRight as compose } from 'lodash';
import { getSpecificBook } from '../../graphql/queries'

const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};



class BookList extends Component {
  constructor() {
    super()

  }

  showBookList = () => {
    const { data: { books, loading } } = this.props;
    if (loading) {
      return <div>Loading...</div>
    }
    else {
      return books && books.length && books.map(book => {
        return<Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              <Panel header={<div><Row onClick={() => this.props.getBookId(book.id)}>
                <Col lg={2} md={2}>
                </Col>
                <Col lg={8} md={8}>{book.name}</Col>
                {/* <Col lg={7} md={7}>{book}</Col> */}
              </Row></div>} key={book.id} style={customPanelStyle}>
                {/* {
              book ?
              
              <div>
              <div>Book Name: {book.name}</div>
              <div>Auther Name: {book.auther.name}</div>
              <div>Generation: {book.generation}</div>
              
              </div> : ""
            } */}
              </Panel>

            </Collapse>
         
      })
    }
  }

  render() {
    return (
      <div>
        <Col lg={24} md={24} >
          <Col lg={6} md={6} > </Col>
          <Col lg={12} md={12}>
      {this.showBookList()}
      
      </Col>
        <Col lg={6} md={6} className="flex-center-center"> 
        <Button type="primary" onClick={this.props.showModal} style={{width:"100px" ,height:"100px"}}>
                Add Book
        </Button></Col>
        </Col>
      </div>
    );
  }
}

export default compose(
  graphql(getSpecificBook, {
    options: (props) => {
      return {
        variables: {
          id: props.bookId
        }
      }
    }
  }),
  graphql(getBooksQuery))(BookList);