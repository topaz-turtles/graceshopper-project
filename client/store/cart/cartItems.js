
const SET_CART_ITEMS = 'SET_CART_ITEMS';


const setCartItems = (num) =>({type: SET_CART_ITEMS, num});


export const setCartItemsAmount = (num)=>dispatch=>{
    console.log("num is",num)
    dispatch(setCartItems(num))
}

export default function(items=0, action){

    switch(action.type){
        case SET_CART_ITEMS:
            return action.num;
        default:
            return items
    }
}