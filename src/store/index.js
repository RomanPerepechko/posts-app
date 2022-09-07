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
    },
    SET_USERS(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    setPostList({ commit }, payload) {
      commit('SET_POST_LIST', { posts: payload });
    },
    setCurrPost({ commit }, payload) {
      commit('SET_CURR_POST', { post: payload });
    },
    addPost({ commit }, payload) {
      commit('ADD_POST', payload);
    },
    setUsers({ commit }, payload) {
      commit('SET_USERS', payload);
    }
  },
  getters: {
    getPostList(state) {
      return state.postList;
    },
    getCurrPost(state) {
      return state.currentPost;
    },
    getUsers(state) {
      return state.users;
    }
  }
})

export default store