import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'Load',
  },
  tags: {
    items: [],
    status: 'Load',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'Loading';
      state.posts.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'Loaded';
      state.posts.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.posts.status = 'Error';
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'Loading';
      state.tags.items = [];
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'Loaded';
      state.tags.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.tags.status = 'Error';
      state.tags.items = [];
    },
  },
});
export const postsReducer = postsSlice.reducer;
