import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../api";
export const name = "view";

// easier to keep strings consistent
export const LoadingStatus = {
  idle: "idle",
  pending: "pending",
  succeeded: "succeeded",
  failed: "failed",
};

const initialState = {
  commentsModalOpen: false,
  comments: [],
  commentsStatus: LoadingStatus.idle,
  error: null,
};

//thunk for API to make it easy to handle lifecycle of request
export const fetchComments = createAsyncThunk("fetchComments", api.getComments);

const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openCommentsModal(state) {
      state.commentsModalOpen = true;
    },
    closeCommentsModal(state) {
      state.commentsModalOpen = false;
    },
    addComment(state, { payload }) {
      state.comments.unshift(api.addComment(payload));
    },
  },
  extraReducers: {
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.comments = payload;
      state.commentsStatus = LoadingStatus.succeeded;
    },
    [fetchComments.rejected]: (state, { error }) => {
      state.error = error.message;
      state.commentsStatus = LoadingStatus.failed;
    },
    [fetchComments.pending]: (state) => {
      state.commentsStatus = LoadingStatus.pending;
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getViewCommentsModalOpen = createSelector(
  getSlice,
  (slice) => slice.commentsModalOpen
);

//these dont need to be memoized since they are simple selectors
export const getCommentsStatus = (state) => state[name].commentsStatus;
export const getError = (state) => state[name].error;
export const getComments = (state) => state[name].comments;

/*
  Memoize so we dont have to compute all N comments for the top 3 every render. 
  Only when comments array changes.
 */
export const getTopCommentors = createSelector(getComments, (comments) => {
  let occurenceMap = comments.reduce((prevVal, currentval) => {
    prevVal[currentval.name]
      ? prevVal[currentval.name]++
      : (prevVal[currentval.name] = 1);
    return prevVal;
  }, {});
  let topCommentors = Object.entries(occurenceMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return topCommentors;
});

export const {
  openCommentsModal,
  closeCommentsModal,
  createComment,
  addComment,
} = viewSlice.actions;
export default viewSlice.reducer;
