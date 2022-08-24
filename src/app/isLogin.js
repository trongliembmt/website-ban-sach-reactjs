
import { createSlice } from '@reduxjs/toolkit'


export const isLogin = createSlice({

    name: "isLogin",
    initialState:{
        value:false,
        admin:false,
        totalItem:0
    },
    reducers:{
        login: state=>{
            state.value = true
        },
        logout: state=>{ state.value=false}
        ,
        isAdmin:state=>{state.admin = true},
        notAdmin:state=>{state.admin = false},
        cartTotalItem:(state,action)=>{
            state.totalItem = action
        }
    }
})

export const { login, logout, isAdmin, notAdmin } = isLogin.actions

export default isLogin.reducer