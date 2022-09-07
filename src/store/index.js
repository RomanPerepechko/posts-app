import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    users: [],
    postList: [],
    currentPost: {}
  },
  mutations: {
    SET_POST_LIST(state, payload) {
      state.postList = payload.posts;
    },
    SET_CURR_POST(state, payload) {
      state.currentPost = payload.post;
    },
    ADD_POST(state, payload) {
      state.postList = [payload, ...state.postList]
    }
  },
  actions: {
    setPostList({ commit }, payload) {
      commit('SET_POST_LIST', { posts: payload });
    },
    setCurrPost({ commit }, payload) {
      commit('SET_CURR_POST', { post: payload });
    },
    addPost({commit}, payload) {
      commit('ADD_POST', payload)
    }
  },
  getters: {
    getPostList(state) {
      return state.postList;
    },
    getCurrPost(state) {
      return state.currentPost;
    }
  }
})

export default store