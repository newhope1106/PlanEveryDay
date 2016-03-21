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

Task.prototype.setId = function(id) {
  this.taskId = id;
}

Task.prototype.updateTitle = function(title) {
  this.newTitle = title;
}

Task.prototype.setTitle = function(title){
  this.title = this.newTitle = title;
}

Task.prototype.updateContent = function(content){
  this.newContent = content;
}

Task.prototype.setContent = function(content) {
  this.content = this.newContent = content;
}

Task.prototype.updateStatus = function(status) {
  this.newStatus = status;
}

Task.prototype.setStatus = function(status) {
  this.status = this.newStatus = status;
}

Task.prototype.setPlanId = function(planId){
  if (planId != null) {
    this.planId = planId;
  }
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

Task.prototype.setCreateDate = function(createDate) {
  this.createDate = createDate;
}

Task.prototype.getLastUpdateDate = function() {
  return this.lastUpdateDate;
}

Task.prototype.setLastUpdateDate = function(lastUpdateDate) {
  this.lastUpdateDate = lastUpdateDate;
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
  return '<div class="item">'
        + '<div class="content">'
        + this.getTitle()
        + '&nbsp;&nbsp;' + (this.isFinished()?"完成":"未完成")
        + '<div class="description">'
        + '最近更新时间:' + this.getLastUpdateDate()
        + '<a attr-id=' + this.taskId + ' class="task_edit_link" href="#">edit</a>&nbsp;&nbsp;'
        +'<a attr-id=' + this.taskId + ' class="task_delete_link" href="#">delete</a>'
        +'</div>';
}

Task.prototype.toJSON = function() {
  var date = new Date();
  var year = date.getFullYear(), month=date.getMonth()+1, day=date.getDate();
  var dateStr = year + "-" + ((month<10)?"0"+month:month) + "-" + ((day<10)?"0"+day:day);

  if (this.taskId == null || this.taskId == "") {
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
