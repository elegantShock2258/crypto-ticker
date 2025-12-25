import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
};

type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
};

const initialState: AuthState = {
  status: "loading",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state) {
      state.status = "loading";
    },
    setAuthenticated(state, action: PayloadAction<AuthUser>) {
      state.status = "authenticated";
      state.user = action.payload;
    },
    setUnauthenticated(state) {
      state.status = "unauthenticated";
      state.user = null;
    },
  },
});

export const { setAuthLoading, setAuthenticated, setUnauthenticated } =
  authSlice.actions;

export default authSlice.reducer;
