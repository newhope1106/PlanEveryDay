function Task(title, content, status, taskId, createDate, lastUpdateDate){
  this.taskId = -1;
  this.title = "";
  this.content = "";
  this.createDate = "";
  this.lastUpdateDate = "";
  this.status = 0;

  this.newTitle = "";
  this.newContent = "";
  this.newStatus = -1;

  if (typeof(taskId) == "number") {
    this.taskId = taskId;
  }

  if (typeof(status) == "number") {
    this.status = status;
  }

  if (title != null) {
    this.title = title;
  }

  if (content != null) {
    this.content = content;
  }

  if (createDate != null) {
    this.createDate = createDate;
  }

  if (lastUpdateDate != null) {
    this.lastUpdateDate = lastUpdateDate;
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
  if (this.taskId != -1) {

  }
}

Task.prototype.updateTtitle = function(title) {
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

Task.prototype.updateContent = function(content){
  this.newContent = content;
}

Task.prototype.getTitle = function(){
  if (this.newTitle != "") {
    return this.newTitle;
  }

  return this.title;
}

Task.prototype.getContent = function(){
  if (this.newContent != "") {
    return this.newContent;
  }

  return this.content;
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

Task.prototype.getId = function() {
  return this.taskId;
}

Task.prototype.toHTML = function() {
  return '<tr><td><div class="title active"><i class="dropdown icon"></i>'
          + this.title + '</div><div class="content"><p style="display: block ! important;" class="transition visible">'
          + this.content + '</p></div></td><td>'
          + (this.isFinished()?"完成":"未完成") + '</td><td>'
          + '<a attr-id=' + this.taskId + ' href="#">edit</a>&nbsp;&nbsp;'
          +'<a attr_id=' + this.taskId + ' href="#">delete</a></td></tr>';
}
