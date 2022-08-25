var myrepo = require('./Repo')
// var repo = require('./Repo')

// var myrepo = repo()

var taskHandler = function () {
    return {
        save: function() {
            myrepo.save('Hi from raskHandler')
        }
    }
}

module.exports = taskHandler()