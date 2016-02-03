Ext.define("Scripts.view.SystemManage.Role.LimitsTree", {
extend: "Ext.tree.Panel",
alias: 'widget.Ali_LimitsTree',
store: "SystemManage.Role.LimitsStore",
destroy: function() { //销毁tabpanel
    if (this.fireEvent("destroy", this) != false) {
        this.el.remove();
        if (Ext.isIE) {
            CollectGarbage();
        }
    }
},
autoScroll : true,
rootVisible: false,
root: {
    id:0,
    text: 'Root',
    expanded: true
}
});