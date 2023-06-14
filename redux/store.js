import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import appSlice from "./slices/appSlice";
import isDoneSlice from "./slices/isDoneSlice";
import consultantSlice from "./slices/consultantSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const reducers = combineReducers({
  login: loginSlice,
  app: appSlice,
  isDone: isDoneSlice,
  consultant: consultantSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
