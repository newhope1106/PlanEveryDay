$(document).ready(function(){
  $("#header_title_btn").popup({
    popup:$('#popup_header_title_edit'),
    on: 'click'
  });
  $("#title_input").val($("#header_title_btn").text());

  $("#save_title_btn").click(function(){
    var oldTitleValue = $("#header_title_btn").text();
    var newTitleValue = $("#title_input").val();
    if(newTitleValue == null || newTitleValue=="") {
      showToast("标题不能为空");
    } else if(newTitleValue != oldTitleValue){
      $("#header_title_btn").text(newTitleValue);
    }
    $("#header_title_btn").popup("hide");

    $("#title_input").val($("#header_title_btn").text());
  });

  $("#new_task_btn").click(function(){
    showTaskPopup($("#header_title_btn").text());
  });
});
