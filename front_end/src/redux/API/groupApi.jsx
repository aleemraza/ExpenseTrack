import {createSlice, createAsyncThunk,} from '@reduxjs/toolkit'

// BASE_URL OF OVER API
const USER_API_URL = "http://192.168.100.204:8080/api/flat/group";

export const Create_Group_Api = createAsyncThunk('group/create_group', async({Groupname,totalBudget}, thunkAPI)=>{
    console.log(Groupname,totalBudget)
    try{
        const token = localStorage.getItem('token')
        const res = await fetch(`${USER_API_URL}/create_group`,{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               Groupname,
               totalBudget
            }),
            credentials: 'include'
        });
        const res_data = await res.json()
        console.log(res_data)
        if(res.ok){
            console.log(res_data)
        }else{
            return thunkAPI.rejectWithValue(res_data.message || "Create Group  failed");
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const View_Group_Api = createAsyncThunk('group/View_Group_Api', async( thunkAPI)=>{
    try{
        const token = localStorage.getItem('token')
        const res = await fetch(`${USER_API_URL}/view_all_groups`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const res_data = await res.json()
        if(res.ok){
            return res_data;
        }else{
            return thunkAPI.rejectWithValue(res_data.message || "SHOW ALL  Group  failed");
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const find_Group_Api = createAsyncThunk('group/find_Group_Api', async(thunkAPI)=>{
    try{
        const token = localStorage.getItem('token')
        const res = await fetch(`${USER_API_URL}/find_group_id`,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const res_data = await res.json()
        if(res.ok){
            return res_data;
        }else{
            return thunkAPI.rejectWithValue(res_data.message || "Group  failed");
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
const Group_API_Handel_Slice = createSlice({
    name : "group",
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
        //Create_Group_Api
        .addCase(Create_Group_Api.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
        .addCase(Create_Group_Api.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated= true;
          })
        .addCase(Create_Group_Api.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'Create Group failed';
        })

        .addCase(View_Group_Api.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
          })
        .addCase(View_Group_Api.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated= true;
          })

        .addCase(View_Group_Api.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'View All  Group failed';
        }) 


        .addCase(find_Group_Api.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        })
        .addCase(find_Group_Api.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isAuthenticated= true;
          })
        .addCase(find_Group_Api.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || 'View All  Group failed';
        }) 


    }
})
export default Group_API_Handel_Slice.reducer;