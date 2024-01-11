//store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice"; // Подключение вашего reducer

export default configureStore({
  reducer: {
    user: userSlice, // 1 уровень
  },
});
