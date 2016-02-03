//获取通用参数的分类列表
Ext.define("Scripts.store.BasicData.GeneralParameter.CategoryStore", {
    extend: "Ext.data.Store",
    model: "Scripts.model.BasicData.GeneralParameter.CategoryModel",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/GeneralParameter/GetCategoryList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});