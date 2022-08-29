### No factory

- Simplify object creation.
- The factory works when I don’t want the factory creation method in the controller.
- A wrapper of several creational methods.

En un ejemplo, podriamos comparar con las fabricas chinas, un Iphone tiene sus fabricas y sus ensabladoras. Factory se refiere a las fabricas que crean masivamente varias piezas para un mismo tipo de producto.

```jsx
// no having a factory
// lots of creational repos
var Task = require('./task.js')

// 3 repo type called
var taskRepo= require('./taskRepository.js')
var userRepo= require('./userRepository.js')
var projectRepo= require('./projectRepository.js')

var task1 = new Task(taskRepo.get(1));

var user = userRepo.get(1)
var project = projectRepo.get(1)

task1.user = user
task1.project = project
```

### factory v1

```jsx
// Factory version 1
/** Closure that contains the function to connect all the repoTypes 
if you want to use it, type per example*/

var repoFactory = require('./repoFactory.js')
var Task = require('./task.js')

var task1 = new Task(repoFactory.getRepo('task').get(1))
var user1 = repoFactory.getRepo('user').get(1))
var project1 = repoFactory.getRepo('project').get(1))

task1.user = user1
task1.project = project1

task1.save() 

*/
var repoFactory = function () {

    this.getRepo = function (repoType) {
        if (repoType === 'task') {
            if (this.taskRepo) return this.taskRepo // 
            else {
                this.taskRepo = require('./taskRepository')()
                return this.taskRepo;
            }
        }
        if (repoType === 'user') {
            var userRepo = require('./userRepository')()
            return userRepo
        }
        if (repoType === 'project') {
            var projectRepo = require('./projectRepository')()
            return projectRepo
        }
    }
}

module.exports = new repoFactory;
```

- Final Factory
    
    ```jsx
    // Factory version 2
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
    ```
    
    ```jsx
    var Task = require('./task.js')
    var repoFactory = require('./repoFactory.js')
    
    // new objects Task type, and all save the values of this, that is the constructor
    var task1 = new Task(repoFactory.task.get(1));
    var task2 = new Task(repoFactory.task.get(2));
    
    var user = repoFactory.user.get(1)
    var project = repoFactory.project.get(1)
    
    task1.user = user
    task1.project = project
    
    task1.save() // 'saving Task: modules'
    ```