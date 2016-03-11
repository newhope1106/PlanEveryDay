$(document).ready(function(){
  $("#search_plan_btn").click(function(){
    var date = $("#date_label").text();
    var keyword = $("#search_keyword").val();
    initialPlanListTestData(date, keyword);
  });
});
