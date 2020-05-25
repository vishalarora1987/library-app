import * as t from './constants';

// Here we first define initial state of our application which is stored in Redux
let initialState = { isFetching: true, docs:[], page:1, hasError:false, errorMsg: "" };

// This is where we define how to modify the state of our application
// based on dispatch type returned by an action
// whenever this is triggered a Redux state update is triggered.
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.RETRIEVING_BOOKS:{
      let isFetching = (state.docs.length > 0) ? false : true;
      return {...state, isFetching, hasError:false};
    }

    case t.BOOKS_AVAILABLE_ADDITIVE:{
      let docs = [...state.docs, ...action.data.docs];
      let {page} = state;
      return {...state, isFetching:false, docs, page, hasError:false};
    }

    case t.BOOKS_AVAILABLE_AFRESH:{
      let docs = action.data.docs;
      let {page} = state;
      return {...state, isFetching:false, docs, page, hasError:false};
    }

    case t.BOOKS_ERROR:{
      const error = action.error;
      return {...state, isFetching:false, hasError:true, errorMsg:error};
    }

    default:
      return state;
  }
};

export default homeReducer;