var repo = {
    tasks: {},
    commands: [],
    get: function (id) {
        console.log('Geting task '+ id)
        return { name: 'new task from db'}
    },

    // adding a new command to the repo
    save: function (task) {
        repo.tasks[task.id] = task
        console.log('saving '+task.name+' to the db')
    }
}

// this function check if the method exists and run it
repo.execute = function (name) {
    // there is all the extra arguments
    var args = Array.prototype.slice.call(arguments, 1)
    
    repo.commands.push({
        name,
        obj: args[0]
    })


    // check into repo if the method exists
    if (repo[name]) return repo[name].apply(repo, args)

    return false
}

repo.execute('save', {
    id: 1,
    name: 'Task 1',
    completed: false
})

repo.execute('save', {
    id: 2,
    name: 'Task 2',
    completed: false
})

repo.execute('save', {
    id: 3,
    name: 'Task 3',
    completed: false
})

repo.execute('save', {
    id: 4,
    name: 'Task 4',
    completed: false
})
console.log(repo.tasks)