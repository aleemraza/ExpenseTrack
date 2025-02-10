import {createSlice, createAsyncThunk,} from '@reduxjs/toolkit'

// BASE_URL OF OVER API
const USER_API_URL = "http://localhost:8080/api/flat/user";
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
            return thunkAPI.rejectWithValue(res_data.error)
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
            return thunkAPI.rejectWithValue(res_data.error)
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
    }
})

export default API_Handel_Slice.reducer;