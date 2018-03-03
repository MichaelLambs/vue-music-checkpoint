<template>
    <div class="my-tunes">
        <div class="">
            <h1>Favorite List</h1>
            <div class="flexor-col">
                <div v-for="myFav in myFavs" class="search-result">
                    <div class="flexor spacing">
                        <div >
                            <img class="cover" :src="myFav.artworkUrl100" alt="" width="200" height="200">
                            <p>{{myFav.artistName}} | {{myFav.trackName}}
                            </p>
                        </div>
                        <div class="flexor flexor-col">
                            <div class="deleter"><i @click="remove(myFav)" class="pointer far fa-times-circle"></i></div>
                            <div class="arrows">
                                <div>
                                    <i @click="upvote(myFav)" class=" pointer fa-2x fas fa-caret-up"></i>
                                </div>
                                <div>
                                    <h4><b>{{myFav.trackLike}}</b></h4>
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
        mounted(){
            // this.$store.dispatch('getMyTunes')
        },
        computed: {
            myFavs() {
                return this.$store.state.myTunes
            },
            user() {
                return this.$store.state.user
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
        justify-content: center;
        text-align: center;
    }
    .pointer{
        cursor: pointer;
    }
    .spacing {
        justify-content: space-between;
    }
    .deleter{
        align-self: flex-start
    }
</style>