'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    singleUser:null,
}

export const userSlice = createSlice({
    //from react component by this name the states are called
  name: 'user',
  initialState,
  reducers: {

setSingleUser: (state,action) => {
  state.singleUser=action.payload
  },

  },
})

// Action creators are generated for each case reducer function
export const {setSingleUser} = userSlice.actions

export default userSlice.reducer