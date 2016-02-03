Ext.define("Scripts.view.SystemManage.Limit.MenuList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_Menulist',
    store: "SystemManage.Limit.MenuStore",
    height: 300,
    border: false,
    destroy: function() { //销毁tabpanel
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
            xtype: 'button', text: '新增', ename: 'menuAdd',
            icon: 'Scripts/Ext/resources/images/icons/application_form_add.png',
            hidden: !window.Rights.R1010302

        },
        {
            xtype: 'button', text: '编辑', ename: 'menuEdit',
            icon: 'Scripts/Ext/resources/images/icons/application_form_edit.png',
            hidden: !window.Rights.R1010303
        },
        {
            xtype: 'button', text: '删除', ename: 'menuDel',
            icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png',
            hidden: !window.Rights.R1010304
        }
    ]
}],
        initComponent: function() {
            this.columns = [
	{ text: '控制器', dataIndex: 'CONTROLLER_NAME' },
	{ text: '视图', dataIndex: 'VIEW_NAME' },
	{ text: '面板', dataIndex: 'PANEL_NAME' }
	];
            this.callParent(arguments);
        }
    });