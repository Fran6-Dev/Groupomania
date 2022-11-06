import { ADD_POST, DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case ADD_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        picture: action.payload.picture,
                    }
                }
                return post;
            })
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers]
                    }
                }
                return post;
            })
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    }
                }
                return post;
            })
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message,
                        picture: action.payload.picture,
                    }
                } else return post;
            })
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);

        default:
            return state;
    }
}