import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";
import UserReducer from "./User-reducer";

const Store = configureStore({
  reducer: { expense: expenseReducer, user: UserReducer },
});

export default Store;
