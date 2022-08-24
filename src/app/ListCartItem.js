import { createSlice } from '@reduxjs/toolkit'

export const listCartItem = createSlice({
    name: "listCartItem",
    initialState:{
        list:[]
    },
    reducers:{
        addItem:(state,action)=>{
            state.list.push(action.payload)
        },

        removeItem:(state,action)=>{
            let index =  state.list.indexOf(action)
            state.list.splice(index,1)
        },
        removeAll:state=>{
            state.list = []
        }
    }
})

export const {addItem ,removeItem, removeAll} = listCartItem.actions

export default listCartItem.reducer
