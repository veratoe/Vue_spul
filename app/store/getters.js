export default {

    getActiveThread: state => {
        var activeThread;
        state.threads.forEach((thread) => {
            if (thread.id === state.activeThreadId) {
                activeThread = thread;
            }
        });
        return activeThread;
    },

    // @APPELMOES: niet echt een getter lijkt me
    deleteThread: (state, threadId) => {
        console.log('LE DELETE');
        state.threads.forEach((t, index) => {
            if (t.id === threadId) {
                console.log('wUBWUWBUWBUWB');
                state.threads.splice(index, 1);
                return;
            }
        });
    },
};
