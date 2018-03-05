<template>
    <div>
        <div class="list-group">
            <div v-for="playlistSong in activePlaylistSongs" class="list-group-item">
                <div>
                    <div class="flexor">
                    <p >{{playlistSong.trackName}} -<em>{{playlistSong.artistName}}</em></p>
                    </div>
                    <div class="preview-box">
                        <audio class="audio-box" controls="controls">
                            <source :src="playlistSong.previewUrl" />
                        </audio>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router/router.js'
    import Home from './Home.vue'
    export default {
        name: 'PlaylistSongs',
        data() {
            return {

            }
        },
        computed: {
            activePlaylistSongs() {
                return this.$store.state.activePlaylist.songs
            },
        }
    }

</script>

<style scoped>
</style>