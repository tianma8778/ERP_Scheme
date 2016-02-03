//特别费用计划的费用项
Ext.define("Scripts.store.BasicData.GeneralParameter.FeeItemSpec", {
    extend: "Ext.data.Store",
    autoLoad: true,
    model: "Scripts.model.BasicData.GeneralParameter.GeneralParameterModel",
    proxy: {
        type: 'ajax',
        url: '/GeneralParameter/GetGeneralParameterListWithCode',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            DATA_BELONG_CAT: 11,
            IDENTIFY_CODE: "特殊费用计划"
        }
    }
});