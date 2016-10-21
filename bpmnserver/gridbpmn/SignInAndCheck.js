exports.StartSignIn = function(data, done) {
// called after the start event arrived at MyStart
	console.log("StartSignIn");
done(data);
};  
exports.StartCheckSignIn = function(data, done) {
// called after the start event arrived at MyStart
done(data);
};  
exports.TaskSignIn = function(data, done) {
// called at the beginning of TaskSignIn
done(data);
};  
exports.TaskSignInDone = function(data, done) {
// Called after the process has been notified that the TaskSignIn task has been finished
// by invoking myProcess.taskDone().
// Note: "task name" + "Done" handler are only called for 
// user tasks, manual task, and unspecified tasks
done(data);
};  
exports.TaskSignInChecked = function(data, done) {
// called at the beginning of TaskSignInChecked
// to send some message
done(data);
};  
exports.EventOnWorkTime = function(data, done) {
// called after the EventOnWorkTime event arrived
done(data);
};  
exports.EventOnWorkTime$getTimeout = function(data, done) {
// called when arriving on EventOnWorkTime
// should return timeout in ms.
return 1000;
};
 exports.EventSendNotInPosition = function(data, done) {
// called after the EventSendNotInPosition event arrived
done(data);
};  
exports.EventSendNotOnTime = function(data, done) {
// called after the EventSendNotOnTime event arrived
done(data);
};  
exports.EventSendSignInData = function(data, done) {
// called after the EventSendSignInData event arrived
done(data);
};  
exports.GWIsSignInTime = function(data, done) {
// called after arriving atGWIsSignInTime
done(data);
};  
exports.GWIsSignInTime$ok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return true;
};  
exports.GWIsSignInTime$nok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return false;
};  
exports.GWIsSignInPosition = function(data, done) {
// called after arriving atGWIsSignInPosition
done(data);
};  
exports.GWIsSignInPosition$ok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return true;
};  
exports.GWIsSignInPosition$nok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return false;
};  
exports.GWCheckTimeOrLocation = function(data, done) {
// called after token flows arriving atGWCheckTimeOrLocation
done(data);
};  
exports.GWCheckTimeOrLocation$ok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return true;
};  
exports.GWCheckTimeOrLocation$nok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return false;
};  
exports.GWOnlyTimeAndPosition = function(data, done) {
// called after token flows arriving atGWOnlyTimeAndPosition
done(data);
};  
exports.GWOnlyTimeAndPosition$ok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return true;
};  
exports.GWOnlyTimeAndPosition$nok = function(data) {
// has to return true or false
// the name of the sequence flow follows after "$".
// if there is no name, an error is thrown 
return false;
};  
exports.EndSignIn = function(data, done) {
// called after the start event arrived at MyStart
done(data);
};  
exports.EndCheckSignIn = function(data, done) {
// called after the start event arrived at MyStart
done(data);
};  
exports.defaultEventHandler = function(eventType, currentFlowObjectName, handlerName, reason, done) {
    // Called, if no handler could be invoked.
    done(data);
};

exports.defaultErrorHandler = function(error, done) {
    // Called if errors are thrown in the event handlers
    done();
};

exports.onBeginHandler = function(currentFlowObjectName, data, done) {
    // do something
    done(data);
};

exports.onEndHandler = function(currentFlowObjectName, data, done) {
    // do something
    done(data);
};