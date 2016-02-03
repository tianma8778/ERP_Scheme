Ext.define("Scripts.store.SystemManage.Limit.MenuStore", {
    extend: "Ext.data.Store",
    model: "Scripts.model.SystemManage.Limit.MenuModel",
    proxy: {
        type: 'ajax',
        url: 'Response/limit/DAL_Limit.ashx?type=getMenus',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});