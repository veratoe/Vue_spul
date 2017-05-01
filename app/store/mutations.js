import getters from "./getters.js";

export default  {

    RECEIVE_THREADS (state, threads) {
        state.threads = threads;
    },
    RECEIVE_THREAD (state, thread) {
        state.threads.push(thread);
    },
    DELETE_THREAD (state, thread) {
        getters.deleteThread(state, thread);
    },

    SET_ACTIVE_THREAD_ID (state, threadId) {
        state.activeThreadId = threadId; 
    },

    RECEIVE_MESSAGE (state, message) {
        getters.getActiveThread(state).messages.push(message);
    },

    UPDATE_SCRIPT (state, script) {
        var index = getters.getActiveThread(state).scripts.findIndex(s => s.id === script.id);
        console.log(index);
    }
};

