Ext.define("Scripts.SystemSetting.UserManager.store.UserStore", {
    extend: "Ext.data.Store",
    model: "Scripts.SystemSetting.UserManager.model.UserModel",
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/User/GetUserList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalRows'
        }
    }
});