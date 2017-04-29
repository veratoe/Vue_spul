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

<style lang="less">

        .message_input {
            width: 73%;
            position: absolute;
            bottom: 15px;

            textarea {
                border: 1px solid #ccc;
                padding: 20px;
                width: 95%;
                font-family: sans-serif;
                outline: 0;
                resize: none;
            }

            .submit {
                background-color: #bf6df3;
                position: absolute;
                top: 14px;
                right: 14px;
                padding: 16px;
                color: white;
                font-weight: bold;
                border-radius: 18px;
                cursor: pointer;

                &:hover {
                    background-color: #6d77f3;
                }
            }
        }
</style>
