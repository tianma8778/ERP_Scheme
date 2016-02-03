Ext.define("Scripts.view.SystemManage.Role.LimitsWindow", {
extend: "Ext.window.Window",
alias: 'widget.Ali_LimitsWindow',
width: 400,
height:400,
title:'设置角色权限',
closeAction: 'close',
modal: true,
layout: "fit",
border: 0,
roleid:"",
items:{
    xtype: "Ali_LimitsTree"
   
},

buttonAlign: "center",

	buttonAlign:'center',
	buttons: [
	{ text: "保存", action: "limitsOk", hidden: !window.Rights.R1010203 }
   
	]
	});