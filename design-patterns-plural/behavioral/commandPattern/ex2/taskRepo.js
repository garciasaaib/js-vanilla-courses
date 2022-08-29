var repo = {
    get: function (id) {
        console.log('Geting task '+ id)
        return { name: 'new task from db'}
    },
    save: function (task) {
        console.log('saving '+task.name+' to the db')
    }
}

// this function check if the method exists and run it
repo.execute = function (name) {
    // there is all the extra arguments
    var args = Array.prototype.slice.call(arguments, 1)
    
    // check into repo if the method exists
    if (repo[name]) 
        return repo[name].apply(repo, args)
    return false
}

repo.execute('save', {
    id: 1,
    name: 'Task 1',
    completed: false
})