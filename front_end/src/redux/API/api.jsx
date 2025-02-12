import {createSlice, createAsyncThunk,} from '@reduxjs/toolkit'

// BASE_URL OF OVER API
const USER_API_URL = "http://192.168.100.204:8080/api/flat/user";
// API AREA
export const SignUp_API = createAsyncThunk('auth/SignUp', async({name,email,password,passwordConfirm}, thunkAPI)=>{
    try{
        const res = await fetch(`${USER_API_URL}/signup`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                passwordConfirm
            }),
            credentials: 'include'
        });
        const res_data = await res.json()
        if(res.ok){
            console.log(res_data)
        }else{
            return thunkAPI.rejectWithValue(res_data.message || "SignUp failed");
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})
export const OTP_verify_API = createAsyncThunk('auth/OTP_verify_API',async({otp}, thunkAPI)=>{
    try{
        const res = await fetch(`${USER_API_URL}/verify-otp`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                otp
            }),
            credentials: 'include'
        })
        const res_result = await res.json()
        if(res.ok){
            console.log(res_result)
        }else{
            return thunkAPI.rejectWithValue(res_result.message || "OTP has expired");
        } 
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

// Login API 
export const Login_API = createAsyncThunk('auth/Login_API',async({email,password}, thunkAPI)=>{
    try{
        const res = await fetch(`${USER_API_URL}/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include'
        })
        const res_result = await res.json()
        if(res.ok){
            console.log(res_result)
            const role = res_result.data?.current_user?.role;
            const {token} = res_result;
            if(token){
                localStorage.setItem('token', token);
                return {token, role};
              }else {
                return thunkAPI.rejectWithValue('Invalid response structure');
            }
        }else{
            return thunkAPI.rejectWithValue(res_result.message || "Login failed");
        } 
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

const initialState = {
    user: null,
    token: localStorage.getItem('token')|| null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    isError: false,
    errorMessage: null,
    currentUser: null,
    role: null,
}
const API_Handel_Slice = createSlice({
    name : "auth",
    initialState ,
    reducers : {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.role = null;
            localStorage.removeItem('token');
          },
    },
    extraReducers : (builder) =>{
        builder
        //SignUp_API
        .addCase(SignUp_API.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
          .addCase(SignUp_API.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
          })
          .addCase(SignUp_API.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'Registration failed';
        })
        // OTP_verify_API
        .addCase(OTP_verify_API.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
          .addCase(OTP_verify_API.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
          })
          .addCase(OTP_verify_API.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'OTP Verify  failed';
        })
        //Login_API
        .addCase(Login_API.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
          .addCase(Login_API.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
          })
          .addCase(Login_API.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'Login Failed';
        })
    }
})
export default API_Handel_Slice.reducer;