import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthorizationState {
  login: boolean,
  AccessToken:String,
}

const initialState: AuthorizationState = {
    login: false,
    AccessToken:'',
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    loginAction: (state,action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    setTokenAction: (state,action: PayloadAction<string>) => {
      state.AccessToken = action.payload;
    },
    clearAction: (state) => {
      state = initialState;
    },
  },
})

export const { loginAction,setTokenAction,clearAction } = authorizationSlice.actions

export default authorizationSlice.reducer