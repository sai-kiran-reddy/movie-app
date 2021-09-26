import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  popular: boolean;
  Latest: boolean;
  Favourite: boolean;
}

const initialState: AuthenticationState = {
  popular: false,
  Latest: false,
  Favourite: false,
};

export const MovieTabsSlice = createSlice({
  name: "MovieTabs",
  initialState,
  reducers: {
    popularAction: (state, action: PayloadAction<boolean>) => {
      state.popular = action.payload;
    },
    FavouriteAction: (state, action: PayloadAction<boolean>) => {
      state.Favourite = action.payload;
    },
    LatestAction: (state, action: PayloadAction<boolean>) => {
      state.Latest = action.payload;
    },
  },
});

export const { popularAction, LatestAction, FavouriteAction } =
  MovieTabsSlice.actions;

export default MovieTabsSlice.reducer;
