var planListResults = null;
function queryPlanData(date, keyword){
  var results = DBManager.searchPlan(date, keyword);
  planListResults = results;

  planListNotifyDataSetChanged();
}

function showPlanPopup() {
  $("#plan_modal").modal('setting', 'closable', false).modal('show');
}

function removePlanListItem(planId) {
  if (planListResults != null) {
    var length = planListResults.length;
    for(var i=0; i<length; i++) {
      var plan = planListResults[i];
      if (plan.getId() == planId) {
        planListResults.splice(i, 1);
        break;
      }
    }

    if (length != planListResults.length) {
      planListNotifyDataSetChanged();
    }
  }
}

function planListNotifyDataSetChanged(){
  if (planListResults != null) {
    var length = planListResults.length;
    if(length > 0) {
      $("#plan_list").css("visibility", "visible");
    }else {
      $("#plan_list").css("visibility", "hidden");
    }
    var planListView = $("#list_items_container");
    planListView.empty();

     for(var i=0; i<length; i++) {
       var plan = planListResults[i];
       planListView.append($(plan.toHTML()));
     }
  }
}
