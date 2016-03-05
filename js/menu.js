const remote = require('electron').remote;
const Menu = remote.Menu;

var template = [
  {
    label: '新建',
    click: function(item, focusedWindow) {

    }
  },
  {
    label: '编辑',
    click: function(item, focusedWindow) {

    }
  },
  {
    label: '查看',
    click: function(item, focusedWindow) {

    }
  },
  {
    label: '删除',
    click: function(item, focusedWindow) {

    }
  },
  {
    label: '统计',
    click: function(item, focusedWindow) {

    }
  },
  {
    label: '帮助',
    click: function(item, focusedWindow) {

    }
  }
];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
