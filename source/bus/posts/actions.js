// Types
import { FILL_POSTS, FETCH_POSTS_ASYNC, CREATE_POST_ASYNC } from './types';

// Instruments
import { api } from '../../REST';

export const fillPosts = (posts) => {
    return {
        type:    FILL_POSTS,
        payload: posts,
    };
};

export const fetchPostsAsync = () => async (dispatch) => {
    dispatch({
        type: FETCH_POSTS_ASYNC,
    });

    const response = await api.posts.fetch();
    const result = await response.json();

    dispatch(fillPosts(result.data));
};

export const createPostAsync = (comment) => async (dispatch) => {
    const response = await api.posts.create(comment);
    // ?спросить про лучший способ отлова ошибок

    if (response.status === 200) {
        const result = await response.json();

        dispatch({
            type:    CREATE_POST_ASYNC,
            payload: result.data,
        });
    }
};
