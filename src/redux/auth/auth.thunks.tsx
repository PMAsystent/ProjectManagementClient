import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api";
import {loginUserType, registerUserType} from "../../core/types/requests/auth.types";

export const registerUser = createAsyncThunk('auth/registerUser',
  async (body: registerUserType, {rejectWithValue}) => {
    return await instance.post('/api/Auth/RegisterUser', body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data.title));
  });

export const loginUser = createAsyncThunk('auth/loginUser',
  async (body: loginUserType, {rejectWithValue}) => {
    return await instance.post('/api/Auth/loginUser', body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data.title));
  });
