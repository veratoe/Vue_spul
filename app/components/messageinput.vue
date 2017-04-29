<template>

    <div class="message_input">
        <textarea v-model="text" @keyup.enter="sendMessage"></textarea>
        <div class="submit" @click="sendMessage">Stuur</div>
    </div>

</template>

<script>

    export default {
        name: "MessageInput",
        data: () => { 
            return {
                text: null,
            }
        },

        methods: {
            sendMessage () {
                this.$store.dispatch('sendMessage', this.text); 
                this.text = null
            }
        },
        created () {
        }
    }

</script>

