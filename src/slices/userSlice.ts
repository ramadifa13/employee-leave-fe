// /app/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  profile: object | null;
  admins: object[];
  employees: object[];
  leaveRequests: object[];
}

const initialState: UserState = {
  profile: null,
  admins: [],
  employees: [],
  leaveRequests: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<object>) {
      state.profile = action.payload;
    },
    setAdmins(state, action: PayloadAction<object[]>) {
      state.admins = action.payload;
    },
    setEmployees(state, action: PayloadAction<object[]>) {
      state.employees = action.payload;
    },
    setLeaveRequests(state, action: PayloadAction<object[]>) {
      state.leaveRequests = action.payload;
    },
  },
});

export const { setProfile, setAdmins, setEmployees, setLeaveRequests } = userSlice.actions;
export default userSlice.reducer;
