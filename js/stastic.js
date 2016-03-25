var stasticChart = null;
function showStasticInfo() {
  DBManager.stastic(function(totalPlanCount, totalTaskCount, completedTaskCount){
    if (totalPlanCount <=0) {
      showToast("统计结果为空");
    } else {
      $('#linear_modal').modal('show');
      var option = {
          tooltip : {
              trigger: 'item'
          },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          legend: {
              data:['计划总计', '任务总计', '已完成任务总计'],
              itemGap: 5
          },
          grid: {
              top: '12%',
              left: '1%',
              right: '10%',
              width: '95%',
              containLabel: true
          },
          xAxis: [
              {
                  type : 'category',
                  data:['数据统计'],
                  axisLabel :{
                    show:true,
                    interval:0,
                    textStyle:{
                      corlor:'#333'
                    }
                  }
              }
          ],
          yAxis: [
              {
                  type : 'value',
                  name : '单位/个',
              }
          ],
          barWidth:40,
          series : [
              {
                  name: '计划总计',
                  type: 'bar',
                  data: [totalPlanCount],
                  barMinHeight:1,
              },
              {
                  name: '任务总计',
                  type: 'bar',
                  data: [totalTaskCount],
                  barMinHeight:1,
              },
              {
                  name: '已完成任务总计',
                  type: 'bar',
                  data: [completedTaskCount],
                  barMinHeight:1,
              }
          ]
      };

      if (stasticChart == null) {
        stasticChart = echarts.init(document.getElementById("pop_canvas"));
      }
      stasticChart.setOption(option);
    }
  });
}
