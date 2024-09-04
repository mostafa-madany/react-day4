import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

export interface FabState {
  favs: [];
}

const initialState: FabState = {
  favs: [],
};

export const favSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleFav: (state, action) => {
      const itemFav = state.favs.find((item) => item.id == action.payload.id);
      if (itemFav) {
        const filteredFavs = state.favs.filter(
          (item) => item.id !== action.payload.id
        );
        state.favs = [...filteredFavs];
      } else {
        state.favs.push(action.payload);
      }
    },
  },
});

export const { toggleFav } = favSlice.actions;

export default favSlice.reducer;
