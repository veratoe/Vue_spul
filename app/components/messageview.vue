<template>
    <div class="message_view">
        <span class="message">{{ message.message }}</span>
        <span class="id">{{ message.id }}</span>
        <span class="timestamp">{{ message.createdAt }} </span>
        <span class="author">{{ message.author }} </span>
        
    </div>

</template>

<script>

    export default {
        name: "MessageView",
        props: { message: Object },
        created () {
        }
    }

</script>
