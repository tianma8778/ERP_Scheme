Ext.define("Scripts.view.BasicData.GeneralParameter.GeneralParameterList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_GeneralParameterList',
    store: 'BasicData.GeneralParameter.GeneralParameterStore',
    closeAction: 'destroy',
    modal: true,
    title: "参数设置",
    border: 0,
    selModel: {
        //handleMouseDown: Ext.emptyFn,
        injectCheckbox: 0,
        //checkbox位于哪一列，默认值为0
        mode: 'multi',
        //multi,simple,single；默认为多选multi
        checkOnly: false,
        //如果值为true，则只用点击checkbox列才能选中此条记录
        allowDeselect: true,
        //如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
        enableKeyNav: false
        // 打开/关闭键盘导航网格内。
    },

    selType: "rowmodel",//"cellmodel"//"checkboxmodel","rowmodel"



    tbar: [
    {
        text: '新建',
        name:'addb',
        action: 'add',
        icon: 'Scripts/Ext/resources/images/icons/application_form_add.png', hidden: !window.Rights.R1020102
    },
                        { xtype: "tbseparator", hidden: !window.Rights.R1020102 },
    {
        text: '编辑',
        name: 'editb',
        action: 'modify',
        icon: 'Scripts/Ext/resources/images/icons/application_form_edit.png', hidden: !window.Rights.R1020103
    },
                        { xtype: "tbseparator", hidden: !window.Rights.R1020103 },
    {
        text: '删除',
        name: 'delb',
        action: 'delete',
        icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png', hidden: !window.Rights.R1020104
    },
    {
        xtype: 'textfield',
        width: 80,
        hidden: true,
        name: 'PARAMETER_CATEGORY'
    }    ,
    {
        xtype: 'textfield',
        width: 80,
        hidden: true,
        name: 'IF_LOCK'
    }
    ],
    destroy: function () { //销毁tabpanel
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },

    initComponent: function () {
        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {
            header: "ID",
            dataIndex: "ID",
            tooltip: "ID",
            hidden: true
        },
        {
            header: "数据键",
            dataIndex: "DATA_KEY",
            //flex: 1,
            tooltip: "数据键"
        },
        {
            header: "数据值",
            dataIndex: "DATA_VALUE",
            tooltip: "数据值",
            sortable: true,
            remoteSort: true
        },
        {
            header: "标识码",
            dataIndex: "IDENTIFY_CODE",
            tooltip: "标识码",
            sortable: true,
            remoteSort: true
        }
        ];
        this.callParent(arguments);
    }

});