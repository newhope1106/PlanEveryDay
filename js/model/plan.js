function Plan(title, planId, createDate, lastUpdateDate) {
  this.title = "";
  this.planId = planId;
  this.createDate = "";
  this.lastUpdateDate = "";

  this.newTitle = "";

  if (typeof(planId) == "number") {
    this.planId = planId;
  }

  if (title != null) {
    this.title = title;
  }

  if (createDate != null) {
    this.createDate = createDate;
  }

  if (lastUpdateDate != null) {
    this.lastUpdateDate = lastUpdateDate;
  }
}

Plan.prototype.save = function(){
  if (this.planId == -1) {
    //insert operation
  } else {
    //update operation;
    if(this.title != this.newTitle) {

    }
  }
}

Plan.prototype.delete = function() {
  if (this.planId != -1) {

  }
}

Plan.prototype.updateTtitle = function(title) {
  this.newTitle = title;
}

Plan.prototype.getTitle = function(){
  if (this.newTitle != "") {
    return this.newTitle;
  }

  return this.title;
}

Plan.prototype.getCreateDate = function() {
  return this.createDate;
}

Plan.prototype.getLastUpdateDate = function() {
  return this.lastUpdateDate;
}

Plan.prototype.getId = function(){
  return this.planId;
}
