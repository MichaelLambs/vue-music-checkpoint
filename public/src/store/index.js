import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'

import router from "../router/router";

var auth = axios.create({
  baseURL: '//localhost:3000/auth/',
  withCredentials: true
});

var musicAPI = axios.create({
  baseURL: '//bcw-getter.herokuapp.com/?url=',
})

vue.use(vuex)

export default new vuex.Store({
  state: {
    myTunes: [],
    results: [],
    user: {},
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },

    // START AUTH MUTATIONS
    loginUser(state, payload) {
      state.user = payload
    },
    clearData(state, payload){
      state.myTunes = [];
      state.user = {}
    }
  },
  actions: {

    getMusicByArtist({ commit, dispatch }, artist) {
      musicAPI.get('https://itunes.apple.com/search?term=' + artist)
        .then(res => {
          commit('setResults', res.data.results)
        })
        .catch(err=> {
          console.log(err)
        })
    },
    getMyTunes({ commit, dispatch }) {
      //this should send a get request to your server to return the list of saved tunes
    },
    addToMyTunes({ commit, dispatch }, track) {
      //this will post to your server adding a new track to your tunes
    },
    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    },

    // START AUTH ROUTES
    login({ commit, dispatch }, payload) {
      console.log("LOGIN USER DATA", payload)
      auth.post('login', payload)
        .then(res => {
          console.log("LOGIN USER DATA", res.data.user)
          commit('loginUser', res.data.user)
          router.push({ name: 'Home' })
          // dispatch('getFavMusic') //ALLOWS FAV MUSIC TO POPULATE ON LOGIN
        })
        .catch(err => {
          console.log('INVALID USERNAME OR PASSWORD')
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          console.log("LOGIN USER DATA", res.data)
          commit('loginUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signup({commit,dispatch}, payload) {
      auth.post('register', payload)
        .then(res => {
          console.log(res.data.user)
          commit('loginUser', res.data.user)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout({commit, dispatch}) {
      auth.delete('logout')
      .then(res => {
        commit('loginUser', {})
        commit('clearData', res)
      })
    }
    // END AUTH ACTIONS
    
  }
})
