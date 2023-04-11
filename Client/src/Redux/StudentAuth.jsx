import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { url } from "./Api";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("student_token"),
  name: "",
  studentNo: "",
  grade: "",
  gender: "",
  academicyear: "",
  marks: "",
  _id: "",
  loginStatus: "",
  loginError: "",
  studentLoaded: false,
};

export const loginStudent = createAsyncThunk(
  "authstudent/login",
  async (student, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/auth/students/login`, {
        name: student.name,
        studentNo: student.studentNo,
      });
      localStorage.setItem("student_token", data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const loginStudentSlice = createSlice({
  name: "authstudent",
  initialState,
  reducers: {
    loadStudent(state, action) {
      const token = state.token;
      if (token) {
        const student = jwtDecode(token);
        return {
          ...state,
          token,
          name: student.name,
          studentNo: student.studentNo,
          grade: student.grade,
          gender: student.gender,
          academicyear: student.academicyear,
          marks: student.marks,
          _id: student._id,
          studentLoaded: true,
        };
      }
    },
    logoutStudent(state, action) {
      localStorage.removeItem("student_token");
      return {
        ...state,
        token: "",
        name: "",
        studentNo: "",
        grade: "",
        gender: "",
        academicyear: "",
        marks: "",
        _id: "",
        loginStatus: "",
        loginError: "",
        studentLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginStudent.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginStudent.fulfilled, (state, action) => {
      if (action.payload) {
        const student = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: student.name,
          studentNo: student.studentNo,
          grade: student.grade,
          gender: student.gender,
          academicyear: student.academicyear,
          marks: student.marks,
          _id: student._id,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginStudent.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadStudent, logoutStudent } = loginStudentSlice.actions;

export default loginStudentSlice.reducer;
