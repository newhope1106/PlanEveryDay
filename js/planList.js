function initialPlanListTestData(date, keyword){
  var results = DBManager.searchPlan(date, keyword);
  var length = results.length;
  var planListView = $("#list_items_container");
  planListView.empty();

   for(var i=0; i<length; i++) {
     var plan = results[i];
     planListView.append($(plan.toHTML()));
   }
}

function showPlanPopup() {
  $("#plan_modal").modal('setting', 'closable', false).modal('show');
}
