Ext.define("Scripts.view.BasicData.GeneralParameter.CategoryList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_CategoryList',
    store: 'BasicData.GeneralParameter.CategoryStore',
    closeAction: 'destroy',
    title: "通用参数",
    closable: false,
    border: false,
    selModel: {
        //handleMouseDown: Ext.emptyFn,
        injectCheckbox: 0,
        //checkbox位于哪一列，默认值为0
        mode: 'single',
        //multi,simple,single；默认为多选multi
        checkOnly: false,
        //如果值为true，则只用点击checkbox列才能选中此条记录
        allowDeselect: true,
        //如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
        enableKeyNav: false
        // 打开/关闭键盘导航网格内。
    },
    destroy: function () { //销毁tabpanel
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },
    selType: "rowmodel",//"checkboxmodel",
    initComponent: function () {
        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
        {
            header: "ID",
            dataIndex: "ID",
            flex: 1,
            hidden:true
        },
        {
            header: "IF_LOCK",
            dataIndex: "IF_LOCK",
            flex: 1,
            hidden: true
        },
        {
            header: "分类标识",
            dataIndex: "CATEGORY_IDENTIFY",
            flex: 1,
            tooltip: "分类标识"
        },
        {
            header: "分类名称",
            dataIndex: "CATEGORY_NAME",
            flex: 1,
            tooltip: "分类名称"
        }
        ];
        this.callParent(arguments);
    },
    //   selType: 'cellmodel',
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })]

});