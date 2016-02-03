Ext.define("Scripts.view.SystemManage.Limit.LimitTree", {
    extend: "Ext.tree.Panel",
    alias: 'widget.Ali_LimitTree',
    store: "SystemManage.Limit.LimitStore",
//    destroy: function() { //销毁tabpanel
//        if (this.fireEvent("destroy", this) != false) {
//            this.el.remove();
//            if (Ext.isIE) {
//                CollectGarbage();
//            }
//        }
//    },
    closable: true,
    title: '权限管理',
    autoScroll: true,
    rootVisible: false
});