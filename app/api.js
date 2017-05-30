import store from "./store/store.js";

// we gaan ervan uit dat geen enkele mutatie bekend is bij de client
var mutationHandle = 0;

setInterval(() => {
    
    $.ajax({  

        url: "api/mutations/" + mutationHandle,
        type: "GET",
        contentType: "application/json",
        success: (ms) => {
            ms.forEach((m) => {
                mutationHandle = m.id;

                console.log(m);

                switch(m.type) {
                    case "CREATE_THREAD":
                        store.commit("CREATE_THREAD", m);
                        break;
                    case "UPDATE_THREAD":
                        store.commit("UPDATE_THREAD", m);
                        break;

                    case "CREATE_SCRIPT": 
                        store.commit("CREATE_SCRIPT", m);
                        break;

                    case "UPDATE_SCRIPT": 
                        store.commit("UPDATE_SCRIPT", m);
                        break;

                    case "CREATE_MESSAGE": 
                        store.commit("CREATE_MESSAGE", m);
                        break;

                    case "UPDATE_MESSAGE":
                        store.commit("UPDATE_MESSAGE", m);
                        break;
                }

            });
        }

    });

}, 500);
