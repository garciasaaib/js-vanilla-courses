var Task = require('./tasks')

/**----------------------- SERVICES ----------------------------- */
var notificationService = function () {
    var message = 'Notifying '
    this.update = function (task) {
        console.log(`${message} ${task.user} for task ${task.name}`)
    }
}
var logginService = function () {
    var message = 'Loggin '
    this.update = function (task) {
        console.log(`${message} ${task.user} for task ${task.name}`)
    }
}
var auditingService = function () {
    var message = 'Auditing '
    this.update = function (task) {
        console.log(`${message} ${task.user} for task ${task.name}`)
    }
}




/**----------------------- SUBCRIBER ----------------------------- */

// for the Observer List we only need the add and get method, and the store will be a []
function ObserverList() {
    this.observerList = []
}
ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj)
}
ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length)
        return this.observerList[index]
}
ObserverList.prototype.count = function () {
    return this.observerList.length
}



/**----------------------- OBSERVER FOR TASKS ----------------------------- */
// this allows us to create tasks that can be observables
var ObservableTask = function (data) {
    Task.call(this, data)
    this.observers = new ObserverList()
    // console.log(this.observers)
}
ObservableTask.prototype.addObserver = function (observer) {
    this.observers.add(observer)
}
ObservableTask.prototype.notify = function (context) {
    var observerCount = this.observers.count()
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i)(context)
        // console.log(this.observers.get(i))
    }
}
ObservableTask.prototype.save = function () {
    this.notify(this)
    Task.prototype.save.call(this)
}




// var task1 = new Task({ name: 'create a demo for constructors', user: 'Jon' })
var task1 = new ObservableTask({ name: 'create a demo for constructors', user: 'Jon' })


// the objective creating many services is to send different messages
var notification = new notificationService()
var loggin = new logginService()
var auditing = new auditingService()

task1.addObserver(notification.update)
task1.addObserver(loggin.update)
task1.addObserver(auditing.update)

task1.save()