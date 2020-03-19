import React from "react";
import BookList from '../book-list' // этот BookList изменен connect() и берет данные из redux-store
import ShoppingCartTable from '../shopping-cart-table/shopping-cart-table';
const HomePage = ()=>{

    return (
    	<div>
	        <BookList/>
	        <ShoppingCartTable/>
        </div>

    )
}
export default HomePage;
