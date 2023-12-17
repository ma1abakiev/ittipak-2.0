import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, Tokens } from '../type'



const initialState: AuthState = {
  id: null,
  email: '',
  nickname: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  profile_photo: '',
  tokens: {
    refresh: '',
    access: '',
  },
}

interface SetUserPayload {
  id: number
  email: string
  nickname: string
  first_name: string
  last_name: string
  phone_number: string
  profile_photo: string
  tokens: Tokens
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const {
        id,
        email,
        first_name,
        last_name,
        phone_number,
        profile_photo,
        tokens,
        nickname,
      } = action.payload

      state.id = id
      state.email = email
      state.phone_number = phone_number
      state.profile_photo = profile_photo
      state.tokens = tokens
      state.nickname = nickname
      state.first_name = first_name
      state.last_name = last_name

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
