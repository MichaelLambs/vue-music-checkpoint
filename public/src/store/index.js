import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'
import axios from 'axios'

import router from "../router/router";

var auth = axios.create({
  baseURL: '//localhost:3000/auth/',
  withCredentials: true
});

var serverAPI = axios.create({
  baseURL: '//localhost:3000/api/',
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
    addToFav(state, track){
      state.myTunes.push(track)
    },
    setMyTunes(state, payload){
      // var sorted = [] // this is where we run over the sorted information. the songs on the server do not change!
      // sort them then push to an empty array that 
      payload.sort(function (a, b) {
        return b.trackLike - a.trackLike;
    })
      state.myTunes = payload
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
      serverAPI.get('tracks')
        .then(res => {
          console.log('MY TUNES', res.data)
          commit('setMyTunes', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addFav({ commit, dispatch }, track) {
      serverAPI.post('tracks', track)
        .then(res => {
          commit('addToFav', res.data)
        })
        .catch(err => {
          console.log(err)
        })  
    },
    removeTrack({ commit, dispatch }, track) {
      serverAPI.delete('tracks/' + track._id)
        .then(res => {
          dispatch('getMyTunes')
        })
    },
    upvote({ commit, dispatch }, track) {
      track.trackLike++
      serverAPI.put('tracks/' + track._id, track)
        .then(res => {
          dispatch('getMyTunes', track)
        })
    },
    downvote({ commit, dispatch }, track) {
      track.trackLike--
      serverAPI.put('tracks/' + track._id, track)
        .then(res => {
          dispatch('getMyTunes', track)
        })
    },

    //region START AUTH ROUTES
    login({ commit, dispatch }, payload) {
      console.log("LOGIN USER DATA", payload)
      auth.post('login', payload)
        .then(res => {
          console.log("LOGIN USER DATA", res.data.user)
          commit('loginUser', res.data.user)
          router.push({ name: 'Home' })
          dispatch('getMyTunes') //ALLOWS FAV MUSIC TO POPULATE ON LOGIN
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
    //endregion END AUTH ACTIONS
    
  }
})
