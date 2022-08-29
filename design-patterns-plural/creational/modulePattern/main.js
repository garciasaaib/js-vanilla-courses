
// this file do request to DB and is a module pattern
var repo = function () {
    var db = {
        
    }

    return {
        get(id) {
            console.log('Getting task ' + id);
            return {
                name: 'new tasks from db'
            }
        },
        save(task) {
            console.log(`Saving task "${task.name}" to db`);
        }

    }
}
module.exports = repo();