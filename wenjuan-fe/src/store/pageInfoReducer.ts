import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
export interface IPageInfo {
  title: string
  desc?: string
  js?: string
  css?: string
}
const INIT_STATE: IPageInfo = {
  title: '',
  desc: '',
  js: '',
  css: '',
}
export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: IPageInfo, action: PayloadAction<IPageInfo>) => {
      return action.payload
    },
    resetTitle: produce((draft: IPageInfo, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),
  },
})
export const { resetPageInfo, resetTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
