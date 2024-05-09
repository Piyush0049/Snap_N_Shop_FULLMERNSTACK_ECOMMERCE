import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartconstants";

export const addtocart = (id, quantity, userid) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            user_id : userid,
            product : data.product._id,
            name : data.product.name,
            price : data.product.price,
            stock : data.product.stock,
            image : data.product.images[0].url,
            stock : data.product.stock,
            quantity
        }
    });
    const state = getState();
    console.log(state)
    localStorage.setItem("cartitem", JSON.stringify(state.cart.cartitems));
};

export const removefromcart = (id, quantity, userid) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            user_id: userid,
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock: data.product.stock,
            image: data.product.images[0].url,
            quantity
        }
    });

    // Retrieve the updated cart items from the action payload
    const state = getState();
    console.log(state);

    // Store the updated cart items in local storage
    localStorage.setItem("cartitem", JSON.stringify(state.cart.cartitems));
};
