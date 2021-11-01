import {
  ESSAY_CREATE_FAIL,
  ESSAY_CREATE_REQUEST,
  ESSAY_CREATE_SUCCESS,
  ESSAY_LIST_FAIL,
  ESSAY_LIST_REQUEST,
  ESSAY_LIST_SUCCESS,
  ESSAY_CREATE_RESET,
  ESSAY_DELETE_SOFT_REQUEST,
  ESSAY_DELETE_SOFT_SUCCESS,
  ESSAY_DELETE_SOFT_FAIL,
  ESSAY_DELETE_SOFT_RESET,
  ESSAY_DETAILS_REQUEST,
  ESSAY_DETAILS_SUCCESS,
  ESSAY_DETAILS_FAIL,
  ESSAY_UPDATE_REQUEST,
  ESSAY_UPDATE_SUCCESS,
  ESSAY_UPDATE_FAIL,
  ESSAY_UPDATE_RESET,
  ESSAY_DELETE_LIST_TRARH_REQUEST,
  ESSAY_DELETE_LIST_TRARH_SUCCESS,
  ESSAY_DELETE_LIST_TRARH_FAIL,
  ESSAY_DELETE_RESTORE_REQUEST,
  ESSAY_DELETE_RESTORE_SUCCESS,
  ESSAY_DELETE_RESTORE_FAIL,
  ESSAY_DELETE_RESTORE_RESET,
  ESSAY_DELETE_FORCE_REQUEST,
  ESSAY_DELETE_FORCE_SUCCESS,
  ESSAY_DELETE_FORCE_FAIL,
  ESSAY_DELETE_FORCE_RESET,
  ESSAY_DELETE_REQUEST,
  ESSAY_DELETE_SUCCESS,
  ESSAY_DELETE_FAIL,
  ESSAY_DELETE_RESET,
  ESSAY_BROWSE_REQUEST,
  ESSAY_BROWSE_SUCCESS,
  ESSAY_BROWSE_FAIL,
  ESSAY_HIDE_REQUEST,
  ESSAY_HIDE_SUCCESS,
  ESSAY_HIDE_FAIL,
  ESSAY_COIN_CREATE_SUCCESS,
  ESSAY_COIN_CREATE_FAIL,
  ESSAY_COIN_CREATE_RESET,

} from "../constants/essayConstants";


export const essayListReducer = (state = { loading: true, essays: [] }, action) => {
  switch (action.type) {
    case ESSAY_LIST_REQUEST:
      return { loading: true };
    case ESSAY_LIST_SUCCESS:
      const inverse = (action.payload.essays).reverse()
      const ZeroData = inverse.filter(item => item.coinsEssay.length === 0)
      const BrowseData = inverse.filter(item => item.coinsEssay.length > 0)
      const sortData = BrowseData.sort(function (a, b) {
        return b.coinSum - a.coinSum;
      });
      const data =[...sortData,...ZeroData]

      return {
        loading: false,
        essays: data,
        essayRead: data.filter(e => e.isStatus === true),
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ESSAY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const essayListTrarhReducer = (state = { loading: true, essays: [] }, action) => {
  switch (action.type) {
    case ESSAY_DELETE_LIST_TRARH_REQUEST:
      return { loading: true };
    case ESSAY_DELETE_LIST_TRARH_SUCCESS:
      return {
        loading: false,
        trashEssays: action.payload.trashEssays,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ESSAY_DELETE_LIST_TRARH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const essayCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_CREATE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        essay: action.payload.essay
      };
    case ESSAY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const essayDeleteSoftReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_DELETE_SOFT_REQUEST:
      return {
        loading: true
      };
    case ESSAY_DELETE_SOFT_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_DELETE_SOFT_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_DELETE_SOFT_RESET:
      return {};
    default:
      return state;
  }
};

export const essayDeleteForceReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_DELETE_FORCE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_DELETE_FORCE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_DELETE_FORCE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_DELETE_FORCE_RESET:
      return {};
    default:
      return state;
  }
};

export const essayDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_DELETE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const essayRestoreReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_DELETE_RESTORE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_DELETE_RESTORE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_DELETE_RESTORE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_DELETE_RESTORE_RESET:
      return {};
    default:
      return state;
  }
};

export const essayDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ESSAY_DETAILS_REQUEST:
      return {
        loading: true
      };
    case ESSAY_DETAILS_SUCCESS:
      return {
        loading: false,
        essay: action.payload
      };
    case ESSAY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const essayUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_UPDATE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ESSAY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const essayBrowseReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_BROWSE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_BROWSE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_BROWSE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const essayHideReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_HIDE_REQUEST:
      return {
        loading: true
      };
    case ESSAY_HIDE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ESSAY_HIDE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const essayCoinCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ESSAY_COIN_CREATE_SUCCESS:
      return {
        success: true
      };
    case ESSAY_COIN_CREATE_FAIL:
      return {
        error: action.payload
      };
    case ESSAY_COIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

