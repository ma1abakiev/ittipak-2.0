import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchState {
  search: {
    searchText: string
  }
}

const initialState: SearchState = {
  search: {
    searchText: '',
  },
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.search.searchText = action.payload
    },
  },
})

export const { updateSearchText } = searchSlice.actions
export const selectSearchText = (state: SearchState) => state.search.searchText
export default searchSlice.reducer
