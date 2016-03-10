$(document).ready(function(){
  $("#task_save_btn").click(function(){
    alert($("#task_title").val() + ", " + $("#task_content").val()
    + ", " + $("#task_id_input").val());
  });

  $("#plan_save_btn").click(function(){
    alert("plan title : " + $("#plan_title").val());
  });
});
