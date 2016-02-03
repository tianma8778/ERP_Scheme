Ext.define("Scripts.store.BasicData.GeneralParameter.Region", {
    extend: "Ext.data.Store",
    autoLoad: true,
    model: "Scripts.model.BasicData.GeneralParameter.GeneralParameterModel",
    proxy: {
        type: 'ajax',
        url: '/GeneralParameter/GetGeneralParameterList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            DATA_BELONG_CAT: 6
        }
    }
});