Ext.define("Scripts.store.SystemManage.Limit.LimitStore", {
    extend: "Ext.data.TreeStore",
  //  requires: 'Scripts.model.SystemManage.Limit.LimitModel',
    model: "Scripts.model.SystemManage.Limit.LimitModel",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/Limit/GetLimitsList'
    }
});