Ext.define("Scripts.view.SystemManage.Org.OrgEditWindow", {
    extend: "Ext.window.Window",
    alias: 'widget.Ali_OrgEditWindow',
    width: 380,
    height: 250,
    closeAction: 'close',
    modal: true,
    items: {
        xtype: "form",
        url: "",
        baseCls: "x-plain",
        bodyStyle: "padding:8px",
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 80,
            anchor: "90%"
        },
        items: [
	        //{ xtype: "textfield", name: "LIMITS_NAME", fieldLabel: "权限名称", allowBlank: false, maxLength: 50, blankText: '请输入权限名称', maxLengthText: '权限名称不能超过50个字符' },
	        //{ xtype: "combo", name: "LIMITS_TYPE", fieldLabel: "权限类型", displayField: 'TYPE_NAME', valueField: 'TYPE_NAME', store: 'SystemManage.Limit.LimitTypeStore', queryMode: 'local', typeAhead: true, allowBlank: false, editable: false },
	        //{ xtype: "textfield", name: "PTEXT", fieldLabel: "上级权限", allowBlank: false, readOnly: true },
	        //{ xtype: "textfield", name: "CONTROLLER_NAME", fieldLabel: "控制器名称", allowBlank: false, maxLength: 100, blankText: '请输入控制器名称', maxLengthText: '控制器名称不能超过100个字符', },
	        //{ xtype: "textfield", name: "VIEW_NAME", fieldLabel: "视图名称", allowBlank: false, maxLength: 100, blankText: '请输入视图名称', maxLengthText: '视图名称不能超过50个字符' },
	        //{ xtype: "textfield", name: "PANEL_NAME", fieldLabel: "面板名称", allowBlank: false, maxLength: 50, blankText: '请输入面板名称', maxLengthText: '面板名称不能超过50个字符' },
	        //{ xtype: "hiddenfield", name: "ID" },
	        //{ xtype: "hiddenfield", name: "MENUID" },
	        //{ xtype: "hiddenfield", name: "LIMITS_PARENT_ID" },
	        //{ xtype: "hiddenfield", name: "actionType" },
	        //{ xtype: "hiddenfield", name: "LIMITS_ID" }
        ]
    },
    buttonAlign: 'center',
    buttons: [
{ text: "确定", action: "ok" },
{ text: "取消", action: "cancel" }
    ]
});