// hier komt de API? 

export const fetchThreads = ({ commit }) => {
    commit("FETCH_THREADS", [ 
        { id: 0, title: "LE dongster" },
        { id: 1, title: "Ze wingwong" } 
    ]);
};

