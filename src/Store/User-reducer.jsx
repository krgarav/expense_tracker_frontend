import { createSlice } from "@reduxjs/toolkit";

const initialUserState = { username: "", userStatus: "", token: "" };
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    addUserName(state, action) {
      state.username = action.payload;
    },
    addUserStatus(state, action) {
        state.userStatus=action.payload;
    },
    addToken(state, action) {
        state.token=action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
