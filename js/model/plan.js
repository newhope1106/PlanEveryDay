function Plan(title, planId, createDate, lastUpdateDate) {
  this.title = "";
  this.planId = "";
  this.createDate = "";
  this.lastUpdateDate = "";

  this.newTitle = "";

  if (planId != null) {
    this.planId = planId;
  }

  if (title != null) {
    this.title = this.newTitle = title;
  }

  if (createDate != null) {
    this.createDate = createDate;
  }

  if (lastUpdateDate != null) {
    this.lastUpdateDate = lastUpdateDate;
  }
}

Plan.prototype.updateTitle = function(title) {
  this.newTitle = title;
}

Plan.prototype.getTitle = function(){
  return this.newTitle;
}

Plan.prototype.setTitle = function(title) {
  this.title = this.newTitle = title;
}

Plan.prototype.getCreateDate = function() {
  return this.createDate;
}

Plan.prototype.setCreateDate = function(createDate) {
  this.createDate = createDate;
}

Plan.prototype.getLastUpdateDate = function() {
  return this.lastUpdateDate;
}

Plan.prototype.setLastUpdateDate = function(lastUpdateDate) {
  this.lastUpdateDate = lastUpdateDate;
}

Plan.prototype.getId = function(){
  return this.planId;
}

Plan.prototype.setId = function(id) {
  this.planId = id;
}

Plan.prototype.toHTML = function(){
  return '<div class="item" attr-id='
          + this.planId +'><i class="file icon"></i>'
          +'<div class="content"><div class="header">'
          + this.getTitle() + '</div><div class="description">'
          + "创建日期：" + this.createDate + '</div></div></div>'
}

Plan.prototype.toJSON = function(){
  var date = new Date();
  var year = date.getFullYear(), month=date.getMonth()+1, day=date.getDate();
  var dateStr = year + "-" + ((month<10)?"0"+month:month) + "-" + ((day<10)?"0"+day:day);
  if (this.planId == "" || this.planId == null) {
    return {
      title : this.newTitle,
      createDate : dateStr,
      lastUpdateDate : dateStr
    };
  } else {
    if(this.title != this.newTitle) {
      return {
        title : this.newTitle,
        lastUpdateDate : dateStr
      };
    }
    return null;
  }
}
