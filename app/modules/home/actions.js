import axios from 'axios';

import * as t from './constants';

const replaceSpaces = string => string.split(' ').join('+')

// This is where we make an API call to Open Library and fetch the search results
// This can be used from anywhere in the project
// This returns a dispatch with dispatch type and fetched data
// Dispatch is used for redux store update
export function getBooks(query = "React", page = 1, additive = false) {
  return (dispatch) => {
    dispatch({type: t.RETRIEVING_BOOKS});
    return new Promise((resolve, reject) => {
      const searchTerms = replaceSpaces(query) // separate by + signs
      const url = `${t.API_URL}q=${searchTerms}&page=${page}`;
      axios.get(url)
      .then(res => res.data)
      .then((data) => {
        if(additive){
          dispatch({type: t.BOOKS_AVAILABLE_ADDITIVE, data})
        } else {
          dispatch({type: t.BOOKS_AVAILABLE_AFRESH, data})
        }
        resolve()
      })
      .catch(error => {
        dispatch({type: t.BOOKS_ERROR, error})
        reject()
      });
    })
  };
}