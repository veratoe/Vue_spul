const getters = {

    getActiveThread: state => {
        return state.threads.find(t => t.id === state.activeThreadId);
    },

};

export default getters;
