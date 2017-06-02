import getters from "./getters.js";
import Vue from     "../lib/vue.js";

export default  {

    /*
     *      thread
     */

    RECEIVE_THREADS (state, threads) {
        state.threads = threads;
    },
    CREATE_THREAD (state, payload) {
        state.threads.push(payload.values);
    },
    DELETE_THREAD (state, threadId) {
        var index = state.threads.findIndex(t => t.id === threadId);
        state.threads.splice(index, 1);
    },
    UPDATE_THREAD (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.id);
        for (var property in payload.changed) {
            thread[property] = payload.values[property];
        };
    },

    SET_ACTIVE_THREAD_ID (state, threadId) {
        state.activeThreadId = threadId; 
    },

    /*
     *      message
     */

    CREATE_MESSAGE (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        thread.messages.push(payload.values);
    },

    UPDATE_MESSAGE (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        var message = thread.messages.find(m => m.id === payload.values.id);
        for (var property in payload.changed) {
            message[property] = payload.values[property];
        };
    },

    /*
     *      script
     */

    CREATE_SCRIPT (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        thread.scripts.push(payload.values);
    },

    UPDATE_SCRIPT (state, payload) {
        // @TODO: platslaan resources
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        if (!thread) return;
        var script = thread.scripts.find(s => s.id === payload.values.id);
        if (!script) console.warn("Geen script voor :", payload.values);
        else {
            for (var property in payload.changed) {
                script[property] = payload.values[property];
            };
        }
    },

    DELETE_SCRIPT (state, scriptId) {
        var thread = getters.getActiveThread(state);
        var index = thread.scripts.findIndex(s => s.id === scriptId);
        thread.scripts.splice(index, 1);
    },

    /*
     *      login
     */

    TIMEOUT (state, timeout) {
        state.timeout = timeout;
    },

    LOGIN (state, user) {
        state.logged_in = true;
        state.username = user.username;
        state.password = user.password;
        state.timeout = user.status === "timeout";
        $.ajaxSetup({ headers: { 'Authorization': "Basic " + btoa(user.username + ":" + user.password) } });
    },

    LOGOUT (state) {
        state.logged_in = false;
        state.username = null;
        state.password = null;
        $.ajaxSetup({ headers: { 'Authorization': null }});
    },

    ERROR_ON_LOGIN (state) {
        state.logged_in = false;
        state.error_on_login = true;
    }
};

