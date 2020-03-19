import React from "react";
import './book-list-item.css';
import {Link} from 'react-router-dom'; 

const BookListItem = ({book})=>{
    const {title,author,price,coverImage} = book;
    return (
    	<div className="book-list-item">
    		<div className="book-cover">
    			<img src={coverImage} alt={coverImage}/>
    		</div>
    		<div className="book-details">

	           <Link to="/"><span className="book-title">{title}</span></Link>
	           <div className="book-author">Author: {author}</div>
	           <div className="book-price">Price: {price}</div>
	           <button className="btn btn-info add-to-cart">Add to cart</button>
            </div>
        </div>
    )
 }

export default BookListItem;