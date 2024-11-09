import {createSlice} from '@reduxjs/toolkit';

//alert
import Swal from 'sweetalert2' 

const initialState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{
        addToCart: (state,action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-danger"
                    },
                    buttonsStyling: true
                  });
                  swalWithBootstrapButtons.fire({
                    title: "Item already exists",
                    text: "You already have the item ",
                    icon: "warning",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                    reverseButtons: true
                  });
            }
        },
        removeFromCart: (state,action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state,action) => {
            state.cartItems = []
        }
    }
});

//exports the actions
export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
