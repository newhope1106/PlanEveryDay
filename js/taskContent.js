$(document).ready(function(){
  $("#new_or_save_task_btn").click(function(){
    var value = $("#new_or_save_task_btn").text();
    if (value == "新建任务") {
      translateToEditTask();
    } else if(value == "保存任务"){
      translateToViewTask();
    }
  });
});

function translateToEmptyTask(){
  $("#tab_group").children("div.active").removeClass("active");
  $("#task_none_tab").addClass("active");
  $("#save_all_btn").css("display", "none");
}

function translateToViewTask() {
  $("#new_or_save_task_btn").text("新建任务");
  $("#tab_group").children("div.active").removeClass("active");
  $("#task_view_tab").addClass("active");
  $("#save_all_btn").css("display", "none");
}

function translateToEditTask() {
  $("#new_or_save_task_btn").text("保存任务");
  $("#save_all_btn").css("display", "inline");
  $("#tab_group").children("div.active").removeClass("active");
  $("#task_edit_tab").addClass("active");
  initializeEditorIfNeeded();
}
