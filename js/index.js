var planListView=null, taskListView=null;

$(document).ready(function(){
  DBManager.init();//初始化数据库
  initPlanListView();
  initTaskListView();

  initTaskHeaderEvent();
  initTaskContentEvents();

  initPlanListEvents();

  initClickEvents();

  queryPlanData();

  initializeEditorIfNeeded();
});

//初始化任务栏的计划标题事件
function initTaskHeaderEvent(){
  $("#header_title_btn").click(function(){
    var value = $("#header_title_label").text();
    if (value != "取消编辑") {
      $("#header_title_label").text("取消编辑");
      $("#header_task_title").css("display", "none").removeClass("translate_ani");
      $("#header_title_edit").css("display", "inline-flex").addClass("translate_ani");
    } else {
      $("#header_title_label").text("编辑标题");
      $("#header_task_title").css("display", "inline").addClass("translate_ani");
      $("#header_title_edit").css("display", "none").removeClass("translate_ani");
    }
  });

  $("#save_title_btn").click(function(){
    var oldTitleValue = $("#header_task_title").text();
    var newTitleValue = $("#title_input").val();
    if(newTitleValue == null || newTitleValue=="") {
      showToast("标题不能为空");
    } else if(newTitleValue != oldTitleValue){
      $("#header_task_title").text(newTitleValue);
    }

    $("#header_task_title").css("display", "inline");
    $("#header_title_edit").css("display", "none");

    $("#title_input").val($("#header_task_title").text());

    var planId = $("#header_task_title").attr("attr-plan-id");
    if(planListView != null){
      var plan = planListView.getItemById(planId);
      if (plan != null) {
        plan.updateTitle($("#header_task_title").text());
        DBManager.savePlan(plan, function(){
          planListView.notifyDataSetChanged();
        });
      }
    }
  });

  //新建任务
  $("#new_task_btn").click(function(){
    showTaskEditView($("#header_task_title").text());
  });

  $("#delete_all_btn").click(function(){
    deleteAlertDialog("确定要删除?", "将会删除计划的所有任务!", "warning", function(callback){
      deletePlan($("#header_task_title").attr("attr-plan-id"));

      if (callback != null) {
        callback("该计划的所有任务都被删除");
      }
    });
  });
}

//初始化任务的编辑和删除事件
function initTaskContentEvents(){
  $("#task_list").on("click", ".task_view_link", function(){
    var taskId = $(this).attr("attr-id");
    var task = taskListView.getItemById(taskId);
    translateToViewTask();
    $("#task_view_title").text(task.getTitle());
    $("#task_view_status").html("最近更新时间:" + task.getLastUpdateDate()
    + "&nbsp;&nbsp;" + (task.isFinished()?"完成":"未完成"));
    $("#task_view_content").html(task.getContent());
  })

  $("#task_view_back_btn").on("click", function(){
    translateToTaskContent();
  });

  $("#task_list").on("click", ".task_edit_link", function(){
    var taskId = $(this).attr("attr-id");
    var task = taskListView.getItemById(taskId);

    showTaskEditView($("#header_task_title").text(), taskId, task.getTitle(), task.getContent(), task.isFinished());
  })

  $("#task_list").on("click", ".task_delete_link", function(){
    var taskId = $(this).attr("attr-id");

    deleteAlertDialog("确定要删除?", "将会删除该任务!", "warning", function(callback){
        deleteTask(taskId);

        if (callback != null) {
         callback("该任务被删除");
       }
     });
  });
}

//初始化列表的菜单和点击事件
function initPlanListEvents(){
  //输入框添加回车事件
  $("#search_keyword").keydown(function(e){
    if (e.keyCode == 13) {
      var date = $("#date_label").text();
      var keyword = $("#search_keyword").val();
      queryPlanData(date, keyword);
    }
  });

  //每个计划列表的元素添加点击事件
  $("#list_items_container").on("click", ".item",  function(){
    var planItem = $(this);
    planItem.addClass('active')
            .siblings()
            .removeClass('active');
    queryTaskData(planItem.attr("attr-id"));
    translateToTaskContent();
  });

  attachContextEvent("#plan_list", "plan");
  attachContextEvent("#list_items_container", "task", ".item");

  //添加滑动列表事件
  $("#plan_list").bind('mousewheel', function(event) {
    event.preventDefault();
    var scrollTop = this.scrollTop;
    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
    //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
  });
}

//初始化点击事件
function initClickEvents(){
  $("#search_plan_btn").click(function(){
    var date = $("#date_label").text();
    var keyword = $("#search_keyword").val();
    queryPlanData(date, keyword);
  });

  $("#task_save_btn").click(function(){
    var taskId = $("#task_id_input").val();
    var status = $("#task_status_checkbox").checkbox("is checked")?1:0;
    var task = null;
    var taskTitle = $("#task_title").val();
    if (taskTitle==null || taskTitle == "") {
      showToast("任务标题不能为空");
      return ;
    }

    if(taskId == null || taskId == "") {
      task = new Task(taskTitle , getTaskEditContent("task_content"),
          $("#task_id_input").val(), 0, null, null, $("#header_task_title").attr("attr-plan-id"), status);
      DBManager.saveTask(task, function(){
        if(taskListView != null) {
          taskListView.insertItem(task);
        }
      });
    } else {
      task = taskListView.getItemById(taskId);
      task.updateTitle($("#task_title").val());
      task.updateContent(getTaskEditContent("task_content"));
      task.updateStatus(status);

      DBManager.saveTask(task, function(){
        taskListView.notifyDataSetChanged();
      });
    }

    translateToTaskContent();
  });

  $("#plan_save_btn").click(function(){
    var plan = new Plan($("#plan_title").val(), null, null, null);
    DBManager.savePlan(plan, function(){
      var date = $("#date_label").text();
      var keyword = $("#search_keyword").val();
      queryPlanData(date, keyword);
    });
  });

  $("#task_cancel_btn").click(function(){
    translateToTaskContent();
  });

  $("#task_status_checkbox").checkbox();
}

//删除计划
function deletePlan(planId){
  if ($("#header_task_title").attr("attr-plan-id") == planId) {
    translateToAboutContent();
  }

  if (planListView != null){
    DBManager.deletePlan(planId, function(){
      planListView.removeItem(planId);
      var count = planListView.getCount();
      if(count <= 0){
        $("#list_items_container").css("display", "none");
        $("#plan_list_empty_view").css("display", "block");
      }
    });
  }
}

//删除任务
function deleteTask(taskId){
  if (taskListView != null){
    var task = taskListView.getItemById(taskId);
    if (task!= null) {
      DBManager.deleteTask(taskId, function(){
        taskListView.removeItem(taskId);
      });
    }
  }
}

//初始化计划列表
function initPlanListView(){
  planListView = new ListView();
  //planListView.setEmptyView($("#plan_list"));
  planListView.setListView($("#list_items_container"));
}

//初始化任务列表
function initTaskListView(){
  taskListView = new ListView();
  taskListView.setListView($("#task_list"));
}

//显示新建计划弹出框
function showPlanPopup() {
  $("#plan_modal").modal('setting', 'closable', false).modal('show');
}

/**
** 查询计划，如果为空，则按照日期降序，查询所有
** @param keyword 关键字
*/
function queryPlanData(date, keyword){
  DBManager.searchPlan(date, keyword, 0,function(results){
    if (planListView != null) {
      if (results.length > 0) {
        $("#list_items_container").css("display", "block");
        $("#plan_list_empty_view").css("display", "none");
      } else {
        $("#list_items_container").css("display", "none");
        $("#plan_list_empty_view").css("display", "block");
      }
      planListView.changeData(results);
    }
  });

}

/**
** 查询对应的任务
** @param planId 计划id
*/
function queryTaskData(planId){
  var results = DBManager.queryTask(planId, function(results){
    var plan = planListView.getItemById(planId);
    $("#header_task_title").text(plan.getTitle());
    $("#title_input").val($("#header_task_title").text());
    $("#header_task_title").attr("attr-plan-id", planId);

    if (taskListView != null) {
      taskListView.changeData(results);
      $('.ui.accordion').accordion();
    }
  });
}

/**
** 显示新建或编辑任务界面
** @param header 计划标题
** @param taskId 任务id
** @param title 任务title
** @param content 任务内容
*/
function showTaskEditView(header, taskId, title, content, isFinished) {
  translateToEditTask();

  if(header != null) {
    $("#task_header_name").text(header);
  }

  if (title != null) {
    $("#task_title").val(title);
  } else {
    $("#task_title").val("");
  }

  if (content != null) {
    //$("#task_content").val(content);
    tinymce.get("task_content").setContent(content);
  } else {
    //$("#task_content").val("");
    tinymce.get("task_content").setContent("");
  }

  if (taskId != null && taskId != "") {
    $("#task_id_input").val(taskId);
  } else{
    $("#task_id_input").val("");
  }

  if(isFinished != null) {
    if (isFinished) {
      $("#task_status_checkbox").checkbox("check");
    } else {
      $("#task_status_checkbox").checkbox("uncheck");
    }
  }
}

function getTaskEditContent(name){
  return tinymce.get(name).getContent();
}

function translateToAboutContent(){
  $("#about_container").css("display", "block").addClass("translate_ani");
  $("#task_container").css("display", "none").removeClass("translate_ani");
  $("#task_view_container").css("display", "none").removeClass("translate_ani");
  $("#task_edit_container").css("display", "none").removeClass("translate_ani");
}

function translateToTaskContent(){
  $("#about_container").css("display", "none").removeClass("translate_ani");
  $("#task_container").css("display", "block").addClass("translate_ani");
  $("#task_view_container").css("display", "none").removeClass("translate_ani");
  $("#task_edit_container").css("display", "none").removeClass("translate_ani");
}

function translateToViewTask() {
  $("#about_container").css("display", "none").removeClass("translate_ani");
  $("#task_container").css("display", "none").removeClass("translate_ani");
  $("#task_view_container").css("display", "block").addClass("translate_ani");
  $("#task_edit_container").css("display", "none").removeClass("translate_ani");
}

function translateToEditTask(){
  $("#about_container").css("display", "none").removeClass("translate_ani");
  $("#task_container").css("display", "none").removeClass("translate_ani");
  $("#task_view_container").css("display", "none").removeClass("translate_ani");
  $("#task_edit_container").css("display", "block").addClass("translate_ani");
}

function deleteAlertDialog(title, content, type, callback) {
  swal({
    title: title,
    text: content,
    type: type,
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm){
    if (isConfirm) {
      if (callback != null) {
        callback(function(msg){
          swal("删除成功!", msg, "success");
        });
      }

    } else {
      swal("取消删除", "取消删除操作 :)", "error");
    }
  });
}

function attachContextEvent(childSelector, type, parentSelector) {
  if (type == "plan") {
    context.init({preventDoubleContext: false});
  	context.attach(childSelector, [
  		{
        text: '新建计划',
        action: function(e){
  				showPlanPopup();
  			}
      }
  	]);
  } else if (type == "task") {
    context.init({preventDoubleContext: false});
  	context.attach(parentSelector, [
  		{
        text: '新建任务',
        action: function(e, currentContextSelector){
          if (currentContextSelector != undefined) {
            var planTitle = currentContextSelector.find(".header:first-child").text();
            showTaskEditView(planTitle, currentContextSelector.attr("attr-id"));
          }
  			}
      },
  	  {
       text: '删除计划',
        action: function(e, currentContextSelector){
          if(currentContextSelector != undefined) {
            deleteAlertDialog("确定要删除?", "将会删除计划的所有任务!", "warning", function(callback){
              deletePlan(currentContextSelector.attr("attr-id"));
              currentContextSelector.remove();
              if (callback!=null) {
                callback("该计划的所有任务都被删除")
              }
            });
          }
        }
      }
  	], childSelector);
  }
}

var isInitEditor = false;
//初始化富文本编辑器
function initializeEditorIfNeeded() {
  if (!isInitEditor) {
    tinymce.init({
      selector: '#task_content',
      plugins: [
         "advlist autolink link image lists charmap preview hr pagebreak",
         "searchreplace fullscreen insertdatetime nonbreaking",
         "save contextmenu directionality emoticons paste textcolor"
       ],
     toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify" +
     "| bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons"
      });
  }
}

function showAboutPopup() {
  $("#about_modal").modal("show");
}
