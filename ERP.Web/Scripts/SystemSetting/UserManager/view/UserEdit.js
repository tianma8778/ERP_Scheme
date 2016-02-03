Ext.define("Scripts.SystemSetting.UserManager.view.UserEdit", {
    extend: "Ext.window.Window",
    alias: "widget.Ali_UserEdit",
    title: "编辑用户",
    width: 320,
    height: 360,
    modal: true,
    layout: "fit",
    buttonAlign: "center",
    items: {
        xtype: "form",
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 80
        },
        items: [
		{
		    xtype: "hiddenfield",
		    name: "ID"
		},
		{
		    xtype: "textfield",
		    name: "Username",
		    maxLength: 20,
		    fieldLabel: "用户名"
		},
		{
		    name: "Password",
		    fieldLabel: "密码",
		    xtype: "textfield",
		    inputType: "password",
		    allowBlank: false,
		    maxLength: 70,
		    minLength: 2,
		    weight: 100,
		    regex: /^([a-zA-Z0-9~_@$]{6,})$/i,
		    regexText: '必须同时包含字母和数字,且最少有6位'
		},
		{
		    name: "Password2",
		    fieldLabel: "密码确认",
		    xtype: "textfield",
		    inputType: "password",
		    allowBlank: false,
		    maxLength: 70,
		    minLength: 2,
		    weight: 100,
		    validator: function (value) {
		        var pw = this.previousSibling().value;
		        if (value != pw) {
		            return '两次输入的密码不一致';
		        } else {
		            return true;
		        }
		    }
		},
		{
		    name: "Is_Enable",
		    fieldLabel: "有效",
		    xtype: "checkbox",
		    allowBlank: false,
		    inputValue:'1',
		    weight: 300,
		    height: 60
		},
		 {
		     xtype: "textfield",
		     name: "modetype",
		     fieldLabel: "mode",
		     hidden: true
		 }
        ]
    },
    buttons: [{
        text: "保存",
        action: "save"
    }]
});