const remote = require('electron').remote;
const Menu = remote.Menu;

var template = [
  {
    label:"菜单",
      submenu :[
      {
        label: '新建计划',
        click: function(item, focusedWindow) {
          showPlanPopup();
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
    ]
  }
];

if (process.platform == 'darwin') {
  var name = require('electron').remote.app.getName();
  template.unshift({
    label:"菜单",
      submenu :[
      {
        label: '新建计划',
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
    ]
  });
}

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
