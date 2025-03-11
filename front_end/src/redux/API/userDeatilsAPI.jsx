import {createSlice, createAsyncThunk,} from '@reduxjs/toolkit'

const USER_API_URL = "http://192.168.100.204:8080/api/flat/userDeatils";



export const All_User_Group_Status_Api = createAsyncThunk('userDeatils/AllUsersWithGroupStatus', async({groupId,email}, thunkAPI)=>{
    try{
        const token = localStorage.getItem('token')
        const queryParams = new URLSearchParams();
        if (groupId) queryParams.append('groupId', groupId);
        if (email) queryParams.append('email', email);
        const res = await fetch(`${USER_API_URL}/AllUsersWithGroupStatus?${queryParams.toString()}`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const res_data = await res.json()
        if(res.ok){
            return res_data ;
        }else{
            return thunkAPI.rejectWithValue(res_data.message || "failed");
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
const UserDeatils_API_Handel_Slice = createSlice({
    name : "userDeatils",
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
        .addCase(All_User_Group_Status_Api.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
        .addCase(All_User_Group_Status_Api.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated= true;
          })
        .addCase(All_User_Group_Status_Api.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'Failed';
        })
    }
})
export default UserDeatils_API_Handel_Slice.reducer;