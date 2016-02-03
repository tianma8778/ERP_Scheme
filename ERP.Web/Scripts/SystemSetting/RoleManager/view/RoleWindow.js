Ext.define("Scripts.view.SystemManage.Role.RoleWindow", {
extend: "Ext.window.Window",
alias: 'widget.Ali_RoleWindow',
width: 400,
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
items:{
    xtype: "form",
    defaultType: 'textfield',
    bodyStyle:'padding:5px 5px 0',
    fieldDefaults: {
                  msgTarget: 'side',
                  labelWidth: 120
               },
    defaults: {
                  anchor: "100%"
              },
    items: [{
	       xtype:'hiddenfield',
	       name:'id'
        },{
	       name:'role_name',
	       fieldLabel: "角色名称",
	       allowBlank: false
        },{
	       name:'role_remark',
	       fieldLabel: "备注"

        },{
           xtype:'hiddenfield',
	       name:'action_type'
        }]
   
},

buttonAlign: "center",

	buttonAlign:'center',
	buttons: [
	{ text: "保存", action: "roleOk" }
    //,
	//{ text: "取消", action: "roleCancel" }
	]
	});