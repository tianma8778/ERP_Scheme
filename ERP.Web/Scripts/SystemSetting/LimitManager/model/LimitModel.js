Ext.define('Scripts.model.SystemManage.Limit.LimitModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id' },
        { name: 'pid' },
        { name: 'text' },
    //type为布尔型时，后面的默认值是必须写的，要不会出错
        {name: 'leaf' },
        { name: 'ptext' },
        { name: 'desc' },
        { name: 'menuid' },
        { name: 's_limits_id' },
        { name: 'controller_name' },
        { name: 'view_name' },
        { name: 'panel_name' }
    ]
});
