<template>
    <div class="my-tunes">
        <div class="">
            <div v-if="activePlay.name">
                <h3>Current Playlist: {{activePlay.name}}</h3>
            </div>
            <div v-else>
                <h3>Current Playlist: Pick From Dropdown</h3>
            </div>
            <div class="flexor spacing">
                <div class="create-playlist">
                    <form class="form-inline" @submit.prevent="createPlaylist()">
                        <input class="form-control" type="text" v-model="playlist.name" placeholder="Playlist Name">
                        <button class="btn btn-outline-light" type="submit">Create</button>
                    </form>
                </div>
                <div>
                    <div class="dropdown show dropleft">
                        <a class="dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="">
                                <i class="fas fa-user-circle"></i>
                            </span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <div v-for="userPlaylist in userPlaylists" class="dropdown-item flexor spacing">
                                <p @click.prevent="activePlaylist(userPlaylist)" class="pointer">{{userPlaylist.name}}</p>
                                <i @click="removePlaylist(userPlaylist)" class="pointer delete far fa-times-circle"></i>
                            </div>
                        </div>
                        <!-- <div class="dropdown show">
                        <a class="dropdown-toggle pointer" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <div v-for="userPlaylist in userPlaylists" class="dropdown-item flexor spacing">
                                <p @click.prevent="activePlaylist(userPlaylist)" class="pointer">{{userPlaylist.name}}</p>
                                <i @click="removePlaylist(userPlaylist)" class="pointer delete far fa-times-circle"></i>
                            </div>
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
            <playlist-songs></playlist-songs>
            <div class="flexor-col">
                <div v-for="myFav in myFavs" class="search-result">
                    <div class="flexor spacing">
                        <div>
                            <img class="cover" :src="myFav.artworkUrl100" alt="" width="200" height="200">
                            <p>{{myFav.artistName}} | {{myFav.trackName}}
                            </p>
                        </div>
                        <div class="flexor flexor-col">
                            <div class="deleter">
                                <i @click="remove(myFav)" class="pointer far fa-times-circle"></i>
                            </div>
                            <div class="arrows">
                                <div>
                                    <i @click="upvote(myFav)" class=" pointer fa-2x fas fa-caret-up"></i>
                                </div>
                                <div>
                                    <h4>
                                        <b>{{myFav.trackLike}}</b>
                                    </h4>
                                </div>
                                <div>
                                    <i @click="downvote(myFav)" class="pointer fas fa-2x fa-caret-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PlaylistSongs from './PlaylistSongs.vue'
    import iTunes from './Itunes.vue'
    export default {
        name: 'My-Tunes',
        data() {
            return {
                playlist: {
                    name: ''
                }
            }
        },
        methods: {
            activePlaylist(userPlaylist) {
                this.$store.commit('setActivePlaylist', userPlaylist)
            },
            remove(track) {
                this.$store.dispatch('removeTrack', track)
            },
            upvote(track) {
                this.$store.dispatch('upvote', track)
            },
            downvote(track) {
                if (track.trackLike == 0) {
                    return console.log('no negatives')
                }
                this.$store.dispatch('downvote', track)
            },
            createPlaylist(playlist) {
                this.$store.dispatch('createPlaylist', this.playlist)
                playlist = {}
            },
            removePlaylist(playlist) {
                this.$store.dispatch('removePlaylist', playlist)
            }
        },
        computed: {
            myFavs() {
                return this.$store.state.myTunes
            },
            user() {
                return this.$store.state.user
            },
            userPlaylists() {
                return this.$store.state.myPlaylists
            },
            activePlaylistSongs() {
                return this.$store.state.activePlaylist.songs
            },
            activePlay() {
                return this.$store.state.activePlaylist
            }
        },
        components: {
            PlaylistSongs
        }
    }

</script>

<style scoped>
    .flexor {
        display: flex;
    }

    .flexor-col {
        flex-direction: column;
    }

    .arrows {
        justify-content: center;
        text-align: center;
    }

    .pointer {
        cursor: pointer;
    }

    .spacing {
        justify-content: space-between;
    }

    .deleter {
        align-self: flex-start
    }

    .delete {
        font-size: .7rem;
        align-self: center;
    }

    .dropdown-item {
        padding: .25rem .75rem;
        min-width: 8rem;
    }

    .dropdown-item p {
        margin-bottom: 0;
    }
</style>