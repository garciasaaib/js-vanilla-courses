// this file do request to DB
var repo = function () {
    var db = {}


    return {
        get(id) {
            console.log('Getting project ' + id);
            return { name: 'new project from db' }
        },
        save(task) {
            console.log(`Saving project "${task.name}" to db`);
        }

    }
}
module.exports = repo();