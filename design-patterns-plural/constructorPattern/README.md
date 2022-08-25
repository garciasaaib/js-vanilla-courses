### Constructor Pattern
Use to create a new object with their own object scope.

In JS, the `new` keyword creates a brand new object, linked to an object prototype, bonded `this` to the new object scope & implicitly returns `this`.

Constructor Pattern allows us to create a function and pass in some parameters, and the name of the function is going to be the name of our own object. To set some variables in my object I have to save them in `this`.

```jsx
// our constructor is the word this, there will be all the data to initialize our object
var Task = function(name) {
  this.name = name;
  this.completed = false;
  
  this.complete = function() {
    this.completed = true;
  }
  
  this.save = function(){
    console.log('saving Task: '+ this.name)
  }
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
```

## Prototypes

An encapsulation of properties that an object links to.

When you have an object `task1 = new Task('task1')`, it has the Task prototype, which means that all the properties are not saved in task1, on the other way, task1 has access and is linked to all the Task properties. The keyword here is ‘point back to the prototype’.

Efficiency is the reason to use prototypes instead just this for methods in objects.

```jsx
// initializate our object with prototypes in Task.js
var Task = function(name) {
  this.name = name;
  this.completed = false;
}
Task.prototype.complete = function() {
	this.completed = true;
}
Task.prototype.save = function() {
	console.log('saving Task: '+ this.name)
}

module.exports = Task
```

```jsx
var Task = require('./task')

var task1 = new Task('constructor');
var task2 = new Task('modules');
var task3 = new Task('singleton');
var task4 = new Task('prototype');

task1.complete() // true
task2.save() // 'saving Task: modules'
task3.save() // 'saving Task: singleton'
task4.save() // 'saving Task: prototype'
```

## Constructor with class

Suggar syntax for constructor patterns

```jsx
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

module.exports = Task
```