import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../Api";
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const { data } = await axios.get(`${url}/users`);
  return data.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    users: [],
    loading: false,
    success: "",
    error: "",
  },
  reducers: {
    userLoadStart(state) {
      state.loading = true;
      state.success = "";
      state.error = "";
    },
    createUserSuccess(state, action) {
      state.loading = false;
      state.users.push(action.payload);
      state.success = action.payload.message;
      state.error = "";
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.message;
      state.error = "";
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.message;
      state.error = "";
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.users = state.users.filter(
        (user) => user._id !== action.payload.id
      );
      state.success = action.payload.message;
      state.error = "";
    },
    verifyAdminSuccess(state, action) {
      state.loading = false;
      state.users.push(action.payload);
      state.success = action.payload.message;
      state.error = "";
    },
    userLoadFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  userLoadStart,
  createUserSuccess,
  getUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  verifyAdminSuccess,
  userLoadFailure,
} = usersSlice.actions;

//Create User
export const createUser = (userData) => async (dispatch) => {
  dispatch(userLoadStart());
  try {
    const { data } = await axios.post(`${url}/users/create`, userData);
    dispatch(createUserSuccess(data));
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(userLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

//Get User
export const getUser = (id) => async (dispatch) => {
  dispatch(userLoadStart());
  try {
    const { data } = await axios.get(`${url}/users/${id}`);
    dispatch(getUserSuccess(data.data));
  } catch (error) {
    dispatch(userLoadFailure(error.response.data.message));
  }
};

//Update User
export const updateUser = (id, data) => async (dispatch) => {
  dispatch(userLoadStart());
  try {
    const res = await axios.put(`${url}/users/${id}`, data);
    dispatch(updateUserSuccess(res.data));
    dispatch(getUser(id))
    dispatch(getUsers());
    toast.success(`${res.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(userLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
  dispatch(userLoadStart());
  try {
    const { data } = await axios.delete(`${url}/users/${id}`);
    dispatch(deleteUserSuccess(data));
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(userLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

//Verify Admin
export const VerifyAdmin = (id) => async (dispatch) => {
  dispatch(userLoadStart());
  try {
    const { data } = await axios.put(`${url}/users/verify-admin/${id}`);
    dispatch(verifyAdminSuccess(data));
    dispatch(getUsers());
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(userLoadFailure(error.response.data.message));
    toast.success(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

export default usersSlice.reducer;
