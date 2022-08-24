var repoFactory = function () {
    var repos = this;
    
    // have another repository? add it here!
    var repoList = [
        { name: 'task', source: './taskRepository' },
        { name: 'user', source: './userRepository' },
        { name: 'project', source: './projectRepository' },
    ];

    // initialize every require to its repository in this
    repoList.forEach(function (repo) {
        repos[repo.name] = require(`${repo.source}`)
    });
}
module.exports = new repoFactory;