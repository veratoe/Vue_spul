export default {

    getActiveThread: state => {
        var activeThread;
        state.threads.forEach((thread) => {
            if (thread.id === state.activeThreadId) {
                activeThread = thread;
            }
        });
        return activeThread;
    }
};
