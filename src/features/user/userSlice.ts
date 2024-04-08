import { createSlice } from "@reduxjs/toolkit"
import type { User } from "../../app/types"
import { userApi } from "../../app/services/userApi"
import { Login } from "./login"
import { Register } from "./register"
import type { RootState } from "../../app/store"

interface InicialSState {
  user: User | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
  token?: string
}

const initialState: InicialSState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload
      })
      .addMatcher(
        userApi.endpoints.getuserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload
        },
      )
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectCurent = (state: RootState) => state.user.current
export const selectUser = (state: RootState) => state.user.user
