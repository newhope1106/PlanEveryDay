var DBManager = {
  pageOffset:10,
  database:{},
  init:function(){
    var database = this.database;
    var Datastore = require('nedb');
    database.planDB = new Datastore({ filename: 'plan.db', autoload: true });
    database.taskDB = new Datastore({ filename: 'task.db', autoload: true });
  },
  searchPlan:function(date, keyword, page, callback){
    var filter = {};
    var planDB = this.database.planDB;

    if(date != null && date != "") {
      filter.createDate = date;
    }

    if (keyword != null && keyword != "") {
      filter.title = {$regex : eval('/' + keyword + '/')};
    }

    planDB.find(filter).sort({createDate : -1}).exec(function(err, docResults){
      var results = new Array();
      if(docResults != null) {
        var length = docResults.length;
        for (var i=0; i<length; i++) {
          var result = docResults[i];
          var plan = new Plan(result.title, result._id, result.createDate, result.lastUpdateDate);
          results[i] = plan;
        }
      }

      if (callback != null) {
        callback(results);
      }
    });
  },
  queryTask:function(planId, callback){
    var taskDB = this.database.taskDB;

    if(planId != null && planId != "") {
      taskDB.find({planId:planId}, function(err, docResults){
        var results = new Array();
        if(docResults != null) {
          var length = docResults.length;
          for (var i=0; i<length; i++) {
            var result = docResults[i];
            var task = new Task(result.title, result.content,
            result.status, result._id,  result.createDate, result.lastUpdateDate, result.planId);
            results[i] = task;
          }
        }

        if (callback != null) {
          callback(results);
        }
      });
    }
  },
  savePlan : function(plan, callback){
    var db = this.database.planDB;
    if (plan != null) {
      if (plan.getId() == null || plan.getId() == "") {
        db.insert(plan.toJSON(), function (err, newDoc) {   // Callback is optional
          if(newDoc != null) {//数据一致性
            plan.setId(newDoc._id);
            plan.setCreateDate(newDoc.createDate);
            plan.setLastUpdateDate(newDoc.lastUpdateDate);
          }

          if (callback != null) {
            callback();
          }
        });
      } else {
        db.update({_id:plan.getId()}, {$set : plan.toJSON()},{}, function (err, numReplaced){
          console.log(err);
          console.log(numReplaced);
          if (numReplaced > 0) {//数据一致性
            plan.setTitle(plan.getTitle());
            plan.setCreateDate(plan.getCreateDate());
            plan.setLastUpdateDate(plan.getLastUpdateDate());
          }

          if (callback != null) {
            callback();
          }
        });
      }
    }
  },
  deletePlan : function(planId, callback){
    if (planId != null && planId != "") {
      var db = this.database.planDB;
      db.remove({ _id: planId }, {}, function (err, numRemoved) {
        // numRemoved = 1
        if (callback != null) {
          callback();
        }
      });
    }
  },
  saveTask : function(task, callback) {
    var db = this.database.taskDB;
    if (task != null) {
      if (task.getId() == null || task.getId() == "") {
        db.insert(task.toJSON(), function (err, newDoc) {   // Callback is optional
          if (newDoc != null) {//数据一致性
            task.setId(newDoc._id);
            task.setPlanId(newDoc.planId);
            task.setCreateDate(newDoc.createDate);
            task.setLastUpdateDate(newDoc.lastUpdateDate);
          }
          if (callback != null) {
            callback();
          }
        });
      } else {
        db.update({_id:task.getId()}, {$set : task.toJSON()},{}, function (err, numReplaced){
          console.log(err);
          console.log(numReplaced);

          if (numReplaced > 0) {//数据一致性
            task.setTitle(task.getTitle());
            task.setContent(task.getContent());
            task.setStatus(task.getStatus());
            task.setCreateDate(task.getCreateDate());
            task.setLastUpdateDate(task.getLastUpdateDate());
          }

          if (callback != null) {
            callback();
          }
        });
      }
    }
  },
  deleteTask : function(taskId, callback){
    if (taskId != null && taskId != "") {
      var db = this.database.taskDB;
      db.remove({ _id: taskId }, {}, function (err, numRemoved) {
        // numRemoved = 1
        if (callback != null) {
          callback();
        }
      });
    }
  }
}
