import Vuex from 'vuex'

const url = "http://localhost:5000/api"

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedMemos: [],
      loadedTags: []
    },
    mutations: {
      setMemos(state, memos){
        state.loadedMemos = memos;
      },
      setTags(state, tags){
        state.loadedTags = tags;
      },
      addMemo(state, memo){
        state.loadedMemos.push(memo);
      },
      deleteMemo(state, id){
        const index = state.loadedMemos.findIndex((v) => v.id === id)
        state.loadedMemos.splice(index, 1)
      },
      addFavo(state, { id, favoriteCount }){
        const index = state.loadedMemos.findIndex((v) => v.id === id)
        const memo = state.loadedMemos[index]
        memo.favorite_count = favoriteCount
        memo.is_like = true
        state.loadedMemos.splice(index, 1, memo)
      },
      unFavo(state, { id, favoriteCount }){
        const index = state.loadedMemos.findIndex((v) => v.id === id)
        const memo = state.loadedMemos[index]
        memo.favorite_count = favoriteCount
        memo.is_like = false
        state.loadedMemos.splice(index, 1, memo)
      },
      // stateにサーバー側から返ってきたmemoをstateに入れる
      memoSet(state, memo) {
        state.memo = memo
      },
    },
    actions: {
      fetchMemos({ commit }){
        return this.$axios
        .get(`${url}/memos`)
        .then((res) => {
          commit('setMemos', res.data)
        })
        .catch((e) => console.log(e))
      },
      fetchTags({ commit }){
        return this.$axios
        .get(`${url}/tags`)
        .then((res) => {
          commit('setTags', res.data)
        })
        .catch((e) => console.log(e))
      },
      addMemo({ commit }, params){
        return this.$axios
        .post(`${url}/memos`, { memo: params })
        .then((res) => {
          commit('addMemo', res.data)
        })
        .catch((e) => console.log(e))
      },
      deleteMemo({ commit }, id){
        return this.$axios
        .delete(`${url}/memos/${id}`)
        .then((res) => {
          commit('deleteMemo', id)
        })
      },
      addFavo({ commit }, id){
        return this.$axios
        .post(`${url}/memos/${id}/favorites`)
        .then((res) => {
          commit('addFavo', { id, favoriteCount: res.data.favorite_count })
        })
      },
      unFavo({ commit }, id){
        return this.$axios
        .delete(`${url}/memos/${id}/favorites`)
        .then((res) => {
          commit('unFavo', { id, favoriteCount: res.data.favorite_count })
        })
      },
      fetchMemo({ commit }, id) {
        return this.$axios
        .$get(`${url}/memos/${id}`)
        .then((res) => {
          commit('memoSet', res)
        })
      },
    },
    getters: {
      loadedMemos(state){
        return state.loadedMemos;
      },
      loadedTags(state){
        return state.loadedTags;
      }
    }
  })
}

export default createStore
