import { configureStore } from '@reduxjs/toolkit'
import userReducer, { IUserState } from './userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 选择持久化存储引擎，如 localStorage 或 AsyncStorage
import componentsReducer, { ComponentsStateType } from './componentReducer'
import pageInfoReducer, { IPageInfo } from './pageInfoReducer'

export interface IState {
  user: IUserState
  components: ComponentsStateType
  pageInfo: IPageInfo
}

// 配置持久化设置
const persistConfig = {
  key: 'root', // 存储的键名
  storage, // 持久化存储引擎
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ 禁用序列化检查（不推荐）
    }),
})
export default store
export const persistor = persistStore(store)
