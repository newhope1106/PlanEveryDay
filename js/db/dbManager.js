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
      filter.title = keyword;
    }

    planDB.find(filter , function(err, docResults){
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
  queryTask:function(planId){
    //below, we just a test
    var testLength = 10;
    var results = new Array();
    for (var i=0; i<testLength; i++) {
      var task = new Task("这是任务" + i, "我一定要完成它", i%2==0?0:1, i + "",  "2016-01-" + (i<10?"0"+i:i), "none");
      results[i] = task;
    }
    return results;
  },
  savePlan : function(plan){
    var db = this.database.planDB;
    if (plan != null) {
      if (plan.getId() != null || plan.getId() != "") {
        db.insert(plan.toJSON(), function (err, newDoc) {   // Callback is optional
          console.log(err);
          console.log(newDoc);
        });
      } else {

      }
    }
  }
}
