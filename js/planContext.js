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
        action: function(e){
  				alert("create a task");
          console.log(e);
  			}
      },
  	  {
       text: '删除计划',
        action: function(e){
          alert("delete a pan");
        }
      }
  	], childSelector);
  }

}
