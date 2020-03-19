import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import {fetchBooks} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner/spinner';

import './book-list.css';
import ErrorIndicator from "../error-indicator";

const BookList = ({books})=>{
     return(
                <ul className="book-list">
                    {
                        books.map((book)=>{
                            return (
                                <li key={book.id}><BookListItem book={book}/></li>
                            )
                        })
                    }
                </ul>
            )
}


class BookListContainer extends Component{

    componentDidMount() {
       
        //const {bookstoreService,booksLoaded,booksRequested,booksError} = this.props; // отдает mapDispatchToProps
        //booksRequested(true);
        //bookstoreService.getBooks()
        //.then((data)=>booksLoaded(data))
        //    .catch((err)=>booksError(err));

        this.props.fetchBooks();
         
    }

    render(){
        const {books,loading,error} = this.props; //// отдает mapStateToProps
        console.log({books});
        if(loading){
            return <Spinner/>
        }
        if(error){
            return <ErrorIndicator />
        }
        return  <BookList books={books}/>
    }
}




// получить книги из нашего redux-store 1-ый вариант
/*const mapStateToProps = (state)=>{
    return {
        books:state.books,
        loading:state.loading
    }
}*/

// получить книги из нашего redux-store 2-ой вариант с деструктуризацией
const mapStateToProps = ({books,loading,error})=>{
    return {
        books,
        loading,
        error
    }
}

// 1-ая реализация без BindActionCreators
/*const mapDispatchToProps = (dispatch)=>{
    return {
        booksLoaded:(newBooks)=>{
            dispatch(booksLoaded(newBooks)) // использовали booksloaded action из папки action
        }
    }
}*/

// 2-a реализация. Полностью идентичны по действию с 1-ой и 3-ей
/*const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({booksLoaded},dispatch);
}*/

// 3-я реализация, просто проще и короче
// mapDispatchToProps описывает какие экшены компонент будет передавать в store
const mapDispatchToProps = (dispatch,{bookstoreService})=>{
    return {
        fetchBooks:fetchBooks(bookstoreService,dispatch)
    }
}

// без compose
//export default withBookstoreService()(connect(mapStateToProps,mapDispatchToProps)(BookList));

//c compose()
export default compose(
    withBookstoreService(),
    connect(mapStateToProps,mapDispatchToProps)
)(BookListContainer)