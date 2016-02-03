Ext.define("Scripts.store.SystemManage.Org.OrgStore", {
    extend: "Ext.data.TreeStore",
    //  requires: 'Scripts.model.SystemManage.Limit.LimitModel',
    model: "Scripts.model.SystemManage.Org.OrgModel",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/Org/GetOrgList'
    },
    root: { id: 0, pid: 0, expanded: true }
});