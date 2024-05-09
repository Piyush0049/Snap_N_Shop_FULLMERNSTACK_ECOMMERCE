import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
import {  productreducer } from './reducers/productReducer';
import { alluserreducer, profilereducer, userreducer } from './reducers/usereducer';
import { productDETAILreducer } from './reducers/productReducer';
import { cartreducer } from './reducers/cartreducer';
import { allordersreducer, orderreducer } from './reducers/orderreducer';

const reducer = combineReducers({
    products: productreducer ,
    productdetails : productDETAILreducer,
    userdetails : userreducer,
    updatedprofile : profilereducer,
    cart : cartreducer,
    myorders : orderreducer,
    AllUsers : alluserreducer,
    allorders : allordersreducer
});

let initstate = {
    cart : {
        cartitems : localStorage.getItem("cartitem")!== "" ?
        JSON.parse(localStorage.getItem("cartitem")) : 
        []
    },
    myorders : {
        orderdet : localStorage.getItem("myorder") ?
        JSON.parse(localStorage.getItem("myorder")) : 
        []
    }
};
const middleware = [thunk];
const store = createStore(
    reducer,
    initstate,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store