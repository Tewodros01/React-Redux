// Import necessary modules and types
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../../store/store";
import { User } from "../../../../types/user";
import { USER_URL } from "../../../../constants/constants";

// Define the state interface
interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

// Create an async thunk for fetching users
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    try {
      // Fetch user data from the API
      const response = await axios.get(USER_URL);
      // Return the user data
      return response.data as User[];
    } catch (error) {
      // Handle errors by throwing them
      throw error;
    }
  }
);

// Create a user slice with reducers and extra reducers
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.status = "succeeded";
        state.error = null;
      });
  },
});

// Export a selector to retrieve all users from the state
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);

export default userSlice.reducer;
