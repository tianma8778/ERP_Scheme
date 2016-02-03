Ext.define('Scripts.model.SystemManage.Org.OrgListModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID' },
        { name: 'PID' },
        { name: 'TYPE' },
        //type为布尔型时，后面的默认值是必须写的，要不会出错
        { name: 'NAME', type: 'string' },
        { name: 'PATH', type: 'string' },
        { name: 'TIER' },
        { name: 'BEVALID' },
        { name: 'FINANCE_DEPART', type: 'string' },
        { name: 'DEPARTTYPE', type: 'string' }
    ]
});
