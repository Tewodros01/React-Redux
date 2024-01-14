import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Post, Reactions } from "../../../../types/Post";
import { RootState } from "../../../../store/store";
import { sub } from "date-fns";
import axios from "axios";
import { POST_URL } from "../../../../constants/constants";

const postsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (post: Post) => post.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.date!.localeCompare(b.date!),
});

// Define the initial state
const initialState = postsAdapter.getInitialState({
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: undefined as string | undefined,
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Post) => {
    try {
      const response = await axios.post<Post>(POST_URL, initialPost);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${POST_URL}/${post.id}`, post);

      if (response.status !== 200) {
        throw new Error("Failed to update post");
      }

      return post;
    } catch (error: any) {
      console.error("Error updating post:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${POST_URL}/${postId}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete post");
      }

      return postId;
    } catch (error: any) {
      console.error("Error deleting post:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded: (
      state,
      action: PayloadAction<{ postId: number; reaction: keyof Reactions }>
    ) => {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];

      if (post && post.reactions) {
        post.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload
          ? action.payload.map((post) => {
              post.date = sub(new Date(), { minutes: min++ }).toISOString();
              post.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              } as Reactions;
              return post;
            })
          : [];
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        } as Reactions;
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.error("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        postsAdapter.updateOne(state, { id, changes: action.payload });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPost = action.payload as number;
        if (deletedPost) {
          console.error("Deleted could not complete");
          console.log(action.payload);
          return;
        }
        postsAdapter.removeOne(state, deletedPost);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const selectPostByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: number) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { reactionAdded } = postSlice.actions;

export default postSlice.reducer;
