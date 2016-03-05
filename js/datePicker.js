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
      data: [
        {
          date: '2015/12/24',
          value: 'Christmas Eve'
        },
        {
          date: '2015/12/25',
          value: 'Merry Christmas'
        },
        {
          date: '2016/01/01',
          value: 'Happy New Year'
        },
        {
          date: '2016/03/08',
          value : 'Happy Women\'s Day'
        },
        {
          date: '2016/04/01',
          value : 'April Fools\' Day'
        },
        {
          date: '2016/05/01',
          value : 'Labour Day'
        },
        {
          date: '2016/06/01',
          value : 'Happy Children\'s Day'
        },
        {
          date: '2016/09/10',
          value : 'Happy Teacher\'s Day'
        },
        {
          date: '2016/10/01',
          value : 'National Day'
        }
      ],
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
