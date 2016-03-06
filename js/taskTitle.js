$(document).ready(function(){
  $("#edit_or_save_title_btn").click(function(){
    var value = $("#edit_or_save_title_btn").text();
    if (value == "编辑标题") {
      translateToEditTitle();
    } else {
      translateToSaveTitle();
    }
  });
});

function translateToEditTitle(){
  $("#edit_or_save_title_btn").text("保存标题");

}

function translateToSaveTitle(){
  $("#edit_or_save_title_btn").text("编辑标题");
}
