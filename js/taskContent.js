$(document).ready(function(){
  // $("#task_modal").modal({
  //   onVisible:function(){
  //
  //   }
  // });
});

function showTaskPopup(header, title, content, taskId) {
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

  if (typeof(taskId) == "number") {
    $("#task_id_input").val(taskId);
  } else {
    $("#task_id_input").val(-1);
  }

  $("#task_modal").modal('setting', 'closable', false).modal('show').modal();

  initializeEditorIfNeeded();
}
