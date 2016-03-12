function initialTestData(planId) {
  var results = DBManager.queryTask(planId);
  var plan = DBManager.getPlan(planId);
  $("#header_title_btn").text(plan.getTitle());
  $("#header_title_btn").attr("attr-plan-id", planId);
  var length = results.length;
  var taskListNode = $("#task_table");
  taskListNode.empty();
  for(var i=0; i<length; i++) {
    var task = results[i];
    taskListNode.append($(task.toHTML()));
  }
}

function showTaskPopup(header, taskId, title, content) {
  if(header != null) {
    $("#task_header_name").text(header);
  }

  if (title != null) {
    $("#task_title").val(title);
  } else {
    $("#task_title").val("");
  }

  if (content != null) {
    $("#task_content").val(content);
  } else {
    $("#task_content").val("");
  }

  if (typeof(taskId) == "number" || typeof(taskId) == "string") {
    $("#task_id_input").val(taskId);
  } else{
    $("#task_id_input").val(-1);
  }

  $("#task_modal").modal('setting', 'closable', false).modal('show');

  initializeEditorIfNeeded();
}
