import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import appSlice from "./slices/appSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const reducers = combineReducers({
  login: loginSlice,
  app: appSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
