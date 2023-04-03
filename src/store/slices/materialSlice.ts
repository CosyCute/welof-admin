import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MaterialState {
   modalOpened: boolean
}

const initialState: MaterialState = {
   modalOpened: false,
}

export const materialSlice = createSlice({
   name: 'material',
   initialState,
   reducers: {
      changeMaterialModalOpened(state, action: PayloadAction<boolean>) {
         state.modalOpened = action.payload
      },
   },
})

export default materialSlice.reducer
