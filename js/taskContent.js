$(document).ready(function(){
  initialTestData();
});

function initialTestData() {
  var length = 10;
  var taskListNode = $("#task_table");
  taskListNode.empty();
  for(var i=1; i<=length; i++) {
    taskListNode.append(createTaskListItem("这是任务" + i, "创建日期是1901-01-01", i%2==0?"完成":"未完成"));
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
    $("#task_editor").val(content);
  } else {
    $("#task_editor").val("");
  }


  if (typeof(taskId) == "number" || typeof(taskId) == "string") {
    $("#task_id_input").val(taskId);
  } else{
    $("#task_id_input").val(-1);
  }

  $("#task_modal").modal('setting', 'closable', false).modal('show');

  initializeEditorIfNeeded();
}

function createTaskListItem(taskTitle, taskContent, status) {
  return $('<tr><td><div class="title active"><i class="dropdown icon"></i>'
          + taskTitle + '</div><div class="content"><p style="display: block ! important;" class="transition visible">'
          + taskContent + '</p></div></td><td>'
          + status + '</td><td>Edit</td></tr>');
}
