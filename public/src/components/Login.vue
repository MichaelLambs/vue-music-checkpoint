<template>
    <div class="login flexor2">
        <div class="flexor">
            <div class="login-holder">
                <div class="logo-section">
                        <i class="fas orange fa-5x fa-headphones"></i>
                    <h4>Sign in the Groovues</h4>
                </div>
                <div>
                    <form @submit.prevent="login()">
                        <div class="form-group">
                            <label>Username</label>
                            <input v-model="loginUser.username" class="form-control" type="text" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="loginUser.password" class="form-control" type="password" placeholder="Password">
                        </div>
                        <button class="btn btn-block btn-outline-success" type="submit">login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginUser: {}
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.loginUser)
                this.loginUser = {}
            },
        }
    }
</script>

<style scoped>
    .login {
        height: 100vh;
        background-color: #f9f9f9;
    }

    .flexor {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .login-holder{
        padding: 1.5rem;
        background-color: white;
        border: .1rem solid #e2e2e2;
        border-radius: 10px;
    }
    .flexor2{
        display: flex;
        justify-content: center;
    }
    .logo-section{
        margin-bottom: 3rem;
        text-align: center;
    }
    .orange{
        color: rgb(248, 167, 16);
    }
</style>