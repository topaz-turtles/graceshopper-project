import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import { useDispatch } from "react-redux";

// ACTION TYPES

const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

// ACTION CREATORS
const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};

//THUNK CREATORS
// appends null
export const addItemToCart = async (itemId, cartId) => {
  try {
    const { data } = await axios.put(`/api/cart/${cartId}`, { itemId });
    dispatch(addItem(data));
  } catch (err) {
    return err;
  }
};

export const removeItemFromCart = async (itemId, cartId) => {
  try {
    await axios.delete(`/api/cart/${cartId}/${itemId}`);
    useDispatch(removeItem(itemId));
  } catch (err) {
    return err;
  }
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    default:
      return state;
  }
}
