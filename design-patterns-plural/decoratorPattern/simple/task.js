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

var urgentTask = new Task('Urgent Task')
urgentTask.priority = 2;
urgentTask.notify = function () {
    console.log('Notifying important people')
}

urgentTask.complete()
urgentTask.save = function () {
    this.notify()
    Task.prototype.save.call(this)
}
urgentTask.save()

var myTask = new Task('Legacy Task')
myTask.complete()
myTask.save()