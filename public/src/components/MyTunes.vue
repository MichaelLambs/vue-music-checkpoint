<template>
    <div class="my-tunes col-sm-3">
        <div class="">
            <h1>Favorite List</h1>
            <div class="flexor-col">
                <div v-for="myFav in myFavs" class="search-result">
                    <div class="flexor">
                        <div>
                            <img class="cover" :src="myFav.artworkUrl100" alt="" width="200" height="200">
                            <p>{{myFav.artistName}} | {{myFav.trackName}}
                                <i @click="remove(myFav)" class="pointer far fa-times-circle"></i>
                            </p>
                        </div>
                        <div class="arrows">
                            <div>
                                <i @click="upvote(myFav)" class=" pointer fas fa-caret-up"></i>
                            </div>
                            <div>
                                {{myFav.trackLike}}
                            </div>
                            <div>
                                <i @click="downvote(myFav)" class="pointer fas fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import iTunes from './Itunes.vue'
    export default {
        name: 'My-Tunes',
        data() {
            return {

            }
        },
        methods: {
            remove(track) {
                this.$store.dispatch('removeTrack', track)
            },
            upvote(track){
                this.$store.dispatch('upvote', track)
            },
            downvote(track){
                if(track.trackLike == 0){
                    return console.log('no negatives')
                }
                this.$store.dispatch('downvote', track)
            }
        },
        computed: {
            myFavs() {
                return this.$store.state.myTunes
            }
        }
    }

</script>

<style scoped>
    .flexor{
        display: flex;
    }
    .flexor-col{
        flex-direction: column;
    }
    .arrows{
        align-self: center;
        margin-left: 1rem;
    }
    .pointer{
        cursor: pointer;
    }
</style>