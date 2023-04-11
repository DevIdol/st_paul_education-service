import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../Api";
import { toast } from "react-toastify";

export const getMarks = createAsyncThunk("marks/getMarks", async (grade) => {
  const searchMonth = new URLSearchParams(window.location.search).get("month");
  const { data } = await axios.get(
    `${url}/marks/students?grade=${grade ?? 1}&month=${
      searchMonth ?? "January"
    }`
  );
  return data.data;
});

export const marksSlice = createSlice({
  name: "marks",
  initialState: {
    mark: {},
    marks: [],
    loading: false,
    error: "",
  },
  reducers: {
    createMarkStart(state) {
      state.loading = true;
      state.error = "";
    },
    createMarkSuccess(state, action) {
      state.loading = false;
      state.marks.push(action.payload);
      state.error = "";
    },
    getMarkSuccess(state, action) {
      state.loading = false;
      state.mark = action.payload;
      state.error = "";
    },
    getMarkStudentSuccess(state, action) {
      state.loading = false;
      state.marks = action.payload;
      state.error = "";
    },
    updateMarkSuccess(state, action) {
      state.loading = false;
      state.mark = action.payload;
      state.error = "";
    },
    deleteMarkSuccess(state, action) {
      state.loading = false;
      state.marks = state.marks.filter(
        (mark) => mark.markId !== action.payload.id
      );
      state.error = "";
    },
    createMarkFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getMarks.pending]: (state) => {
      state.loading = true;
    },
    [getMarks.fulfilled]: (state, action) => {
      state.marks = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getMarks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  createMarkStart,
  createMarkSuccess,
  getMarkSuccess,
  getMarkStudentSuccess,
  updateMarkSuccess,
  deleteMarkSuccess,
  createMarkFailure,
} = marksSlice.actions;

//create mark
export const createMarks =
  ({ id, markData }) =>
  async (dispatch) => {
    dispatch(createMarkStart());
    try {
      const { data } = await axios.post(`${url}/marks/create/${id}`, markData);
      dispatch(createMarkSuccess(data));
      dispatch(getMarks(data.data.grade));
      toast.success(`${data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } catch (error) {
      dispatch(createMarkFailure(error.response.data.message));
      toast.error(`${error.response.data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    }
  };

//Get Mark
export const getMark = (markId) => async (dispatch) => {
  dispatch(createMarkStart());
  try {
    const { data } = await axios.get(`${url}/marks/${markId}`);
    dispatch(getMarkSuccess(data.data));
  } catch (error) {
    dispatch(createMarkFailure(error.response.data.message));
  }
};

//Get student Mark
//Get student Mark
export const getStudentMark = (studentId) => async (dispatch) => {
  dispatch(createMarkStart());
  try {
    const { data } = await axios.get(`${url}/marks/students/${studentId}`);
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const marks = data.data.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );
    dispatch(getMarkStudentSuccess(marks));
  } catch (error) {
    dispatch(createMarkFailure(error.response.data.message));
  }
};

//Update Mark
export const updateMark =
  ({ markId, studentId, markData }) =>
  async (dispatch) => {
    dispatch(createMarkStart());
    try {
      const res = await axios.put(
        `${url}/marks/${markId}/${studentId}`,
        markData
      );
      dispatch(updateMarkSuccess(res.data));
      dispatch(getMarks());
      toast.success(`${res.data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } catch (error) {
      dispatch(createMarkFailure(error.response.data.message));
      toast.error(`${error.response.data.message}`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    }
  };

//Delete Student
export const deleteMark = (id, grade) => async (dispatch) => {
  dispatch(createMarkStart());
  try {
    const { data } = await axios.delete(`${url}/marks/${id}`);
    dispatch(deleteMarkSuccess(data));
    dispatch(getMarks(grade));
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(createMarkFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};
export default marksSlice.reducer;
