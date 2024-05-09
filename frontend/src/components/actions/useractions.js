import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOAD_FAIL, USER_LOAD_SUCCESS, USER_LOAD_REQUEST, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATEPASS_FAIL, USER_UPDATEPASS_REQUEST, USER_UPDATEPASS_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_FORGOT_FAIL, USER_FORGOT_SUCCESS, USER_FORGOT_REQUEST, FORGOT_RESET_REQUEST, FORGOT_RESET_SUCCESS, FORGOT_RESET_FAIL, ALL_USERS_FAIL, ALL_USERS_SUCCESS, ALL_USERS_REQUEST  } from "../constants/userconstants";

export const userlogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.post("/auth/login", { email, password }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};

export const usersignup = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.post("/auth/createuser", userdata, config);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
    }
};

export const userdataaccess = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST });
        const { data } = await axios.get("/auth/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
};

export const userlogout = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST });
        const { data } = await axios.get("/auth/userlogout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
    }
};

export const updateuser = (username, email) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.put("/auth/updateprofile", { username, email }, config);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.error
        });
    }
};


export const updateuserpassword = (oldpassword, newpassword, confirmpassword) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATEPASS_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.put("/auth/updatepassword", { oldpassword, newpassword, confirmpassword }, config);
        dispatch({
            type: USER_UPDATEPASS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATEPASS_FAIL,
            payload: error.response.data.error
        });
    }
};

export const deleteuser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
         await axios.delete("/auth/userdelete");
        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response.data.error
        });
    }
};


export const forgotuserpassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.post("/auth/password/forgot", { email }, config);
        dispatch({
            type: USER_FORGOT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_FORGOT_FAIL,
            payload: error.response.data.error
        });
    }
};


export const forgotpasswordreset = (token, newpassword, confirmpassword) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_RESET_REQUEST });
        const config = {
            "Content-Type": "application/json"
        };
        const { data } = await axios.put(`/auth/password/reset/${token}`, { newpassword, confirmpassword }, config);
        dispatch({
            type: FORGOT_RESET_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FORGOT_RESET_FAIL,
            payload: error.response.data.error
        });
    }
};


export const getallusers = () => async(dispatch) => {
    try {
        dispatch({
            type : ALL_USERS_REQUEST
        })
        const {data} = await axios.get("/auth/getalluserprofile");
        dispatch({
            type : ALL_USERS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.error
        });
    }
}