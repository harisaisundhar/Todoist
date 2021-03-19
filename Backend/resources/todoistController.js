var mongoose = require("mongoose");
var Task = mongoose.model("Tasks");
//To start mongo db
//brew services start mongodb-community
// To stop mongo db
//brew services stop mongodb-community

//http://localhost:8000/tasks
exports.t_GetAll = async(req, res) => {
  console.log("Sending All data")
  Task.find({}, (err, todo) => {
    if (err) res.send(err);
    res.json(todo);
  });
};

//http://localhost:8000/tasks
//{
//    "name" : "clab_backend",
//    "status" : "pending",
//}
exports.t_Post = async(req, res) => {
  console.log(req.body.status)
  var newTodo = new Task(req.body);
  newTodo.save((err, todo) => {
    if (err) res.send(err);
    res.json({ message: "Task is added successfully", todo });
  });
};

//http://localhost:8000/tasks/60506bef8e9e0b0d0636b159
exports.t_Get = (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.id)
    Task.findById(id)        
        .lean().exec(function (err, results) {
        if (err) return console.error(err)
        try {
          res.json(results);
        } catch (error) {
            console.log("errror getting results")
            console.log(error)
        } 
    })
};

//http://localhost:8000/tasks/clab_backend
//{
//    "name" : "clab_backend",
//    "status" : "done",
//}
exports.t_Put = (req, res) => {
  console.log(req.body)
  Task.findOneAndUpdate({ name: req.params.id}, req.body, (err, todo) => {
    if (err) res.send(err);
    res.json({ message: "Task is updated successfully", todo });
  });
};

//http://localhost:8000/tasks/clab_backend
exports.t_Delete = (req, res) => {
  console.log(req.params)
  Task.remove({name: req.params.id}, (err, todo) => {
    if (err) res.send(err);
    res.json({message: "Task is deleted successfully", todo});
  });
};
