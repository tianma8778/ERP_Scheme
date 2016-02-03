Ext.define("Scripts.store.SystemManage.Role.RoleStore", {
extend: "Ext.data.Store",
model: "Scripts.model.SystemManage.Role.RoleModel"
    ,
autoLoad:false,
proxy : {
          type : 'ajax',
          url: '/Role/GetRoleList',
         reader: {
             type: 'json',
             root: 'data'
         }
}
}); 