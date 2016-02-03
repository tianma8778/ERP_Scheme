Ext.define("Scripts.store.SystemManage.Org.LocationStore", {
    extend: "Ext.data.Store",
    model: "Scripts.model.SystemManage.Org.LocationModel",
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/Location/GetLocationList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRows'
        }
    }
    //,data:[]
});