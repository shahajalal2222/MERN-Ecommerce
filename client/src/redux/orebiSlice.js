import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    userInfo: null,
}
export const orebiSlice = createSlice({
    name: "orebi",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // const existingItem=state.products.find((item)=>item.
            // _id===action.payload._id
            //);

            state.products.push({ ...action.payload, quantity: 1 });

        },
        increaseQuantity: (state, action) => {
            console.log(action.payload)
            const existingProduct = state.products.find(
                (item) => item?._id === action.payload
            );
            if (existingProduct) {
                existingProduct.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            console.log(action.payload)
            const existingProduct = state.products.find(
                (item) => item?._id === action.payload
            );
            if (existingProduct) {
                existingProduct.quantity--;
            }
        },

    deleteProduct:(state,action)=>{
        state.products=state.products.filter((item)=>
            item._id!==action.payload);
    },
    resetCart:(state)=>{
        state.products=[];
    },
    addUser:(state,action)=>{
       state.userInfo=action.payload;
    },
    removeUser:(state)=>{
        state.userInfo=null;
    },

    },
});
export const { 
    addToCart,
     increaseQuantity,
     decreaseQuantity
    ,deleteProduct,
    resetCart,
    addUser,
    removeUser
}= orebiSlice.actions;
export default orebiSlice.reducer;