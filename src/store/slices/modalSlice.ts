import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
   createFormModalOpened: boolean
   updateFormModalOpened: boolean
   currentId: string
}

const initialState: ModalState = {
   createFormModalOpened: false,
   updateFormModalOpened: false,
   currentId: '',
}

export const modalSlice = createSlice({
   name: 'modalSlice',
   initialState,
   reducers: {
      changeCreateModalOpened(state, action: PayloadAction<boolean>) {
         state.createFormModalOpened = action.payload
      },
      changeUpdateModalOpened(state, action: PayloadAction<boolean>) {
         state.updateFormModalOpened = action.payload
      },
      changeCurrentId(state, action: PayloadAction<string>) {
         state.currentId = action.payload
      },
   },
})

export default modalSlice.reducer
