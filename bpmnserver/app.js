﻿var bpmn = require("bpmn");
var APP_PATH=__dirname;
/*
bpmn.createUnmanagedProcess(APP_PATH+"/gridbpmn/signin.bpmn", function(err, myProcess){

    // we start the process
    myProcess.triggerEvent("StartSignIn");

});

*/
var manager = new bpmn.ProcessManager();
/*
manager.addBpmnFilePath(APP_PATH+"/gridbpmn/signin.bpmn");


manager.createProcess("Process_SignIn", function(err, myProcess){
console.log("gota:\n"+myProcess);
    // we start the process
    myProcess.triggerEvent("StartSignIn");
});


//这是用来获取已经在运行的process
manager.get("Process_SignIn",  function(err, processes){
	console.log('running get Process_SignIn');
console.log(processes);
});
//这是用来获取已经在运行的process，如果没有运行，就获取不到
manager.findByName("Process_SignIn", function(err, processes){
console.log('running findByName');
console.log(processes);
//processes.triggerEvent("StartSignIn");
});
*/
// Returns a restify server.


var server = manager.createServer({logLevel:0},{url:"58.64.149.165",name:"restServer"});
//server.url="localhost";

//server.url=APP_PATH+"/gridbpmn/";
server.listen(9009, function() {
    console.log('%s listening at %s', server.name, server.url);
});