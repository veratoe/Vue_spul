<template>
        <div class="navigation_bar">
            <label>username</label>
            <input v-model="username">
            <label>password</label>
            <input v-model="password">
            <button @click="createUser">create</button>
            <button @click="login">login</button>
        </div>
</template>

<script>

    export default {
        name: 'NavigationBar',
        data: () => { return {
            username: null,
            password: null
        }},
/*
        computed: {
            username: {
                get () {
                    return this.$store.state.username;
                },
                set (value) {
                   this.$store.dispatch('updateUsername', value); 
                }
            },
            password: {
                get () {
                    return this.$store.state.password;
                },
                set (value) {
                   this.$store.dispatch('updatePassword', value); 
                }
            }
        },
*/
        methods: {
            createUser () {
                this.$store.dispatch('createUser', { username: this.username, password: this.password });
            },
            login() {
                this.$store.dispatch('login', { username: this.username, password: this.password });
            }
        }
    }

</script>

<style lang="less">

    .navigation_bar {
        background-color: #222;
        padding: 10px;
    }
</style>


