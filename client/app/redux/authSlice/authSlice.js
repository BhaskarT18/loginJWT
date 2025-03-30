import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import Cookies from "js-cookie";

// Async Login Action
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", userData);
    Cookies.set("token", response.data.accessToken, { expires: 7 }); // Store JWT in cookies
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Async Signup Action
export const signupUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

export const getUserData = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const response = await api.get("/user");
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user data");
  }
});


// Logout Action
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    Cookies.remove("token"); 
    return null; 
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
