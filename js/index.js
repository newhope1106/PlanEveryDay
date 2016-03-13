$(document).ready(function(){
  $("#search_plan_btn").click(function(){
    var date = $("#date_label").text();
    var keyword = $("#search_keyword").val();
    queryPlanData(date, keyword);
  });

  $("#task_table").on("click", ".task_edit_link", function(){
    alert($(this).html());
  })

  $("#task_table").on("click", ".task_delete_link", function(){
    alert($(this).html());
  })
});
