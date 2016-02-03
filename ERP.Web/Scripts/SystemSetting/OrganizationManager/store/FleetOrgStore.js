Ext.define("Scripts.store.SystemManage.Org.FleetOrgStore", {
    extend: "Ext.data.Store",
    model: "Scripts.model.SystemManage.Org.OrgListModel",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/Org/GetOrgListByType',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            type: "DepType02"
        }
    }
});