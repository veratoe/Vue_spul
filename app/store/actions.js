export default {
    
    fetchThreads ({ commit }) {

        $.ajax({ 
            url: "api/threads", 
            type: "GET", 
            success: function (data, textStatus, jqXHR) {
                commit("RECEIVE_THREADS", data.threads);
            }
        });
    },

    setActiveThreadId ({ commit }, payload) {
        commit("SET_ACTIVE_THREAD_ID", payload); 
    },

    sendMessage ({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/messages",
            type: "POST",
            data: JSON.stringify({ message: payload }),
            contentType: "application/json",
            success: (message) => {
                commit("RECEIVE_MESSAGE", message);
            }
        });

    },
    
    createThread ({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/",
            type: "POST",
            data: JSON.stringify({ title: payload }),
            contentType: "application/json",
            success: (thread) => {
                commit("RECEIVE_THREAD", thread);
            }
        });
    }
};
