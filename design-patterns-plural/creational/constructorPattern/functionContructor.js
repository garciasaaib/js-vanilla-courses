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