import * as actionTypes from './actionTypes.js';
import { productListActions, productDetailsActions } from '../reducers/productReducers';
import axios from 'axios';

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
      dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  dispatch({ type: actionTypes.PRODUCT_TOP_REQUEST });
  try {
    const { data } = await axios.get(`/api/products/top`);
    dispatch({ type: actionTypes.PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });

  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${product._id}`, product, config);
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
