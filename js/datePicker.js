$(document).ready(function(){
  $("#view_special_date_plan").popup({
    popup : $('#date_picker'),
    on    : 'click'
  });

  $("#label_delete").click(function(){
    $("#date_label_container").css("display", "none");
    $("#date_label").html('');
  });

  $('#date_picker').calendar({
      format: 'yyyy-mm-dd',
      width: 280,
      height: 280,
      onSelected: function (view, date, data) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        $("#date_label").html(year + '-' + (month<10?'0'+ month:''+month) + '-' +  (day<10?'0'+ day:''+day));
        $("#date_label_container").css("display", "inline");

        $("#view_special_date_plan").popup('hide');
      },
      onClose: function (view, date, data) {
           console.log('event: onClose')
           console.log('view:' + view)
           console.log('date:' + date)
           console.log('data:' + (data || 'None'));
      }
  });
});
