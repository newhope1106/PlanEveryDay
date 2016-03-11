var DBManager = {
  pageOffset:10,
  searchPlan:function(date, keyword, page){
    //below, we just a test
    var testLength = 10;
    var results = new Array();
    for (var i=0; i<testLength; i++) {
      results[i] = new Plan("2016年第" + i + "周工作安排", i, "2016-01-" + (i<10?"0"+i:i), "none");
    }

    return results;
  },
  queryTask:function(planId){
    //below, we just a test
    var testLength = 10;
    var results = new Array();
    for (var i=0; i<testLength; i++) {
      results[i] = new Task("这是任务" + i, "我一定要完成它", i%2==0?0:1, i,  "2016-01-" + (i<10?"0"+i:i), "none");
    }

    return results;
  }
}
