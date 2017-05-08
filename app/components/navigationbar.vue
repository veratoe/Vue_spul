<template>
        <div class="navigation_bar">

            <span class="title">OOLEWAPPER</span>
            <div v-if="logged_in">
                Welkom, <strong>{{ username }}</strong>
                <button style="float: right" @click="logout">Logout</button>
            </div>
            <div v-else>
                <label>username</label>
                <input v-model="username">
                <label>password</label>
                <input v-model="password">
                <button @click="login">login</button>
                <button style="float: right" @click="createUser">Nieuwe user</button>
            </div>
        </div>
</template>

<script>

    export default {
        name: 'NavigationBar',
        data: () => { return {
            username: null,
            password: null
        }},
        computed: {
            logged_in () {
                return this.$store.state.logged_in;
            }
        },
        methods: {
            createUser () {
                this.$store.dispatch('createUser', { username: this.username, password: this.password });
            },
            login() {
                this.$store.dispatch('login', { username: this.username, password: this.password });
            },
            logout() {
                this.$store.dispatch('logout');
            
            }
        }
    }

</script>

<style lang="less">


    .navigation_bar {

        .title {
            float: left;
            margin-right: 20px;
            color: #d44c4c;
            font-weight: bold;
            font-size: 18px;
        }

        input {
            padding: 4px;
            border: 0;
            outline: 0;

        }

        background-color: #222;
        padding: 10px;
    }
</style>


