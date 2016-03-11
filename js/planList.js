function initialPlanListTestData(date, keyword){
  var results = DBManager.searchPlan(date, keyword);
  var length = results.length;
  var planListView = $("#list_items_container");
  planListView.empty();

   for(var i=1; i<=length; i++) {
     var plan = results[i];
     var planListItem = createPlanListItem(plan.getTitle(),
      "创建日期：" + plan.getCreateDate(), plan.getId());
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

function showPlanPopup() {
  $("#plan_modal").modal('setting', 'closable', false).modal('show');
}
