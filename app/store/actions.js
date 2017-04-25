// hier komt de API? 

export const fetchThreads = ({ commit }) => {

    $.ajax({ 
        url: "api/threads", 
        type: "GET", 
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            commit("SET_THREADS", data.threads);
        }
    });
};

export const setActiveThreadId = ({ commit }, id) => {
    commit("SET_ACTIVE_THREAD_ID", id); 
};

