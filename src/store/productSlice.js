import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import statusCodes from '../utils/statusCodes';

const initialState = {
    data : [],
    status: statusCodes.IDLE
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        /*
        fetchProducts(state, action) {
            state.data = action.payload
        }
            */
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.pending, (state, action)=> {
            state.status = statusCodes.LOADING
        })
        .addCase(getProducts.fulfilled, (state, action)=>{
            state.data = action.payload
            state.status = statusCodes.IDLE
        })
        .addCase(getProducts.rejected, (state, action)=> {
            state.status = statusCodes.ERROR
        })

    }
})

export const {fetchProducts} = productSlice.actions;
export default productSlice.reducer

export const getProducts = createAsyncThunk('products/get', async()=>{
    const data = await fetch('https://fakestoreapi.com/products');
    const result = await data.json();
    return result

})


/*
export function getProducts() {
    return async function getProudctsThunk(dispatch, getState) {
        try {
            // Fetch the data from the API
            const response = await fetch('https://fakestoreapi.com/products');
            
            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON data
            const data = await response.json();
            console.log("data", data); // Log the data to check its structure

            // Dispatch the action with the result
            dispatch(fetchProducts(data));
        } catch (error) {
            // Handle errors
            console.error("Failed to fetch products", error);
        }
    }
}
*/