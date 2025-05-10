import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUserState {
  username: string
  nickname: string
}

const INIT_STATE: IUserState = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: IUserState, action: PayloadAction<IUserState>) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions
export default userSlice.reducer
