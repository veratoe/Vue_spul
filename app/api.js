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

                switch(m.type) {
                    case "UPDATE_SCRIPT": 
                        console.log("Applying %s", m.type, m);
                        store.commit("UPDATE_SCRIPT", m);
                    break;

                    case "CREATE_MESSAGE": 
                        console.log("Applying %s", m.type, m);
                        store.commit("CREATE_MESSAGE", m.values);
                    break;
                }

            });
        }

    });

}, 1000);
