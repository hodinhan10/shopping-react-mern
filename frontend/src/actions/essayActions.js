import Axios from 'axios';
import {
  ESSAY_CREATE_FAIL,
  ESSAY_CREATE_REQUEST,
  ESSAY_CREATE_SUCCESS,
  ESSAY_LIST_FAIL,
  ESSAY_LIST_REQUEST,
  ESSAY_LIST_SUCCESS,
  ESSAY_DELETE_SOFT_REQUEST,
  ESSAY_DELETE_SOFT_SUCCESS,
  ESSAY_DELETE_SOFT_FAIL,
  ESSAY_DETAILS_REQUEST,
  ESSAY_DETAILS_SUCCESS,
  ESSAY_DETAILS_FAIL,
  ESSAY_UPDATE_REQUEST,
  ESSAY_UPDATE_SUCCESS,
  ESSAY_UPDATE_FAIL,
  ESSAY_DELETE_LIST_TRARH_REQUEST,
  ESSAY_DELETE_LIST_TRARH_SUCCESS,
  ESSAY_DELETE_LIST_TRARH_FAIL,
  ESSAY_DELETE_RESTORE_REQUEST,
  ESSAY_DELETE_RESTORE_SUCCESS,
  ESSAY_DELETE_RESTORE_FAIL,
  ESSAY_DELETE_FORCE_REQUEST,
  ESSAY_DELETE_FORCE_SUCCESS,
  ESSAY_DELETE_FORCE_FAIL,
  ESSAY_DELETE_REQUEST,
  ESSAY_DELETE_SUCCESS,
  ESSAY_DELETE_FAIL,
  ESSAY_BROWSE_REQUEST,
  ESSAY_BROWSE_SUCCESS,
  ESSAY_BROWSE_FAIL,
  ESSAY_HIDE_REQUEST,
  ESSAY_HIDE_SUCCESS,
  ESSAY_HIDE_FAIL,
  ESSAY_COIN_CREATE_SUCCESS,
ESSAY_COIN_CREATE_FAIL,
} from '../constants/essayConstants';


export const listEssays = ({
  pageNumber = '',
  category = '',
  address = ''
}) => async (dispatch) => {
  dispatch({ type: ESSAY_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      // `/api/essays?pageNumber=${pageNumber}&category=${category}`
      `/api/essays?pageNumber=${pageNumber}&category=${category}&address=${address}`
    );
    dispatch({ type: ESSAY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ESSAY_LIST_FAIL, payload: error.message });
  }
};

export const listTrarhEssays = ({ pageNumber = '' }) => async (dispatch) => {
  dispatch({ type: ESSAY_DELETE_LIST_TRARH_REQUEST });
  try {
    const { data } = await Axios.get(
      `/api/essays/trash?pageNumber=${pageNumber}`
    );
    dispatch({ type: ESSAY_DELETE_LIST_TRARH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ESSAY_DELETE_LIST_TRARH_FAIL, payload: error.message });
  }
};

export const createEssay = (essay) => async (dispatch, getState) => {
  console.log('essay', essay)
  dispatch({ type: ESSAY_CREATE_REQUEST });

  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post('/api/essays', { essay }, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ESSAY_CREATE_SUCCESS, payload: data, });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_CREATE_FAIL, payload: message });
  }
};

export const deleteSoftEssay = (essayId) => async (dispatch, getState) => {
  dispatch({ type: ESSAY_DELETE_SOFT_REQUEST, payload: essayId });
  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.delete(`/api/essays/${essayId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_DELETE_SOFT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_DELETE_SOFT_FAIL, payload: message });
  }
};

export const deleteForceEssay = (essayId) => async (dispatch, getState) => {// lỗi
  dispatch({ type: ESSAY_DELETE_FORCE_REQUEST });
  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.delete(`/api/essays/${essayId}/force`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_DELETE_FORCE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_DELETE_FORCE_FAIL, payload: message });
  }
};

export const deleteEssay = (essayId) => async (dispatch, getState) => {// lỗi
  dispatch({ type: ESSAY_DELETE_REQUEST });
  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.delete(`/api/essays/${essayId}/force`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_DELETE_FAIL, payload: message });
  }
};

export const restoreEssay = (essay) => async (dispatch, getState) => {// lỗi
  dispatch({ type: ESSAY_DELETE_RESTORE_REQUEST });
  const { userSignin: { userInfo }, } = getState();

  try {
    const { data } = await Axios.patch(`/api/essays/${essay._id}/restore`, {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_DELETE_RESTORE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_DELETE_RESTORE_FAIL, payload: message });
  }
};

export const detailsEssay = (essayId) => async (dispatch) => {
  dispatch({ type: ESSAY_DETAILS_REQUEST, payload: essayId });
  try {
    const { data } = await Axios.get(`/api/essays/${essayId}`);
    dispatch({ type: ESSAY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ESSAY_DETAILS_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message,
    });
  }
};

export const updateEssay = (essay) => async (dispatch, getState) => {
  dispatch({ type: ESSAY_UPDATE_REQUEST, payload: essay });

  const { userSignin: { userInfo }, } = getState();
  try {
    const { data } = await Axios.put(`/api/essays/${essay._id}`, essay, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_UPDATE_FAIL, error: message });
  }
};

export const browseEssay = (essay) => async (dispatch, getState) => {
  dispatch({ type: ESSAY_BROWSE_REQUEST });
  const { userSignin: { userInfo }, } = getState();

  try {
    const { data } = await Axios.patch(`/api/essays/${essay._id}/browse`, {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_BROWSE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_BROWSE_FAIL, payload: message });
  }
};


export const hideEssay = (essay) => async (dispatch, getState) => {
  dispatch({ type: ESSAY_HIDE_REQUEST });
  const { userSignin: { userInfo }, } = getState();

  try {
    const { data } = await Axios.patch(`/api/essays/${essay._id}/hide`, {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: ESSAY_HIDE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
    dispatch({ type: ESSAY_HIDE_FAIL, payload: message });
  }
};

//  Nạp tiền vào bài đăng
export const coinCreateEssay = (dataes) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/essays/coin/${userInfo._id}`, dataes, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ESSAY_COIN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ESSAY_COIN_CREATE_FAIL, payload: message });
  }
};

