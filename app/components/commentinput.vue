<template>

    <div class="comment_input">
        <textarea id="text" v-model="text" @keydown="keydown" maxlength="140"></textarea>
        <div v-show="!timeout" class="submit" @click="sendcomment">Stuur</div>
        <div class="characters"> {{ charactersLeft }} / 140 </div>
        <div v-show="timeout" class="timeout">TIMEOUT</div>
    </div>

</template>

<script>

    export default {
        name: "commentInput",
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
                    this.sendcomment();
                    setTimeout(() => {$("textarea#text").val("");},0);
                }
            },
            sendcomment () {
                this.$store.dispatch('sendcomment', this.text); 
                this.text = null
            }
        },
        created () {
        }
    }

</script>

<style lang="less">

    .comment_input {
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
            background-color: #b3a6d6;
            position: absolute;
            top: 14px;
            right: 14px;
            color: white;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            padding: 9px;

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
