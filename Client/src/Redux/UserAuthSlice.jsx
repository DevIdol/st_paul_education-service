import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { url } from "./Api";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token"),
  username: "",
  email: "",
  isAdmin: undefined,
  _id: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        username: "",
        email: "",
        isAdmin: undefined,
        _id: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
