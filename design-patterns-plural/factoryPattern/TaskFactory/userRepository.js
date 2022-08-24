// this file do request to DB
var repo = function () {
    var db = {}


    return {
        get(id) {
            console.log('Getting user ' + id);
            return { name: 'new taks from db' }
        },
        save(user) {
            console.log(`Saving user "${user.name}" to db`);
        }

    }
}
module.exports = repo();