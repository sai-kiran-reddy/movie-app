import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthenticationState {
  login: boolean,
  SignUp:boolean,
  logout:boolean,
  loginHome: boolean,
  SignUpHome:boolean,
}

const initialState: AuthenticationState = {
    login: false,
    SignUp:false,
    loginHome:false,
    logout:false,
    SignUpHome:false
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signupAction: (state,action: PayloadAction<boolean>) => {
      state.SignUp = action.payload;
    },
    loginHomeAction: (state,action: PayloadAction<boolean>) => {
      state.loginHome = action.payload;
    },
    signupHomeAction: (state,action: PayloadAction<boolean>) => {
      state.SignUpHome = action.payload;
    },
    logoutAction: (state) => {
      state = initialState;
    },
  },
})

export const { signupAction,loginHomeAction,signupHomeAction,logoutAction } = authenticationSlice.actions

export default authenticationSlice.reducer