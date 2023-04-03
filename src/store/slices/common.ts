import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageInstance } from 'antd/es/message/interface'

interface CommonState {
   messageApi: MessageInstance | undefined
}

const initialState: CommonState = {
   messageApi: undefined,
}

export const commonSlice = createSlice({
   name: 'common',
   initialState,
   reducers: {
      setMessageApi(state, action: PayloadAction<MessageInstance>) {
         state.messageApi = action.payload
      },
      successCreateMessage(state) {
         state.messageApi?.open({
            type: 'success',
            content: 'Успешное создание!',
         })
      },
      successUpdateMessage(state) {
         state.messageApi?.open({
            type: 'success',
            content: 'Успешное изменение!',
         })
      },
      successDeleteMessage(state) {
         state.messageApi?.open({
            type: 'success',
            content: 'Успешное удаление!',
         })
      },
   },
})

export default commonSlice.reducer
