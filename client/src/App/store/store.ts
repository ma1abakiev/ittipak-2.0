import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthReducer from '../../pages/User/slices/authSlice'
import SearchReducer from '../../features/Search/store/searchSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const rootReducer = combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store
setupListeners(store.dispatch)
