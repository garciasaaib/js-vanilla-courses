/**
 * The main idea is to create a wrapper or fasade over the TaskService
 * To make it look beeter

 * The difference between fasade and decorator, is that in Fasade I'm not adding a functionality, just cuvering up and creating an interface for exactly same functionality
 */


var Task = function (data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
}

var TaskService = function () {
    return {
        complete: function (task) {
            task.completed = true;
            console.log('completing task: ' + task.name)
        },
        setCompleteDate: function (task) {
            task.completedDate = new Date();
            console.log(`${task.name} completed on ${task.completedDate}`)
        },
        notifyCompletion: function (task, user) {
            console.log(`Notifying ${user} of the completion of ${task.name}`)
        },
        save: function (task) {
            console.log(`Saving task: ${task.name}`)
        }
    }
}()

var TaskServiceFasade = function () {
    //this fasade is going to be a module pattern 
    var completeAndNotify = function (myTask) {
        TaskService.complete(myTask)
        if (myTask.completed == true) {
            TaskService.setCompleteDate(myTask)
            TaskService.notifyCompletion(myTask, myTask.user)
            TaskService.save(myTask)
        }
    }

    return {
        completeAndNotify
    }
}()

var myTask = new Task({
    name: 'My Task',
    priority: 1,
    project: 'Courses',
    user: 'Jon',
    completed: false
})


console.log(myTask)
TaskServiceFasade.completeAndNotify(myTask)
