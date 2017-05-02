import store from "./store/store.js";
import getters from "./store/getters.js"; 
import actions from "./store/actions.js";

setInterval(() =>{
    
    if (!store.state.activeThreadId)
        return;

    $.ajax({  

        url: "api/threads/" + store.state.activeThreadId + "/messages",
        type: "GET",
        contentType: "application/json",
        success: (messages) => {
            var thread = getters.getActiveThread(store.state);
            if (!messages) return;
            messages.forEach((message) => {
                if (!thread.messages.find(m => m.id == message.id)) {  
                    store.dispatch('addMessage', message);
                }
            });
        }

    });

    $.ajax({
    
        url: "api/threads/" + store.state.activeThreadId + "/scripts",
        type: "GET",
        contentType: "application/json",
        success: (scripts) => {
            if (!scripts) return;
            scripts.forEach((script) => {
                store.dispatch('receiveScript', script);
            });
                    
        }
    });

}, 1000);
