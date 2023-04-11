import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../Api";
import { toast } from "react-toastify";

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async (grade) => {
    if (grade) {
      const { data } = await axios.get(`${url}/students?grade=${grade}`);
      return data.data;
    } else {
      const { data } = await axios.get(`${url}/students`);
      return data.data;
    }
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    student: {},
    students: [],
    loading: false,
    error: "",
  },
  reducers: {
    studentLoadStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    createStudentSuccess(state, action) {
      state.loading = false;
      state.students.push(action.payload);
      state.error = "";
    },
    getStudentSuccess(state, action) {
      state.loading = false;
      state.student = action.payload;
      state.error = "";
    },
    updateStudentSuccess(state, action) {
      state.loading = false;
      state.student = action.payload;
      state.error = "";
    },
    deleteStudentSuccess(state, action) {
      state.loading = false;
      state.students = state.students.filter(
        (student) => student._id !== action.payload.id
      );
      state.error = "";
    },
    studentLoadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getStudents.pending]: (state) => {
      state.loading = true;
    },
    [getStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.loading = false;
      state.error = "";
    },
    [getStudents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  studentLoadStart,
  createStudentSuccess,
  getStudentSuccess,
  updateStudentSuccess,
  deleteStudentSuccess,
  studentLoadFailure,
} = studentsSlice.actions;

//create student
export const createStudent = (studentDate) => async (dispatch) => {
  dispatch(studentLoadStart());
  try {
    const { data } = await axios.post(`${url}/students/create`, studentDate);
    dispatch(createStudentSuccess(data));
    dispatch(getStudents(data.data.grade));
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(studentLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};
//Get Student
export const getStudent = (id) => async (dispatch) => {
  dispatch(studentLoadStart());
  try {
    const { data } = await axios.get(`${url}/students/${id}`);
    dispatch(getStudentSuccess(data.data));
  } catch (error) {
    dispatch(studentLoadFailure(error.response.data.message));
  }
};

//Update Student
export const updateStudent = (id, data) => async (dispatch) => {
  dispatch(studentLoadStart());
  try {
    const res = await axios.put(`${url}/students/${id}`, data);
    dispatch(updateStudentSuccess(res.data));
    dispatch(getStudent(id));
    dispatch(getStudents(data.grade));
    toast.success(`${res.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(studentLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

//Delete Student
export const deleteStudent = (id, gradeNo) => async (dispatch) => {
  dispatch(studentLoadStart());
  try {
    const { data } = await axios.delete(`${url}/students/${id}`);
    dispatch(deleteStudentSuccess(data));
    dispatch(getStudents(gradeNo));
    toast.success(`${data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(studentLoadFailure(error.response.data.message));
    toast.error(`${error.response.data.message}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};
export default studentsSlice.reducer;
