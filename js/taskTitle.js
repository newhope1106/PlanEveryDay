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

  $("#delete_all_btn").click(function(){
    swal({
      title: "确定要删除?",
      text: "将会删除所有的任务!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm) {
        swal("删除成功!", "该计划的所有任务都被删除.", "success");
      } else {
    	  swal("取消删除", "取消删除操作 :)", "error");
      }
    });
  });
});
