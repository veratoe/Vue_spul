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

                console.log("Applying %s", m.type, m);
                switch(m.type) {
                    case "UPDATE_SCRIPT": 
                        store.commit("UPDATE_SCRIPT", m);
                        break;
                }

            });
        }

    });

}, 1000);
