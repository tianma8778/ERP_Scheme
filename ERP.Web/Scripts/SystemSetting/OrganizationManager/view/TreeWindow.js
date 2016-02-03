Ext.define("Scripts.view.SystemManage.Org.TreeWindow", {
    extend: "Ext.window.Window",
    alias: "widget.Ali_TreeWindow",
    //  title: "编辑客户",
    width: 640,
    height: 400,
    modal: true,
    closable: true,
    closeAction: "close",
    title: '财务账套选择',
    layout: "fit",
    buttonAlign: "center",
    items: {
        xtype: "Ali_OrgFinanceTree"
    }
    //items: Ext.create("SystemManage.OrgFinance.OrgFinanceTree")//{ xtype: "SystemManage.OrgFinance.OrgFinanceTree" }

});