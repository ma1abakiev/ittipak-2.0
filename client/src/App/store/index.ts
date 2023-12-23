import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthReducer from '../../pages/User/slices/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const rootReducer = combineReducers({
  auth: AuthReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store
setupListeners(store.dispatch)