import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from "../redux/restaurantSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer
  },
})