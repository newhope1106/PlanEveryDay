function ListView(){
  this.listView = null;
  this.data = null;
  this.emptyView = null;
}

ListView.prototype.setEmptyView = function(emptyView){
  this.emptyView = emptyView;
}

ListView.prototype.setListView = function(listView){
  this.listView = listView;
}

ListView.prototype.changeData = function(data){
  this.data = data;
  this.notifyDataSetChanged();
}

ListView.prototype.removeItem = function(planId){
  var data = this.data;
  if (data != null) {
    var length = data.length;
    for(var i=0; i<length; i++) {
      var item = data[i];
      if (item.getId() == planId) {
        data.splice(i, 1);
        break;
      }
    }

    if (length != data.length) {
      this.notifyDataSetChanged();
    }
  }
}

ListView.prototype.notifyDataSetChanged = function(){
  var data = this.data;
  var listView = this.listView;
  if (data !=null && listView!= null) {
    var length = data.length;
    var emptyView = this.emptyView;
    if (emptyView != null) {
      if (length > 0) {
        emptyView.css("visibility", "visible");
      }else {
        emptyView.css("visibility", "hidden");
      }
    }

    listView.empty();
     for(var i=0; i<length; i++) {
       var item = data[i];
       listView.append($(item.toHTML()));
     }
  }
}

ListView.prototype.getItemById = function (id){
  var data = this.data;
  if (data != null) {
    var length = data.length;

    for(var i=0; i<length; i++) {
      var item = data[i];
      if (id == item.getId()) {
        return item;
      }
    }
  }

  return null;
}

ListView.prototype.getCount = function(){
  if (data != null) {
    return data.length;
  }

  return 0;
}
