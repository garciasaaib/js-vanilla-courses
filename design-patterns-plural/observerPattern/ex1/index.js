var Task = function(data){
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
}
Task.prototype.complete = function(){
    console.log(`completing task: ${this.name}`)
    this.completed = true
}
Task.prototype.save = function (){
    console.log(`saving Task: ${this.name}`)
}

//--------------------services----------------------------
var notificationService = function (){
    var message = 'Notifying'
    this.update = function(task){
        console.log(message +' '+ task.user + ' for task' + task.name)
    }
}
var logginService = function (){
    var message = 'Loggin'
    this.update = function(task){
        console.log(message +' '+ task.user + ' for task' + task.name)
    }
}
var auditingService = function (){
    var message = 'Auditing'
    this.update = function(task){
        console.log(message +' '+ task.user + ' for task' + task.name)
    }
}
//---------------------------------------------------------

//list of services---------------------------------------
function ObserverList(){
    this.observerList = []
}

//functions to add, get or count observers to the list

ObserverList.prototype.add = function(obj){
    return this.observerList.push(obj)
}

ObserverList.prototype.get = function(index){
    if(index > -1 && index < this.observerList.length){
        return this.observerList[index]
    }
}

ObserverList.prototype.count = function(){
    return this.observerList.length
}

ObserverList.prototype.removeAt = function(index){
    this.observerList.splice(index,1)
}

ObserverList.prototype.indexOf = function(obj,startIndex){
    var i = startIndex
    while(i < this.observerList.length){
        if (this.observerList[i]===obj) {
            return i
        }
        i++
    }
    return -1;
}

//---------------------------------------------------------

//Decorator of task---------------------------------------

var ObservableTask = function(data){
    Task.call(this,data)
    this.observers = new ObserverList()
}

ObservableTask.prototype.addObserver = function(observer){
    this.observers.add(observer)
}

ObservableTask.prototype.removeObserver = function(observer){
    this.observers.removeAt(this.observers.indexOf(observer,0))
}

ObservableTask.prototype.notify = function (context){
    var observerCount = this.observers.count()
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i)(context)
    }
}

ObservableTask.prototype.save = function(){
    this.notify(this)
    Task.prototype.save.call(this)
}

//---------------------------------------------------------------------

//instances of decorator of Task constructor function-------------------

var task1 = new ObservableTask({name:'create a demo for constructors', user:'Jon'})

//----------------------------------------------------------------------

//newing observers from their constructor function----------------------
var not = new notificationService()
var ls = new logginService()
var audit = new auditingService()

//----------------------------------------------------------------------

//adding observers to the list------------------------------------------

task1.addObserver(not.update)
task1.addObserver(ls.update)
task1.addObserver(audit.update)

//----------------------------------------------------------------------

//Executing save funciton
task1.save()
console.log('------------------')

//remove observer
task1.removeObserver(audit.update);

task1.save()