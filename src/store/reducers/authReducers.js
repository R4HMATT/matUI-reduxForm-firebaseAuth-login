import * as actionTypes from 'actionTypes';

const initialState = {
  isAuth: false,
  authError: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isAuth: action.success }
  }
}