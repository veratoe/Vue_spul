export default {
    
    /*
     *      Let op: actions moeten zo min mogelijk commits doen die eigenlijk vanuit de server
     *      kunnen worden gestuurd; laat de server leidend zijn!
     *     
     */

    // @APPELMOES: Ajax spul naar api.js
    
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
            success: () => {}
        });

    },

    /*
     * Creeer een draad
     * @param payload: draad object
     */    
    
    createThread ({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: () => {}
        });
    },

    /*
     * Delete een draad
     * @param payload: threadId
     */    

    deleteThread ({ commit, state } , payload) {
        
        $.ajax({
            url: "api/threads/" + payload,
            type: "DELETE",
            success: () => {
                commit("SET_ACTIVE_THREAD_ID", null);
            }
        });
    },

    createScript({ commit, state }) {
        
        $.ajax({

            url: "api/threads/" + state.activeThreadId + "/scripts/",
            type: "POST",
            success (script) {}
        });
    },
        
    saveScript({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/scripts/" + payload.id,
            type: "PUT",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success (script) {}
        });
    },

    /*
     * upvote een script
     * @param payload: scriptId
     */    

    upvoteScript({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/scripts/" + payload + "/upvote",
            type: "GET",
            contentType: "application/json",
            success (script) {}
        });
    },

    /*
     * downvote een script
     * @param payload: scriptId
     */    

    downvoteScript({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/scripts/" + payload + "/downvote",
            type: "GET",
            contentType: "application/json",
            success (script) {}
        });
    },

    /*
     * Delete een script
     * @param payload: scriptId
     */    
    
    deleteScript({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/scripts/" + payload,
            type: "DELETE",
            contentType: "application/json",
            success () {
                commit("DELETE_SCRIPT", payload); 
            }
        });
    },

    activateScript({ commit, state }, payload) {

        $.ajax({
            url: "api/threads/" + state.activeThreadId + "/scripts/" + payload,
            type: "PUT",
            data: JSON.stringify({ active: true }),
            contentType: "application/json",
            success () {
            }
        });
    },

    /*
     * user
     */

    createUser({ commit, state }, payload) {
        console.log('creatan with', payload);
        $.ajax({
            url: "api/users",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success () {}
        });
    },

    login({ commit, state }, payload) {

        $.ajax({
            url: "api/users/login",
            // @APPELMOES: 1 keer met de hand meegeven ?
            headers: {
                'Authorization': "Basic " + btoa(payload.username + ":" + payload.password)
            },
            contentType: "application/json",
            success (response) {
                // @APPELMOES: mengen van response en payload is lelijk
                payload.status = response.status
                commit("LOGIN", payload);
            },
            error() {
                commit("ERROR_ON_LOGIN");
            }
        });
    },

    logout({ commit, state }) {
        commit("LOGOUT");
    },

    updateUsername({ commit, state }, payload) {
        commit("UPDATE_USERNAME", payload);
    },

    updatePassword({ commit, state }, payload) {
        commit("UPDATE_PASSWORD", payload);
    }

};

