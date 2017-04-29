const {VM} = require('vm2');
const vm = new VM({
    sandbox: {
        message: "Zonne grote JONGEH",
        timeout: 1000,
    }
});

//vm.run("if (message.match(/vuurbal/)) a = 4");
vm.run("while (true) {}");

console.log(vm._context.a);
