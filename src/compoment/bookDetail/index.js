// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import { Collapse, Icon } from 'antd';

// const { Panel } = Collapse;



// class BookDetail extends Component {
//   constructor() {
//     super()

//   }

//   showBookList = () => {
//     const { data: { book, loading } } = this.props;
//     if (loading) {
//       return <div>Loading...</div>
//     }
//     else {
//       return (
//         book ?
          
//           <div>
//             <div>Book Name: {book.name}</div>
//             <div>Auther Name: {book.auther.name}</div>
//             <div>Generation: {book.generation}</div>

//           </div> : ""
//       )

//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.props.bookId && this.showBookList()}
//       </div>
//     );
//   }
// }

// export default (BookDetail);