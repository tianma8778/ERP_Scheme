Ext.define('Scripts.model.SystemManage.Role.RoleModel', {
    extend: 'Ext.data.Model',
    fields: [
    { name: 'id', type: 'string' },
    { name: 'role_name', type: 'string' },
    { name: 'role_remark', type: 'string' },
    { name: 'CREATETIME' },
    { name: 'UPDATETIME' },
    { name: 'CR_USER' },
    { name: 'UP_USER' }
    ]
});

