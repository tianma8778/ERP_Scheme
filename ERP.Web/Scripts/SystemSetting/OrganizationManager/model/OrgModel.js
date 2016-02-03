Ext.define('Scripts.model.SystemManage.Org.OrgModel', {
    extend: 'Ext.data.Model',
    fields: [

    { name: 'id' },
    { name: 'pid' },
    { name: 'text' },
    //type为布尔型时，后面的默认值是必须写的，要不会出错
    { name: 'leaf' },
    { name: 'ptext' },
    { name: 'desc' },
    { name: 'type' },
    { name: 'name' },
    { name: 'path' },
    { name: 'tier' },
    { name: 'beValid' },
    { name: 'finance_depart' },
    { name: 'financeName' },
    { name: 'depart_type' },
    { name: 'DEPART_TYPE_Name' },
    { name: 'ncDepCode' },
    { name: 'amo_user' },
    { name: 'amo_vehicle' },
    { name: 'CREATETIME' },
    { name: 'CREATEUSER' },
    { name: 'UPDATETIME' },
    { name: 'UPDATEUSER' },
    { name: 'CR_USER' },
    { name: 'UP_USER' },
    { name: 'amo_location' }
    ]
});
