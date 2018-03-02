<template>
    <div class="login flexor2">
        <div class="flexor">
            <div class="login-holder">
                <div class="logo-section">
                    <i class="fas orange fa-5x fa-headphones"></i>
                    <h4>Signup for Groovues</h4>
                </div>
                <div>
                    <form @submit.prevent="createSignup()">
                        <div class="form-group">
                            <label>Username</label>
                            <input v-model="signupUser.username" class="form-control" type="text" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="signupUser.email" class="form-control" type="text" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="signupUser.password" class="form-control" type="password" placeholder="Password" required>
                        </div>
                        <button class="btn btn-block btn-outline-success" type="submit">signup</button>
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
                signupUser: {}
            }
        },
        methods: {
            createSignup() {
                this.$store.dispatch('signup', this.signupUser)
                this.signupUser = {}
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

    .login-holder {
        padding: 1.5rem;
        background-color: white;
        border: .1rem solid #e2e2e2;
        border-radius: 10px;
    }

    .flexor2 {
        display: flex;
        justify-content: center;
    }

    .logo-section {
        margin-bottom: 3rem;
        text-align: center;
    }

    .orange {
        color: rgb(248, 167, 16);
    }
</style>