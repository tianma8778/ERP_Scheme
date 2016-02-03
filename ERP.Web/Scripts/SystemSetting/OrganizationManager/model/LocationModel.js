Ext.define('Scripts.model.SystemManage.Org.LocationModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID' },
        { name: 'TYPE' },
        { name: 'TYPE_NAME' },
        { name: 'REGION' },
        { name: 'REGION_NAME' },
        { name: 'LOCATION_NUMBER' },
        { name: 'LOCATION_NAME' },
        { name: 'ELECFENCE_NUMBER' },
        { name: 'ISENABLE' },
        { name: 'ISDELETE' },
        { name: 'CREATETIME' },
        { name: 'CREATEUSER' },
        { name: 'UPDATETIME' },
        { name: 'UPDATEUSER' }
    ]
});