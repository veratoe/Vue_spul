const getters = {

    activeThread: state => {
        return state.threads.find(t => t.id === state.activeThreadId);
    },

    connectionStatus: state => {
        return state.connection;
    }

};

export default getters;
