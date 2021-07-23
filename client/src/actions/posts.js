import {
  getPosts,
  getProfile,
  getPost,
  createPost,
  deletePost,
  createComment,
  deleteComment,
  castVote,
  apiJoinPost,
  apiLeavePost,
  apiConvertProject,
  apiSearch
} from '../util/api';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

const fetchPostsRequest = { type: FETCH_POSTS_REQUEST };
const fetchPostsSuccess = posts => ({ type: FETCH_POSTS_SUCCESS, posts });
const fetchPostsError = error => ({ type: FETCH_POSTS_ERROR, error });

export const fetchPosts = (category = '') => async dispatch => {
  dispatch(fetchPostsRequest);
  try {
    const posts = await getPosts(category);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

export const fetchProfile = username => async dispatch => {
  dispatch(fetchPostsRequest);
  try {
    const posts = await getProfile(username);
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';

const fetchPostRequest = { type: FETCH_POST_REQUEST };
const fetchPostSuccess = post => ({ type: FETCH_POST_SUCCESS, post });
const fetchPostError = error => ({ type: FETCH_POST_ERROR, error });

export const fetchPost = id => async dispatch => {
  dispatch(fetchPostRequest);
  try {
    const post = await getPost(id);
    dispatch(fetchPostSuccess(post));
  } catch (error) {
    dispatch(fetchPostError(error));
  }
};

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

const createPostRequest = { type: CREATE_POST_REQUEST };
const createPostSuccess = post => ({ type: CREATE_POST_SUCCESS, post });
const createPostError = error => ({ type: CREATE_POST_ERROR, error });

export const attemptCreatePost = post => async (dispatch, getState) => {
  dispatch(createPostRequest);
  try {
    const { token } = getState().auth;
    const newPost = await createPost(post, token);
    dispatch(createPostSuccess(newPost));
  } catch (error) {
    dispatch(createPostError(error));
  }
};

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

const deletePostRequest = { type: DELETE_POST_REQUEST };
const deletePostSuccess = post => ({ type: DELETE_POST_SUCCESS, post });
const deletePostError = error => ({ type: DELETE_POST_ERROR, error });

export const attemptDeletePost = () => async (dispatch, getState) => {
  dispatch(deletePostRequest);
  try {
    const { id } = getState().posts.post;
    const { token } = getState().auth;
    await deletePost(id, token);
    dispatch(deletePostSuccess(id));
  } catch (error) {
    dispatch(deletePostError(error));
  }
};

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

const createCommentRequest = { type: CREATE_COMMENT_REQUEST };
const createCommentSuccess = post => ({ type: CREATE_COMMENT_SUCCESS, post });
const createCommentError = error => ({ type: CREATE_COMMENT_ERROR, error });

export const attemptCreateComment = comment => async (dispatch, getState) => {
  dispatch(createCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const json = await createComment(post, comment, token);
    dispatch(createCommentSuccess(json));
  } catch (error) {
    dispatch(createCommentError(error));
  }
};

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

const deleteCommentRequest = { type: DELETE_COMMENT_REQUEST };
const deleteCommentSuccess = post => ({ type: DELETE_COMMENT_SUCCESS, post });
const deleteCommentError = error => ({ type: DELETE_COMMENT_ERROR, error });

export const attemptDeleteComment = comment => async (dispatch, getState) => {
  dispatch(deleteCommentRequest);
  try {
    const { id: post } = getState().posts.post;
    const { token } = getState().auth;
    const json = await deleteComment(post, comment, token);
    dispatch(deleteCommentSuccess(json));
  } catch (error) {
    dispatch(deleteCommentError(error));
  }
};

export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_ERROR = 'VOTE_ERROR';

const voteRequest = { type: VOTE_REQUEST };
const voteSuccess = post => ({ type: VOTE_SUCCESS, post });
const voteError = error => ({ type: VOTE_ERROR, error });

export const attemptVote = (id, vote) => async (dispatch, getState) => {
  dispatch(voteRequest);
  try {
    const { token } = getState().auth;
    const post = await castVote(id, vote, token);
    dispatch(voteSuccess(post));
  } catch (error) {
    dispatch(voteError(error));
  }
};

export const JOIN_REQUEST = 'JOIN_POST_REQUEST';
export const JOIN_SUCCESS = 'JOIN_POST_SUCCESS';
export const JOIN_ERROR = 'JOIN_POST_ERROR';

const joinRequest = { type: JOIN_REQUEST };
const joinSuccess = post => ({ type: JOIN_SUCCESS, post })
const joinError = error => ({ type: JOIN_ERROR, error });

export const joinPost = id => async (dispatch, getState) => {
  dispatch(joinRequest);
  try {
    const { token } = getState().auth;
    const post = await apiJoinPost(id, token);
    dispatch(joinSuccess(post));
  } catch (error) {
    dispatch(joinError(error));
  }
}

export const LEAVE_REQUEST = 'LEAVE_POST_REQUEST';
export const LEAVE_SUCCESS = 'LEAVE_POST_SUCCESS';
export const LEAVE_ERROR = 'LEAVE_POST_ERROR';

const leaveRequest = { type: LEAVE_REQUEST };
const leaveSuccess = post => ({ type: LEAVE_SUCCESS, post });
const leaveError = error => ({ type: LEAVE_ERROR, error });

export const leavePost = id => async (dispatch, getState) => {
  dispatch(leaveRequest)
  try {
    const { token } = getState().auth;
    const post = await apiLeavePost(id, token)
    dispatch(leaveSuccess(post))
  } catch (error) {
    dispatch(leaveError(error))
  }
}

export const CONVERT_REQUEST = 'CONVERT_REQUEST';
export const CONVERT_SUCCESS = 'CONVERT_SUCCESS';
export const CONVERT_ERROR = 'CONVERT_ERROR';

const convertRequest = { type : CONVERT_REQUEST };
const convertSuccess = post => ({ type: CONVERT_SUCCESS, post });
const convertError = error => ({ type: CONVERT_ERROR, error });

export const convertToProject = (id, targetType) => async (dispatch, getState) => {
  dispatch(convertRequest)
  try {
    const { token } = getState().auth;
    const post = await apiConvertProject(id, targetType, token)
    dispatch(convertSuccess(post))
  } catch (error) {
    dispatch(convertError(error))
  }
}

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const searchRequest = { type: SEARCH_REQUEST };
const searchSuccess = posts => ({ type: SEARCH_SUCCESS, posts });
const searchError = error => ({ type: SEARCH_ERROR, error });

export const search = (query) => async (dispatch) => {
  dispatch(searchRequest)
  try {
    const posts = await apiSearch(query);
    dispatch(searchSuccess(posts));
  } catch (error) {
    dispatch(searchError(error));
  }
}

export const SEARCH_RESET = 'SEARCH_RESET';

const searchReset = { type: SEARCH_RESET };

export const resetSearch = () => (dispatch) => {
  dispatch(searchReset);
}