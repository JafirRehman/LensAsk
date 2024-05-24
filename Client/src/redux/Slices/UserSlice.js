import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Async thunk for login
export const loginThunk = createAsyncThunk('user/login', async (formdata, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

export const addtocartThunk = createAsyncThunk('user/addtocart', async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/customer/addtocart', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

//remove from cart 
export const removefromcartThunk = createAsyncThunk('user/removefromcart', async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/customer/removefromcart', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

//reduceQuantityThunk
export const reduceQuantityThunk = createAsyncThunk('user/reduceQuantity', async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/customer/reducequantity', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue('Something went wrong');
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: false,
    message: false,
    success: false,
    isLoading: false,
    addmessage: false,
    addsuccess: false,
    removesuccess: false,
    removemessage: false,
  },
  reducers: {
    updateuser: (state,action) => {
      state.user = action.payload;
    },
    userlogoutReducer: (state) => {
      state.user = false;
      state.success = false;
      state.message = false;
      state.addsuccess = false;
      state.addmessage = false;
      toast.success('Logged out successfully');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.user = action.payload.existeduser;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(addtocartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addtocartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addsuccess = action.payload.success;
        state.user = action.payload.existeduser;
        state.addmessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(addtocartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.addmessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(removefromcartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removefromcartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removesuccess = action.payload.success;
        state.user = action.payload.existeduser;
        state.removemessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(removefromcartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.removemessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(reduceQuantityThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reduceQuantityThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removesuccess = action.payload.success;
        state.user = action.payload.existeduser;
        state.removemessage = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(reduceQuantityThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.removemessage = action.payload;
        toast.error(action.payload);
      })
  },
});
export const { userlogoutReducer , updateuser } = userSlice.actions;
export default userSlice.reducer;