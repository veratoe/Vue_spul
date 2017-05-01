import store from "./store/store.js";
import getters from "./store/getters.js"; 
import actions from "./store/actions.js";

setInterval(() =>{
    
    $.ajax({  

        url: "api/threads/" + store.state.activeThreadId + "/messages",
        type: "GET",
        contentType: "application/json",
        success: (messages) => {
            var thread = getters.getActiveThread(store.state);
            console.log(thread);
            console.log(messages);
            if (!messages) return;
            messages.forEach((message) => {
                if (!thread.messages.find(m => m.id == message.id)) {  
                    store.dispatch('addMessage', message);
                }
            });
        }

    });
}, 1000);
