import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication";
import movieTabReducer from "./slices/movietabslice";
import authorizationReducer from "./slices/authorization";

const reducers = combineReducers({ authenticationReducer, movieTabReducer, authorizationReducer });

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
