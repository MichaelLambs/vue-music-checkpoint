<template>
    <div class="itunes col-sm-9">
        <div class="">
            <h1>iTunes Search</h1>
            <div class="flexor">
                <div v-for="track in tracks" class="search-result">
                    <img class="cover" :src="track.artworkUrl100" alt="" width="200" height="200">
                    <h3>{{track.artistName}}</h3>
                    <p><em>{{track.trackName}}</em></p>
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
        computed: { // ALWAYS PUT RETURN ON COMPUTED!!!!!!!!!!!!! WASTE OF TIME!!!!!!!!!!!!
            tracks() {
                var updateImage = this.$store.state.results
                // UPDATE TO BETTER ART
                for (let i = 0; i < updateImage.length; i++) {
                    const songTrack = updateImage[i];
                    if(songTrack.artworkUrl100) {
                        var newArt = songTrack.artworkUrl100.replace('100x100bb', '500x500bb')
                        songTrack.artworkUrl100 = newArt
                        // console.log(newArt)
                    }
                }

                console.log(this.$store.state.results)
                return this.$store.state.results
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