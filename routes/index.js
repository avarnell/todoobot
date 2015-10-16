var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/toDobot')
var Tasks = db.get('tasks')


/* GET home page. */
router.get('/', function(req, res, next) {
  Tasks.find({}, function(error,data){
    var health = []
    var wealth = []
    var soul = []

    data.forEach(function(task){
      if(task.type == 'health') health.push(task)
      if(task.type == 'wealth') wealth.push(task)
      if(task.type == 'soul') soul.push(task)
    })

    res.render('index', { 
      title: 'toDoobot',
      health : health,
      wealth : wealth,
      soul : soul
    });
  })
  
});

router.post('/addtask', function(req,res,next){
  Tasks.insert({type : req.body.catagory, 
    task: req.body.task}, 
    function(error,data){
      res.redirect('/')

  })
})

module.exports = router;
