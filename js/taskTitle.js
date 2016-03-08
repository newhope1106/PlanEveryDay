$(document).ready(function(){
  $("#edit_or_save_title_btn").click(function(){
    var value = $("#edit_or_save_title_btn").text();
    if (value == "编辑大标题") {
      translateToEditTitle();
    } else {
      translateToSaveTitle();
    }
  });
});

function translateToEditTitle(){
  $("#edit_or_save_title_btn").text("保存大标题");
  $("#header_input_title").val($("#header_view_title").text());
  $("#header_view_title").css("display", "none");
  $("#header_input_title_container").css("display", "inline");
}

function translateToSaveTitle(){
  $("#edit_or_save_title_btn").text("编辑大标题");
  $("#header_input_title_container").css("display", "none");
  $("#header_view_title").text($("#header_input_title").val());
  $("#header_view_title").css("display", "inline");
}
