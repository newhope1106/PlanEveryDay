$(document).ready(function(){
  attachContextEvent("#plan_list", "plan");
  attachContextEvent("#list_items_container", "task", ".item");
});

function attachContextEvent(childSelector, type, parentSelector) {
  if (type == "plan") {
    context.init({preventDoubleContext: false});
  	context.attach(childSelector, [
  		{
        text: '新建计划',
        action: function(e){
  				showPlanPopup();
  			}
      }
  	]);
  } else if (type == "task") {
    context.init({preventDoubleContext: false});
  	context.attach(parentSelector, [
  		{
        text: '新建任务',
        action: function(e, currentContextSelector){
          if (currentContextSelector != undefined) {
            var planTitle = currentContextSelector.find(".header:first-child").text();
            showTaskPopup(planTitle, currentContextSelector.attr("attr-id"));
          }
  			}
      },
  	  {
       text: '删除计划',
        action: function(e, currentContextSelector){
          if(currentContextSelector != undefined) {
            deleteAlertDialog("确定要删除?", "将会删除所有的任务!", "warning", function(callback){
              alert("planId = " + currentContextSelector.attr("attr-id"));
              currentContextSelector.remove();
              if (callback!=null) {
                callback()
              }
            });
          }
        }
      }
  	], childSelector);
  }

}
