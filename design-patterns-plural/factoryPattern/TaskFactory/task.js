// our constructor is the word this, there will be all the data to initialize our object
var Repo = require('./taskRepository');

var Task = function(data) {
    this.name = data.name;
    this.completed = false;
  }
  Task.prototype.complete = function() {
      console.log('Completing task ' + this.name)
      this.completed = true;
  }
  Task.prototype.save = function() {
      Repo.save(this)
  }
  module.exports = Task