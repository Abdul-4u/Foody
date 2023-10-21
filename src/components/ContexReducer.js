import React,{createContext ,useContext, useReducer} from 'react'


const CartStateContext = createContext();
const CartDispatchContext = createContext();
//ADD TO CART
const reducer =(state,action)=>{
switch(action.type){
    case "ADD_TO_CART":
        return [...state,{id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size,img:action.img}];
    // case "REMOVE_FROM_CART":
    //     return state.filter((item)=>item.id!==action.payload);
    // case "CLEAR_CART":
    //     return [];
    
    default:
        console.log("ERROR IN REDUCER");
       // return state;
}
}

export const CartProvider =({children})=>{  
    const[state,dispatch]=useReducer(reducer,[]);

return (
<CartDispatchContext.Provider value={dispatch}>
<CartStateContext.Provider value={state}>
{children}
</CartStateContext.Provider>
</CartDispatchContext.Provider>

)
}
export const useCart =()=> useContext(CartStateContext);    
export const useDispatchCart =()=> useContext(CartDispatchContext); 
