import store from "./store/store.js";

// we gaan ervan uit dat geen enkele mutatie bekend is bij de client
var webSocket = new WebSocket("ws://192.168.1.21:8090");

webSocket.onopen = (evt) => { console.log("connected"); console.log(evt) };
webSocket.onmessage = (evt) => { 

    console.log("Message received");
    console.log(evt);

    var data = JSON.parse(evt.data);

    switch(data.type) {
        case "CREATE_THREAD":
            store.commit("CREATE_THREAD", data.payload);
            break;
        case "UPDATE_THREAD":
            store.commit("UPDATE_THREAD", data.payload);
            break;

        case "CREATE_SCRIPT": 
            store.commit("CREATE_SCRIPT", data.payload);
            break;

        case "UPDATE_SCRIPT": 
            store.commit("UPDATE_SCRIPT", data.payload);
            break;

        case "CREATE_COMMENT": 
            store.commit("CREATE_COMMENT", data.payload);
            break;

        case "UPDATE_MESSAGE":
            store.commit("UPDATE_MESSAGE", data.payload);
            break;

        case "UPDATE_USER":
            if (typeof m.changed.status !== "undefined") store.commit("TIMEOUT", m.values.status === "timeout");
            break;
    }

}
