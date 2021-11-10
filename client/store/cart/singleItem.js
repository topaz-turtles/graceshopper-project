import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import { useDispatch } from "react-redux";

// ACTION TYPES

const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

// ACTION CREATORS
const addItem = (itemId) => {
  return {
    type: ADD_ITEM,
    itemId,
  };
};

//THUNK CREATORS
export const addItemToCart = async (itemId, cartId) => {
  try {
    const { data } = await axios.put(`/api/cart/${cartId}`, itemId);
    useDispatch(addItem(data));
  } catch (err) {
    return err;
  }
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    //   case GET_ITEMS:
    //     return action.items;

    default:
      return state;
  }
}
