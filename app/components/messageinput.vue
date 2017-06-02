<template>

    <div class="message_input">
        <textarea id="text" v-model="text" @keydown="keydown" maxlength="140"></textarea>
        <div v-show="!timeout" class="submit" @click="sendMessage">Stuur</div>
        <div class="characters"> {{ charactersLeft }} / 140 </div>
        <div v-show="timeout" class="timeout">TIMEOUT</div>
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

        computed: {
            charactersLeft () {
                return 140 - (this.text || "").length;
            },
            timeout () {
                return this.$store.state.timeout;
            }
        },

        methods: {
            keydown: function (event) {
                if (event.keyCode === 13 && this.text !== null) {
                    this.sendMessage();
                    setTimeout(() => {$("textarea#text").val("");},0);
                }
            },
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
        position: relative;

        textarea {
            border: 1px solid #ccc;
            padding: 20px;
            width: 100%;
            box-sizing: border-box;
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

        .timeout {
            position: absolute;
            top: 0;
            font-size: 66px;
            text-align: center;
            width: 100%;
            color: salmon;
        }

        .characters {
        }
    }

</style>
