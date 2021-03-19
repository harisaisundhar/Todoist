module.exports = (app) => {
  const todoController = require("./todoistController");

  //Middleware
  const log = (req, res, next) => {
    console.log('Whaaaaat ?????');
    console.log(req.body)
    console.log(req.params)
    next()
  }

  app.get("/", (req, res) => {
    res.send("Hello welcome");
  });

  app.route("/tasks")
  .get(todoController.t_GetAll)
  .post(todoController.t_Post)


  app.route("/tasks/:id")
    .get(todoController.t_Get)
    .put(todoController.t_Put)
    .delete(todoController.t_Delete)
  
  app.get("*", log, (req, res) => {
    res.send('Yet in production', 404);
  });
};
