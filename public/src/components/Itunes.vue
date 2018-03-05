<template>
    <div class="itunes">
        <div class="">
            <h1>iTunes Search</h1>
            <div class="flexor">
                <div v-for="track in tracks" class="search-result">
                    <img class="cover" :src="track.artworkUrl100" alt="" width="200" height="200">
                    <h3>{{track.artistName}}</h3>
                    <p><em>{{track.trackName}}</em></p>
                    <div class="preview-box">
                            <audio class="audio-box" controls="controls">
                              <source :src="track.previewUrl" />
                            </audio>
                          </div>
                    <button @click.prevent="addFav(track)" @click="addToPlay(track)">add to {{activPlay.name}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyTunes from './MyTunes'
    export default {
        name: 'iTunes',
        data() {
            return {

            }
        },
        methods: {
            addFav(track) {
                this.$store.dispatch('addFav', track)
            },
            addToPlay(track){
                this.$store.dispatch('addToPlaylist', track)
            }
        },
        computed: { // ALWAYS PUT RETURN ON COMPUTED!!!!!!!!!!!!! WASTE OF TIME!!!!!!!!!!!!
            tracks() {
                var updateImage = this.$store.state.results
                // UPDATE TO BETTER ART
                for (let i = 0; i < updateImage.length; i++) {
                    const songTrack = updateImage[i];
                    if(songTrack.artworkUrl100) {
                        var newArt = songTrack.artworkUrl100.replace('100x100bb', '500x500bb')
                        songTrack.artworkUrl100 = newArt
                    }
                }
                return this.$store.state.results
            },
            activPlay(){
                return this.$store.state.activePlaylist
            }
        }, // ALWAYS PUT RETURN ON COMPUTED!!!!!!!!!!!!! WASTE OF TIME!!!!!!!!!!!!

    }

</script>

<style scoped>
    .cover{
        object-fit: cover;
    }
    .flexor{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .search-result{
        width: 200px;
        margin: .5rem;
    }
</style>