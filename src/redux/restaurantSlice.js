import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  business: {
    name: '',
    price: '',
    distance: 0,
    rating: 0,
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    categories: '',
    is_open_now: false,
    schedule: [],
    url: '',
    photo: ''
  }
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    update: (state, action) => {
      state.business = action.payload;
    }
  }
})

export const {update} = restaurantSlice.actions;

export default restaurantSlice.reducer;