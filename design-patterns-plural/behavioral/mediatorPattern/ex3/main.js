var Task = require('./task')

//--------------------services----------------------------
var notificationService = function () {
    var message = 'Notifying'
    this.update = function (task) {
        console.log(message + ' ' + task.user + ' for task' + task.name)
    }
}
var logginService = function () {
    var message = 'Loggin'
    this.update = function (task) {
        console.log(message + ' ' + task.user + ' for task' + task.name)
    }
}
var auditingService = function () {
    var message = 'Auditing'
    this.update = function (task) {
        console.log(message + ' ' + task.user + ' for task' + task.name)
    }
}


//-------------------- mediador ----------------------------
var mediator = (function () {
    // list of channels
    var channels = {}

    // add a new channel
    var subscribe = function (channel, context, func) {
        if (!mediator.channels[channel]) {
            mediator.channels[channel] = []
        }
        mediator.channels[channel].push({
            context,
            func,
        })
    }

    var publish = function (channel) {
        if (!mediator.channels[channel]) return false

        // take all the other arguments in this function === ...args
        var args = Array.prototype.slice.call(arguments, 1)

        // run all the methods iin that channel
        for (var i = 0; i < mediator.channels[channel].length; i++) {
            var sub = mediator.channels[channel][i]
            sub.func.apply(sub.context, args)
        }
    }

    return {
        subscribe, publish, channels
    }
})()

var task1 = new Task({
    name: "create a demo for mediators",
    user: "adrian"
})


//newing observers from their constructor function----------------------
var not = new notificationService()
var ls = new logginService()
var audit = new auditingService()

// the mediator has the channel "complete", with 3 position array
mediator.subscribe('complete', not, not.update)
mediator.subscribe('complete', ls, ls.update)
mediator.subscribe('complete', audit, audit.update)

task1.complete = function () {
    mediator.publish('complete', this)
    // Task.prototype.complete.call(this)
}

task1.complete()
task1.save()