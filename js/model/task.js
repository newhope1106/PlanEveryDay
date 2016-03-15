function Task(title, content, status, taskId, createDate, lastUpdateDate, planId){
  this.taskId = "";
  this.title = "";
  this.content = "";
  this.createDate = "";
  this.lastUpdateDate = "";
  this.status = 0;
  this.planId = "";

  this.newTitle = "";
  this.newContent = "";
  this.newStatus = 0;

  if (taskId != null) {
    this.taskId = taskId;
  }

  if (typeof(status) == "number") {
    this.status = this.newStatus = status;
  }

  if (title != null) {
    this.title = this.newTitle = title;
  }

  if (content != null) {
    this.content = this.newContent = content;
  }

  if (createDate != null) {
    this.createDate = createDate;
  }

  if (lastUpdateDate != null) {
    this.lastUpdateDate = lastUpdateDate;
  }

  if (planId != null) {
    this.planId = planId;
  }
}

Task.prototype.save = function(){
  if (this.taskId == -1) {
    //insert operation
  } else {
    //update operation;
    if(this.title != this.newTitle) {

    }

    if(this.content != this.newContent) {

    }
  }
}

Task.prototype.delete = function() {
  if (this.taskId != null) {

  }
}

Task.prototype.updateTitle = function(title) {
  this.newTitle = title;
}

Task.prototype.updateContent = function(content){
  this.newContent = content;
}

Task.prototype.updateStatus = function(status) {
  if (status) {
    this.newStatus = 1;
  } else {
    this.newStatus = 0;
  }
}

Task.prototype.setPlanId = function(planId){
  if (planId != null) {
    this.planId = planId;
  }
}

Task.prototype.updateContent = function(content){
  this.newContent = content;
}

Task.prototype.getTitle = function(){
  return this.newTitle;
}

Task.prototype.getContent = function(){
  return this.newContent;
}

Task.prototype.getCreateDate = function() {
  return this.createDate;
}

Task.prototype.getLastUpdateDate = function() {
  return this.lastUpdateDate;
}

Task.prototype.isFinished = function() {
  if (this.status > 0) {
    return true;
  }

  return false;
}

Task.prototype.getStatus = function(){
  return this.newStatus;
}

Task.prototype.getId = function() {
  return this.taskId;
}

Task.prototype.toHTML = function() {
  return '<tr><td><div class="title active"><i class="dropdown icon"></i>'
          + this.getTitle() + '</div><div class="content"><p style="display: block ! important;" class="transition visible">'
          + this.getContent() + '</p></div></td><td>'
          + (this.isFinished()?"完成":"未完成") + '</td><td>'
          + '<a attr-id=' + this.taskId + ' class="task_edit_link" href="#">edit</a>&nbsp;&nbsp;'
          +'<a attr-id=' + this.taskId + ' class="task_delete_link" href="#">delete</a></td></tr>';
}

Task.prototype.toJSON = function() {
  var date = new Date();
  var year = date.getFullYear(), month=date.getMonth()+1, day=date.getDate();
  var dateStr = year + "-" + ((month<10)?"0"+month:month) + "-" + ((day<10)?"0"+day:day);

  if (this.taskId == null || this.taskId == "") {
    this.createDate = dateStr;
    this.lastUpdateDate = dateStr;
    return {
      title:this.title,
      content:this.content,
      status:this.newStatus,
      planId:this.planId,
      createDate:dateStr,
      lastUpdateDate:dateStr
    }
  } else {
    if (this.title != this.newTitle || this.content != this.newContent
      || this.status != this.newStatus) {
        this.lastUpdateDate = dateStr;
        var updateJSON = {};
        if (this.title != this.newTitle) {
          updateJSON.title = this.newTitle;
        }

        if (this.content != this.newContent) {
          updateJSON.content = this.newContent;
        }

        if (this.status != this.newStatus) {
          updateJSON.status = this.newStatus;
        }

        updateJSON.lastUpdateDate = dateStr;
        return updateJSON;
    }

    return null;
  }
}
