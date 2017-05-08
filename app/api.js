import store from "./store/store.js";

// we gaan ervan uit dat geen enkele mutatie bekend is bij de client
var mutationHandle = 0;


setInterval(() => {
    
    $.ajax({  

        url: "api/mutations/" + mutationHandle,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': "Basic " + btoa(store.state.username + ":" + store.state.password)
        },
        success: (ms) => {
            ms.forEach((m) => {
                mutationHandle = m.id;

                switch(m.type) {
                    case "UPDATE_SCRIPT": 
                        store.commit("UPDATE_SCRIPT", m);
                    break;

                    case "CREATE_MESSAGE": 
                        store.commit("CREATE_MESSAGE", m.values);
                    break;
                }

            });
        }

    });

}, 1000);
