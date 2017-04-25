<template>
    <div class="message_view" style="font-size: 12px">>
        <span style="font-family: monospace; font-size: 12px; display: inline-block; width: 200px">{{ message.message }}</span> | <span style="color: #888">{{ message.id }}</span> <span style="color: #aaa">{{ message.createdAt | time }} </span>

    </div>

</template>

<script>

    export default {
        name: "MessageView",
        props: { message: Object }
    }

</script>
