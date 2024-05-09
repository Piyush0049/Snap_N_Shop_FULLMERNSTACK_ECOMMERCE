import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ALL_ERRORS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"

export const allproducts = (keyword = "", page = "", gt = 0, lt = 50000, categ = "") => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let link = `/api/v1/products?keyword=${keyword}&page=${page}&price[gt]=${gt}&price[lt]=${lt}`;
        if (categ) {
            link = `/api/v1/products?keyword=${keyword}&page=${page}&price[gt]=${gt}&price[lt]=${lt}&category=${categ}`;
        }
        const { data } = await axios.get(link);
        console.log(data + "oijsdoj")
        console.log("recieved value of keyword : " + keyword)
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })

    }
}



export const resolveerror = async (dispatch) => {
    dispatch({ type: CLEAR_ALL_ERRORS })
}

export const productdetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })

    }
}


export const productreview = (productid, rating, comment) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST })
        const config = {
            "Content-type": "application/json"
        }
        const { data } = await axios.post("/api/v1/product/addreview", { productid, rating, comment }, config);
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

export const updateproduct = (id, n, d, p, c, s, u) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const config = {
            "Content-type": "application/json"
        }
        console.log(u)
        const { data } = await axios.put(`/api/v1/product/${id}`, {
            name: n, description: d, price: p, category: c, stock: s, images: {
                public_id: "public",
                url: u
            }
        }, config);
        console.log(data);
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response.data.message
        })

    }
}

