import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import { IApp } from './types'

const initialState: IApp = {
  theme: 'light',
  sortBy: '',
  search: ''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  }
})

export const {changeMode, setSortBy, changeSearch} = appSlice.actions

export default appSlice.reducer