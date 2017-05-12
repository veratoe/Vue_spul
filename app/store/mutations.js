import getters from "./getters.js";
import Vue from     "../lib/vue.js";

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

    CREATE_MESSAGE (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        thread.messages.push(payload.values);
    },

    UPDATE_MESSAGE (state, payload) {
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        var message = thread.messages.find(m => m.id === payload.values.id);
        ["star"].forEach((property) => {
            message[property] = payload.values[property];
        });
    },

    CREATE_SCRIPT (state, script) {
        var thread = getters.getActiveThread(state);
        thread.scripts.push(script);
    },

    UPDATE_SCRIPT (state, payload) {
        // @TODO: platslaan resources
        var thread = state.threads.find(t => t.id === payload.values.threadId);
        if (!thread) return;
        var script = thread.scripts.find(s => s.id === payload.values.id);
        if (!script) console.warn("Geen script voor :", payload.values);
        else {
            payload.changed.forEach(property => {
                script[property] = payload.values[property];
            });
        }
    },

    DELETE_SCRIPT (state, scriptId) {
        var thread = getters.getActiveThread(state);
        var index = thread.scripts.findIndex(s => s.id === scriptId);
        thread.scripts.splice(index, 1);
    },

    LOGIN (state, user) {
        state.logged_in = true;
        state.username = user.username;
        state.password = user.password;
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

