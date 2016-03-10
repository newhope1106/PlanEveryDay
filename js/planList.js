$(document).ready(function(){
  initialPlanListTestData();
});

function initialPlanListTestData(){
  var length = 10;
  var planListView = $("#list_items_container");
  planListView.empty();

   for(var i=1; i<=length; i++) {
     var planListItem = createPlanListItem("2016年第" + i + "周工作安排",
      "创建日期：2016-01-" + (i<10?"0"+i:i), i);
     planListView.append(planListItem);
   }
}

function createPlanListItem(planTitle, planDescription, planId){
  return $('<div class="item" attr-id='
          + planId +'><i class="file icon"></i>'
          +'<div class="content"><div class="header">'
          + planTitle + '</div><div class="description">'
          + planDescription + '</div></div></div>');
}
