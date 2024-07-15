import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

const persistConfig = {
  key: 'main-root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_SECRET_KEY_PERSIST,
      onError: function (error) {
        console.log('encryptTransform: ', error)
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

const Persistor = persistStore(store)

export { Persistor }
export default store
