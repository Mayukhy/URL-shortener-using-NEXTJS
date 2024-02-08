'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeMenue:'Home',
}

export const urlSlice = createSlice({
    //from react component by this name the states are called
  name: 'url',
  initialState,
  reducers: {

setActiveMenue: (state,action) => {
  state.activeMenue=action.payload
  },

  },
})

// Action creators are generated for each case reducer function
export const {setActiveMenue} = urlSlice.actions

export default urlSlice.reducer