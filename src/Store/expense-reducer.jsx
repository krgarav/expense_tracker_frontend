import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expense: [] };
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
    removeExpense(state, action) {},
    addInitial(state, action) {},
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
