<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <nav class="navbar navbar-dark bg-dark">
      <div>
        <h3 class="title">
          <i class="fas fa-headphones"></i> Groo<em><u>vues</u></em>
        </h3>
      </div>
      <div v-if="!loginUser._id">
        <p>
          <router-link :to="{name: 'Login'}">login</router-link> or
          <router-link :to="{name: 'Signup'}">signup</router-link>
        </p>
      </div>
      <div v-else>
        <div class="dropdown show">
          <a class="dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="orange">
              <i class="fas fa-user-circle"></i> {{loginUser.username}}</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item pointer" @click.prevent="logout">logout?</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="search-section flexor">
      <div class="heading">
        <h1>Make a playlist and listen to your favorite artist on the go!</h1>
        <p>Dont forget to signup and recieve the latest on the industry.</p>
      </div>
      <div class="search-box">
        <form class="form-inline" @submit.prevent="search">
          <input class="form-control" type="text" v-model="artist" placeholder="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
    <div class="container-fluid">
      <div v-if="myFavs.length > 0" class="row">
        <itunes class="itunes col-sm-8"></itunes>
        <my-tunes class="my-tunes col-sm-4"></my-tunes>
      </div>
      <div v-else class="row">
        <itunes class="itunes col-sm-12"></itunes>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router/router.js'
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'Home',
    data() {
      return {
        artist: ''
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      search() {
        this.$store.dispatch('getMusicByArtist', this.artist)
        this.artist = ''
      }
    },
    components: {
      Itunes,
      MyTunes
    },
    computed: {
      loginUser() {
        return this.$store.state.user
      },
      myFavs() {
        return this.$store.state.myTunes
      }
    }
  }
</script>


<style scoped>
  .my-tunes {
    background: rgb(79, 148, 79);
  }

  .search-section {
    height: 60vh;
    background-image: url('../assets/bg.jpg');
    /* background-position: center; */
    background-size: cover;
    background-attachment: fixed;
    color: white;
  }

  .flexor {
    display: flex;
    justify-content: center;
    align-items: center
  }

  .search-box {
    /* align-self: flex-end; */
    /* padding-bottom: 1rem; */
  }

  .itunes {
    background: rgb(190, 190, 190);
  }

  .heading {
    flex-basis: 60%;
  }

  .pointer {
    cursor: pointer;
  }

  nav p {
    margin-bottom: 0;
  }

  .orange {
    color: #f99b53;
  }

  .orange:hover {
    color: #db8a4c;
  }

  .title {
    color: #f99b53;
    margin-bottom: 0;
  }

  .dropdown-menu {
    min-width: 0;
    padding: .1rem 0;
  }

  .dropdown-toggle::after {
    color: #f99b53;
  }
</style>