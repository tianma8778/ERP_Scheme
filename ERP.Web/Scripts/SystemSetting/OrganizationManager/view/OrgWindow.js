Ext.define("Scripts.view.SystemManage.Org.OrgWindow", {
    extend: "Ext.window.Window",
    alias: 'widget.Ali_OrgWindow',
    width: 300,
    height: 240,
    closeAction: 'hide',
    modal: true,
    layout: "fit",
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
        //margin: 5,
        border: false,
        //baseCls: "x-plain",
        bodyStyle: "padding:8px",
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 90,
            anchor: "100%"
        },
        items: [
	        { xtype: "textfield", name: "text", fieldLabel: "组织名称", allowBlank: false, maxLength: 50, blankText: '请输入组织名称', maxLengthText: '组织名称不能超过50个字符' },
	        {
	            xtype: "combo", name: "type", fieldLabel: "节点类型",
	            displayField: 'TYPE_NAME', valueField: 'TYPE',autoScroll:true,
	            store: {
	                fields: ["TYPE", "TYPE_NAME"],
	                data: [
                        //{ "TYPE_NAME": "集团", "TYPE": "集团" },
                        { "TYPE_NAME": "事业部", "TYPE": "事业部" },
                        { "TYPE_NAME": "公司", "TYPE": "公司" },
                        { "TYPE_NAME": "部门", "TYPE": "部门" }]
	            },
	            queryMode: 'local', typeAhead: true, allowBlank: false, editable: false
	        },
	        { xtype: "textfield", name: "ptext", fieldLabel: "上级组织", allowBlank: false, readOnly: true},

            {
                name: "beValid",
                fieldLabel: "是否有效",
                xtype: "checkbox",
                allowBlank: false
                //maxLength: 70,
                //minLength: 2,
                //weight: 300,
                //height: 60
            },
            {
                xtype: "textfield", name: "ncDepCode", fieldLabel: "NC编码"
            },
            //{
            //    xtype: "textfield", name: "financeName", fieldLabel: "财务账套", readOnly: true,
            //    listeners: {
            //        dblclick: {
            //            element: 'el', //bind to the underlying body property on the panel
            //            fn: function () {

            //                var win = Ext.ComponentQuery.query("Ali_TreeWindow")[0];

            //                win.show();
            //            }
            //        }
            //    }
               
            //    },
            //{ xtype: "checkbox", name: "depart_type", fieldLabel: "是否地点" },
            {
                xtype: "combo", name: "depart_type", fieldLabel: "部门类型",
                displayField: 'TYPE_NAME', valueField: 'TYPE_NAME', autoScroll: true,
                store:"Scripts.store.BasicData.GeneralParameter.DepType",
                //    {
                //    fields: ["TYPE_NAME"], data: [{ "TYPE_NAME": "门店类" }, { "TYPE_NAME": "仓库类" }
                //    , { "TYPE_NAME": "地点类" }, { "TYPE_NAME": "其他类" }
                //    ]
                //},
                valueField: "DATA_KEY",
                displayField: "DATA_VALUE",
                queryMode: 'local', typeAhead: true, allowBlank: false, editable: false
            },
            { xtype: "hiddenfield", name: "pid" },
            { xtype: "hiddenfield", name: "actionType" },
            { xtype: "hiddenfield", name: "id" },
            { xtype: "hiddenfield", name: "path" },
            { xtype: "hiddenfield", name: "tier" },
            { xtype: "hiddenfield", name: "path", fieldLabel: "路径", allowBlank: false, readOnly: true },
            { xtype: "hiddenfield", name: "tier", fieldLabel: "层级", allowBlank: false, readOnly: true },
            { xtype: "hiddenfield", name: "finance_depart" },
        ]
    },
    buttonAlign: 'center',
    buttons: [
	    { text: "保存", action: "ok" }
        //,
	    //{ text: "取消", action: "cancel" }
    ]
});