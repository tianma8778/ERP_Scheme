Ext.define("Scripts.view.SystemManage.Limit.LimitWindow", {
    extend: "Ext.window.Window",
    alias: 'widget.Ali_LimitWindow',
    width: 300,
    height: 170,
    closeAction: 'close',
    modal: true,
    layout: "fit",
    border: 0,
    listeners: {
        afterRender: function (thisForm, options) {
            var els = Ext.DomQuery.select('input[type!=hidden]'); //Ext.query("UserEdit input,textarea,combobox"); //Ext.query("#Ali_UserEdit input,textarea,combobox");
            Ext.create("Ext.util.KeyMap", this.el, {
                key: 13,
                fn: function (key, e) {
                    var el = e.target, target = els, ln = target.length;
                    for (var i = 0; i < ln; i++) {
                        if (target[i] == el) {
                            if (i + 1 == ln) {
                                target[0].focus();
                            } else {
                                target[i + 1].focus();
                            }
                        }
                    }
                },
                scope: this
            });
        }
    },
    items: {
        xtype: "form",
       // baseCls: "x-plain",
        bodyStyle: "padding:8px",
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 80,
            anchor: "90%"
        },
        items: [
	        { xtype: "textfield", name: "text", fieldLabel: "权限名称", allowBlank: false, maxLength: 50, blankText: '请输入权限名称', maxLengthText: '权限名称不能超过50个字符' },
	        { xtype: "combo", name: "desc", fieldLabel: "权限类型", displayField: 'TYPE_NAME', valueField: 'TYPE_NAME', store: 'SystemManage.Limit.LimitTypeStore', queryMode: 'local', typeAhead: true, allowBlank: false, editable: false },
	        { xtype: "textfield", name: "ptext", fieldLabel: "上级权限", allowBlank: false, readOnly: true },
	        { xtype: "hiddenfield", name: "pid" },
	        { xtype: "hiddenfield", name: "actionType" },
	        { xtype: "hiddenfield", name: "id" }
	    ]
    },
    buttonAlign: 'center',
    buttons: [
	    { text: "确定", action: "ok" }
	]
});