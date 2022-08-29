// simple task creator
var Task = function (data) {
    this.flyweight = FlyweightFactory.get(
        data.project,
        data.priority,
        data.user,
        data.completed,
    )
    this.name = data.name;
    // this.priority = data.priority;
    // this.project = data.project;
    // this.user = data.user;
    // this.completed = data.completed;
}

// create object with all repeted data / all the posible flyweight data
function Flyweight(project, priority, user, completed) {
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
}

// THE FLYWEIGHT
var FlyweightFactory = function() {

    /* logical flyweight
    every new convination creates an object item, where:
        key: string with concatenation of the params
        value: object with the params

    and, if there is a new convination, is created a new object to save it in list
    */
    var flyweights = {}
    var get = function (project, priority, user, completed) {
        if(!flyweights[`${project}${priority}${user}${completed}`]) {
            flyweights[`${project}${priority}${user}${completed}`] =
            new Flyweight([`${project}${priority}${user}${completed}`])
        }
        return flyweights[project + priority + user + completed]
    }

    var getCount = function () {
        var count = 0
        for (const f in flyweights) count++
        return count
    }

    return {
        get, getCount
    }
}()

// little module pattern as a controller
function TaskCollection() {
    var tasks = {}
    var count = 0
    var add = function (data) {
        tasks[data.name] = new Task(data)
        count++
    }
    var get = function (name) {
        return tasks[name]
    }
    var getCount = function () {
        return count
    }
    return { add, get, getCount}
}

var tasks = new TaskCollection()

// bunch of posible attributes
var projects = ['none', 'courses', 'training', 'project']
var priorities = [1,2,3,4,5]
var users = ['Jon', 'Erica', 'Amanda', 'Nathan']
var completed = [true, false]

// 2 memoryUsage are to calculate how much weight of memory uses to do that
var initialMemory = process.memoryUsage().heapUsed

// loop to create random tasks
for (let i = 0; i < 10000; i++) {
    tasks.add({
        name: 'task' + i,
        priority: priorities[Math.floor((Math.random()*5))],
        project: projects[Math.floor((Math.random()*4))],
        user: users[Math.floor((Math.random()*4))],
        completed: completed[Math.floor((Math.random()*2))],
    })
}

var afterMemory = process.memoryUsage().heapUsed


console.log('used memory ' + (afterMemory - initialMemory) / 1000000)

console.log("tasks: " + tasks.getCount())

console.log("flyweights: " + FlyweightFactory.getCount())