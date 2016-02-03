Ext.define('Scripts.model.BasicData.GeneralParameter.GeneralParameterModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID' },
        { name: 'DATA_KEY' },
        { name: 'DATA_VALUE' },
        { name: 'IDENTIFY_CODE' },
        { name: 'DATA_BELONG_CAT'},
        { name: 'IF_LOCK' }
    ]
});