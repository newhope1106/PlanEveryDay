var DBManager = {
  planMap:new HashMap(),
  taskMap:new HashMap,
  pageOffset:10,
  searchPlan:function(date, keyword, page){
    var planMap = DBManager.planMap;
    planMap.clear();
    //below, we just a test
    var testLength = 10;
    var results = new Array();
    for (var i=0; i<testLength; i++) {
      var plan = new Plan("2016年第" + i + "周工作安排", i, "2016-01-" + (i<10?"0"+i:i), "none");
      results[i] = plan;
      planMap.put(plan.getId(), plan);
    }

    return results;
  },
  queryTask:function(planId){
    var taskMap = DBManager.taskMap;
    taskMap.clear();

    //below, we just a test
    var testLength = 10;
    var results = new Array();
    for (var i=0; i<testLength; i++) {
      var task = new Task("这是任务" + i, "我一定要完成它", i%2==0?0:1, i,  "2016-01-" + (i<10?"0"+i:i), "none");
      results[i] = task;
      taskMap.put(task.getId(), task);
    }
    return results;
  },
  getPlan : function(planId){
    return DBManager.planMap.get(planId);
  },
  getTask : function(taskId) {
    return DBManager.taskMap.get(taskId);
  }
}
