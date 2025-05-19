import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    initialState: {
        data: {},
        loading: false,
        screenScroll: false,
        viewImage: 0,
        itemQuantity: 1,
        viewCartInHeader: true,
        snackBarOpen: false,
        snackBarMessage: '',
    },
    name: "data",
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
        },
        fetchDataEnd: (state) => {
            state.loading = false;
        },
        loadData: (state, action) => {
            state.data = action.payload;
            state.itemQuantity = action.payload.article?.minimum_order_quantity;
            state.loading = false;
        },
        triggerScroll: (state, action) => {
            state.screenScroll = action.payload;
        },
        setViewImage: (state, action) => {
            state.viewImage = action.payload;
        },
        setItemQuantity: (state, action) => {
            state.itemQuantity = action.payload;
        },  
        setViewCartInHeader: (state, action) => {
            state.viewCartInHeader = action.payload;
        },
        updateCart: (state) => {
            if (state.data.cart.itemList) {
                state.data.cart = {...state.data.cart, itemList: [...state.data.cart.itemList, { id: state.data.article?.id, quantity: state.itemQuantity }]};
            } else {
                state.data.cart = {...state.data.cart, itemList: [{ id: state.data.article?.id, quantity: state.itemQuantity }]};
            }
            state.data.cart.items = state.data.cart.items + 1;
            state.data.cart.total_costs = state.data.cart.total_costs + (state.itemQuantity * state.data.article?.price);
            state.snackBarOpen = true;
            state.snackBarMessage = 'Item added to the cart';
        },
        updateQuantity: (state) => {
            const index = state.data.cart.itemList.findIndex(each => each.id === state.data.article?.id);
            if (index !== -1) {
                state.data.cart.itemList[index].quantity = state.itemQuantity;
                state.data.cart.total_costs = state.data.cart.total_costs + (state.itemQuantity * state.data.article?.price);
            }
        },
        setSnackBar: (state, action) => {
            state.snackBarOpen = action.payload.open;
            state.snackBarMessage = action.payload.message;
        },
    },
})

export const { fetchDataStart, fetchDataEnd, loadData, triggerScroll, setViewImage, setItemQuantity, setViewCartInHeader, updateCart, updateQuantity, setSnackBar } = dataSlice.actions;
export default dataSlice.reducer;