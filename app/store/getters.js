export default {

    getActiveThread: state => {
        return state.threads.find(t => t.id === state.activeThreadId);
    },

    // @APPELMOES: niet echt een getter lijkt me
    deleteThread: (state, threadId) => {
        state.threads.forEach((t, index) => {
            if (t.id === threadId) {
                state.threads.splice(index, 1);
                return;
            }
        });
    },
};
