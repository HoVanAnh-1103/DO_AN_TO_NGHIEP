// import { configureStore } from "@reduxjs/toolkit";
// // import authReducer from "./authSlice";
// // import cartReducer from "./cartSlice";

// // export default configureStore({
// //   reducer: {
// //     auth: authReducer,
// //     cart: cartReducer,
// //   },
// // });
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

export default configureStore({
  reducer: {
    user: userSlice
  },
})