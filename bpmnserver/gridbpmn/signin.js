exports.StartSignIn = function(data, done) {
// called after the start event arrived at MyStart
console.log('running StartSignIn');
done(data);
};  
exports.TaskSignIn = function(data, done) {
// called at the beginning of TaskSignIn
console.log('running TaskSignIn');
//this.TaskSignInDone(data, done);
done(data);
};  
exports.TaskSignInDone = function(data, done) {
// Called after the process has been notified that the TaskSignIn task has been finished
// by invoking myProcess.taskDone().
// Note: "task name" + "Done" handler are only called for 
// user tasks, manual task, and unspecified tasks
console.log('running TaskSignIn');
done(data);
};  
exports.EndSignIn = function(data, done) {
// called after the start event arrived at MyStart
console.log('running EndSignIn');
done(data);
};  
