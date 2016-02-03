Ext.define("Scripts.view.SystemManage.Org.OrgRightMenu", {
    extend: "Ext.menu.Menu",
    alias: 'widget.Ali_OrgRightMenu',
    items: [{
        eName: 'add',
        text: '添加组织',
        hidden: !window.Rights.R1010702//,
        //hidden: window.parent.Rights.data[0].R1010601 == true ? false : true
    }, {
        eName: 'edit',
        text: '编辑组织',
        hidden: !window.Rights.R1010703//,
        //hidden: window.parent.Rights.data[0].R1010602 == true ? false : true
    }, {
        eName: 'delete',
        text: '删除组织',
        hidden: !window.Rights.R1010704//,
        //hidden: window.parent.Rights.data[0].R1010603 == true ? false : true
    }, {
        eName: 'setValid',
        text: '设为有效',
        hidden: !window.Rights.R1010703//,
        //hidden: window.parent.Rights.data[0].R1010603 == true ? false : true
    }, {
        eName: 'setInValid',
        text: '设为无效',
        hidden: !window.Rights.R1010703//,
        //hidden: window.parent.Rights.data[0].R1010603 == true ? false : true
    }]
});