import axios from 'axios';
import { ThunkMiddleware } from 'redux-thunk';
import { useDispatch } from 'react-redux';

// ACTION TYPES
const GET_ITEMS = 'GET_ITEMS';
// const ADD_ITEM = "ADD_ITEM";
// const EDIT_ITEM = "EDIT_ITEM";
// const REMOVE_ITEM = "REMOVE_ITEM";

//ACTION CREATORS
const getItems = items => {
  return {
    type: GET_ITEMS,
    items,
  };
};

//THUNK CREATORS
export const fetchItems = async userId => {
  try {
    // Needs api route for all items in user's cart
    // const user = User.findByPk(userId);
    // const cardId = User.getCart().id;
    let { data } = await axios.get(`/api/cart/${userId}`);

    // get product data from ids
    // const products = data.items.map((item) => {
    //   const { data } = axios.get(`/api/products/${productId}`);
    //   return data;
    // });
    const [items] = data
    useDispatch(getItems(items));
  } catch (err) {
    return err;
  }
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items;

    default:
      return state;
  }
}
