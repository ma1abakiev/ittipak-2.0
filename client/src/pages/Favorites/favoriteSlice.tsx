import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoriteStateType {
  data:
    | [
        {
          id: number
          content: string
          categories: []
          likes: []
          title: string
          subtitle: string
          photo: string
          updated: string
          created: string
        }
      ]
    | []
}

const initialState: FavoriteStateType = {
  data: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<FavoriteStateType>) => {
      const { data } = action.payload
      state.data = data
    },
  },
})

export const selectFavorite = (state: { favorite: FavoriteStateType }) =>
  state.favorite

export const { setData } = favoriteSlice.actions

export default favoriteSlice.reducer