import axios from 'axios';
import { ThunkMiddleware, Thunk } from 'redux-thunk';
import { useDispatch } from 'react-redux';

// ACTION TYPES

const ADD_ITEM = 'ADD_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

// ACTION CREATORS
const addItem = item => {
  return {
    type: ADD_ITEM,
    item,
  };
};

const removeItem = itemId => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};

//THUNK CREATORS
// appends null
export const addItemToCart = (item, userId) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/cart/${userId}`, item);
    dispatch(addItem(data));
  } catch (err) {
    return err;
  }
};

// export const addItemToCart = async (itemId, cartId) => {
//   return function (dispatch, getState) {
//     const { data } = await axios.put(`/api/cart/${cartId}`, { itemId });
//     return {
//       type: 'ADD_ITEM',
//       payload: data
//     }
//   }
// };

export const removeItemFromCart = (itemId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}/${itemId}`);
    dispatch(removeItem(itemId));
  } catch (err) {
    return err;
  }
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    case REMOVE_ITEM:
      const cartState = state.items.filter(item => item.id !== action.itemId);

      if (!cartState.length) {
        return { ...state, items: [] };
      } else {
        return { ...state, items: cartState };
      }
    default:
      return state;
  }
}
