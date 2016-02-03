Ext.define("Scripts.store.SystemManage.Role.LimitsStore", {
extend: "Ext.data.TreeStore",
model: "Scripts.model.SystemManage.Role.LimitsModel",
autoLoad: false,
proxy : {
          type : 'ajax',
          url: '/Role/GetRoleLimitsList'
}
});