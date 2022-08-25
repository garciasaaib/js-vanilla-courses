// this subObject wrap the class task
/**
 * Decorator tries to solve. I dont want to mess the task function
 but i want to create tasks with more functionalities
 */

var Task = function(name) {
  this.name = name;
  this.completed = false;
}
Task.prototype.complete = function() {
	console.log('Completing Task: '+ this.name)
	this.completed = true;
}
Task.prototype.save = function() {
	console.log('saving Task: '+ this.name)
}

var myTask = new Task('Legacy Task')
myTask.complete()
myTask.save()

var UrgentTask = function (name, priority) {
  // inherencie to Task attributes
  Task.call(this, name) 
  this.priority = priority
}

// inherencie to Task methods
UrgentTask.prototype = Object.create(Task.prototype)
UrgentTask.prototype.notify = function () {
    console.log('Notifying important people')
}
// overwrite the save method in UrgentTask scope
UrgentTask.prototype.save = function () {
    this.notify()
    // calls save method in the Task scope
    Task.prototype.save.call(this)
}


var ut = new UrgentTask('Urgent Task',2)
console.log(ut)
ut.complete()
ut.save()

