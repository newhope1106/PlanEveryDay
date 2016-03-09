$(document).ready(function(){
  attachContextEvent("#plan_list", "plan");
});

function attachContextEvent(nodeId, type) {
  if (type == "plan") {
    context.init({preventDoubleContext: false});
  	context.attach(nodeId, [
  		{
        text: '新建计划',
        action: function(e){
  				alert("create a plan");
  			}
      }
  	]);
  } else if (type == "task") {
    context.init({preventDoubleContext: false});
  	context.attach(nodeId, [
  		{
        text: '新建任务',
        action: function(e){
  				alert("create a task");
  			}
      },
  	  {
       text: '删除计划',
        action: function(e){
          alert("delete a pan");
        }
      }
  	]);
  }

}
