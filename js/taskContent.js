var taskListResults = null;
function queryTaskData(planId) {
  taskListResults = DBManager.queryTask(planId);

  var plan = DBManager.getPlan(planId);
  $("#header_title_btn").text(plan.getTitle());
  $("#title_input").val($("#header_title_btn").text());
  $("#header_title_btn").attr("attr-plan-id", planId);

  taskListNotifydatasetChanged();
}

function taskListNotifydatasetChanged() {
  if (taskListResults != null) {
    var length = taskListResults.length;
    var taskListNode = $("#task_table");
    taskListNode.empty();
    for(var i=0; i<length; i++) {
      var task = taskListResults[i];
      taskListNode.append($(task.toHTML()));
    }
  }
}

function removeTaskListItem(taskId){
  if (taskListResults != null) {
    var length = taskListResults.length;

    for(var i=0; i<length; i++) {
      var task = taskListResults[i];
      if (task.getId() == taskId) {
        taskListResults.splice(i, 1);
        break;
      }
    }

    if (length != taskListResults.length) {
      taskListNotifydatasetChanged();
    }
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
