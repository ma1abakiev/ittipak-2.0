import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchState {
  searchText: string
}

const initialState: SearchState = {
  searchText: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
  },
})

export const { updateSearchText } = searchSlice.actions
export const selectSearchText = (state: { search: SearchState }) =>
  state.search.searchText
export default searchSlice.reducer
