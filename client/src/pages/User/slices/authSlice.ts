import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, Tokens } from '../types/type'

const initialState: AuthState = {
  id: null,
  email: '',
  username: '',
  tokens: {
    refresh: '',
    access: '',
  },
}

interface SetUserPayload {
  id: number
  email: string
  username: string
  tokens: Tokens
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const { id, email, tokens, username } = action.payload
      state.id = id
      state.username = username
      state.email = email
      state.tokens = tokens

      localStorage.setItem('user', JSON.stringify(state))
      localStorage.setItem('token', state.tokens.access)
      localStorage.setItem('refresh', state.tokens.refresh)
    },
    logout: (state) => {
      Object.assign(state, initialState)
      localStorage.clear()
    },
  },
})

export const selectAuth = (state: { auth: AuthState }) => state.auth

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer
