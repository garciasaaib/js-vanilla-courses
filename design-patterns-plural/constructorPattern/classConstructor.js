// initializate our object with prototypes in Task.js
class Task {
	constructor(name){
	  this.name = name;
	  this.completed = false;
	};

	complete() {
		console.log('completing Task: '+ this.name)
		this.completed = true;
	};

	save() {
		console.log('saving Task: '+ this.name)
	};
}

// new objects Task type, and all save the values of this, that is the constructor
var task1 = new Task('constructor');
var task2 = new Task('modules');
var task3 = new Task('singleton');
var task4 = new Task('prototype');

task1.complete() // true
task2.save() // 'saving Task: modules'
task3.save() // 'saving Task: singleton'
task4.save() // 'saving Task: prototype'