$(document).ready(function(){
  $("#search_plan_btn").click(function(){
    var date = $("#date_label").text();
    var keyword = $("#search_keyword").val();
    queryPlanData(date, keyword);
  });

  $("#task_table").on("click", ".task_edit_link", function(){
    var taskId = $(this).attr("attr-id");
    var task = DBManager.getTask(taskId);
    showTaskPopup($("#header_title_btn").text(), taskId, task.getTitle(), task.getContent());
  })

  $("#task_table").on("click", ".task_delete_link", function(){
    var taskId = $(this).attr("attr-id");
    var task = DBManager.getTask(taskId);


    deleteAlertDialog("确定要删除?", "将会删除该任务!", "warning", function(callback){
        removeTaskListItem(taskId);
        task.delete();

        if (callback != null) {
         callback();
       }
     });
  })
});
