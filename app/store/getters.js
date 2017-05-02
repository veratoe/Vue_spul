const getters = {

    getActiveThread: state => {
        return state.threads.find(t => t.id === state.activeThreadId);
    },

    // @APPELMOES: niet echt een getter lijkt me

    // @APPELMOES: niet echt een getter lijkt me
    getScript: (state, scriptId) => {

    }
};

export default getters;
