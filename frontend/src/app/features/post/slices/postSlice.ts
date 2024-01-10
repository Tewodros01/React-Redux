import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { RootState } from "../../../../store/store";
import { POST_URL } from "../../../../constants/constants";
import { Post, Reactions } from "../../../../types/Post";

interface PostState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get<Post[]>(POST_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
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

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (initialPost: Post) => {
    try {
      const respons = await axios.put(
        `${POST_URL}/${initialPost.id}`,
        initialPost
      );
      return respons.data;
    } catch (error) {
      return error;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: number) => {
    try {
      const respons = await axios.delete(`${POST_URL}/${initialPost}`);
      if (respons.status === 200) return initialPost;
      return `${respons.status}: ${respons.statusText}`;
    } catch (error) {
      return error;
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId?: number) {
        const timestamp = new Date().getTime();
        return {
          payload: {
            id: timestamp,
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            } as Reactions,
          },
        };
      },
    },
    postDeleted(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: number; reaction: keyof Reactions }>
    ) {
      const { postId, reaction } = action.payload;
      const post = state.posts.find((p) => p.id === postId);

      if (post && post.reactions) {
        post.reactions[reaction]++;
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPost = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          } as Reactions;
          return post;
        });
        state.posts = state.posts.concat(loadedPost);
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
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Updat could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date == new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletePost = action.payload as Post;
        if (deletePost.id) {
          console.log("Deleted Could not complet");
          console.log(action.payload);
          return;
        }
        const { id } = deletePost;
        const posts = state.posts.filter((post) => post.id === id);
        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const selectPostById = (state: RootState, postId: number) => {
  console.log("Root State", state);
  return state.posts.posts.find((post) => post.id === postId);
};

export const { postAdded, reactionAdded, postDeleted, postUpdated } =
  postSlice.actions;

export default postSlice.reducer;
