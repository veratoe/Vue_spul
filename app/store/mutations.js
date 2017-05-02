import getters from "./getters.js";

export default  {

    RECEIVE_THREADS (state, threads) {
        state.threads = threads;
    },
    CREATE_THREAD (state, thread) {
        state.threads.push(thread);
    },
    DELETE_THREAD (state, threadId) {
        var index = state.threads.findIndex(t => t.id === threadId);
        state.threads.splice(index, 1);
    },

    SET_ACTIVE_THREAD_ID (state, threadId) {
        state.activeThreadId = threadId; 
    },

    RECEIVE_MESSAGE (state, message) {
        getters.getActiveThread(state).messages.push(message);
    },

    CREATE_SCRIPT (state, script) {
        var thread = getters.getActiveThread(state);
        thread.scripts.push(script);
    },

    UPDATE_SCRIPT (state, script) {
        var thread = getters.getActiveThread(state);
        var index = thread.scripts.findIndex(s => s.id === script.id);
        thread.scripts[index] = script;
        
    },

    DELETE_SCRIPT (state, scriptId) {
        var thread = getters.getActiveThread(state);
        var index = thread.scripts.findIndex(s => s.id === scriptId);
        thread.scripts.splice(index, 1);
    }
};

