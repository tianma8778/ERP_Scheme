Ext.define("Scripts.view.SystemManage.Limit.LimitRightMenu", {
    extend: "Ext.menu.Menu",
    alias: 'widget.Ali_LimitRightMenu',
    items: [{
        eName: 'add',
        text: '添加权限',
        hidden: !window.Rights.R1010302
    }, {
        eName: 'edit',
        text: '编辑权限',
        hidden: !window.Rights.R1010303
    }, {
        eName: 'delete',
        text: '删除权限',
        hidden: !window.Rights.R1010304
    }]
    });