Ext.define("Scripts.store.BasicData.GeneralParameter.GeneralParameterStore", {
    extend: "Ext.data.Store",
    model: "Scripts.model.BasicData.GeneralParameter.GeneralParameterModel",
    autoLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/GeneralParameter/GetGeneralParameterList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});