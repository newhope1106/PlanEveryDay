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
  				alert("create a plan");
  			}
      }
  	]);
  } else if (type == "task") {
    context.init({preventDoubleContext: false});
  	context.attach(parentSelector, [
  		{
        text: '新建任务',
        action: function(e, currentContextSelector){
  				alert(currentContextSelector.attr("attr-id"));
  			}
      },
  	  {
       text: '删除计划',
        action: function(e, currentContextSelector){
          if(currentContextSelector != undefined) {
            alert(currentContextSelector.attr("attr-id"));
          }
          alert("delete a pan");
        }
      }
  	], childSelector);
  }

}
