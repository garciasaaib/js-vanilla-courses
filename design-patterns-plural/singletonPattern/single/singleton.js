var TaskRepo = (function () {
    var taskRepo;
    function createRepo() {
        var taskRepo = new Object("Task");
        return taskRepo;
    }

    return {
        // closure saves taskRepo first time is created
        // second or extra time, is returned the same taskRepo
        getInstance: function () {
            if (!taskRepo) taskRepo = createRepo
            return taskRepo
        }
    }
})();

var repo1 = TaskRepo.getInstance();
var repo2 = TaskRepo.getInstance();

if(repo1 === repo2) console.log('Same TaskRepo');