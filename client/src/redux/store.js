import { configureStore } from '@reduxjs/toolkit'
import orebiReducer from "./orebiSlice"
import { persistStore, persistReducer } from 'redux-persist'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// ✅ Use real browser localStorage directly
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, orebiReducer)

export const store = configureStore({
  reducer: {
    orebi: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)