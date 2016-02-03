Ext.define("Scripts.view.SystemManage.Role.RoleList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_Rolelist',
    store: "SystemManage.Role.RoleStore",
    title: '角色管理',
    closable: true,
   // closeAction: 'destroy',
    modal: true,
    border: false,
    selModel: {
        //handleMouseDown: Ext.emptyFn,
        injectCheckbox: 0,
        //checkbox位于哪一列，默认值为0
        mode: 'single',
        //multi,simple,single；默认为多选multi
        checkOnly: false,
        //如果值为true，则只用点击checkbox列才能选中此条记录
        //allowDeselect: true,
        //如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
        enableKeyNav: false
        // 打开/关闭键盘导航网格内。
    },

    selType: "rowmodel",//"cellmodel"//"checkboxmodel","rowmodel"
    listeners: {
        afterRender: function (thisForm, options) {
            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                enter: function () {
                    thisForm.down('button[ename=roleSearch]').fireEvent('click', thisForm.down('button[ename=roleSearch]'));
                },
                scope: this
            });
        }
    },



    viewConfig: {
        forceFit: true,
        enableTextSelection: true,
        autoScroll: true
    },

    tbar: {
        xtype: 'toolbar',
        layout: 'anchor',
        defaults: {
            anchor: '0'
        },
        //destroy: function () { //销毁tabpanel
        //    if (this.fireEvent("destroy", this) != false) {
        //        this.el.remove();
        //        if (Ext.isIE) {
        //            CollectGarbage();
        //        }
        //    }
        //},
        defaultType: 'toolbar',
        items: [{
            border: 0,
            items: [{
                xtype: 'textfield',
                name: 'search',
                fieldLabel: '请输入检索关键字'
            }]
        },
        {
            border: 0,
            items: [{
                xtype: 'button',
                text: '检索',
                ename: 'roleSearch',
                icon: 'Scripts/Ext/resources/images/icons/application_form_magnify.png',
                hidden: !window.Rights.R1010201
            },
            {
                xtype: "tbseparator",
                hidden: !window.Rights.R1010201 
            },
            {
                xtype: 'button',
                text: '清空',
                action: 'clear',
                icon: 'Scripts/Ext/resources/images/icons/application_form.png',
                hidden: !window.Rights.R1010201 
            },
            "->", {
                xtype: 'button',
                text: '新增',
                ename: 'roleAdd',
                icon: 'Scripts/Ext/resources/images/icons/application_form_add.png',
                hidden: !window.Rights.R1010202 
            },
            {
                xtype: "tbseparator",
                hidden: !window.Rights.R1010202
            },
            {
                xtype: 'button',
                text: '编辑',
                ename: 'roleEdit',
                icon: 'Scripts/Ext/resources/images/icons/application_form_edit.png',
                hidden: !window.Rights.R1010203 
            },
            {
                xtype: "tbseparator",
                hidden: !window.Rights.R1010203 
            },
            {
                xtype: 'button',
                text: '删除',
                ename: 'roleDel',
                icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png',
                hidden: !window.Rights.R1010204
            },
            {
                xtype: "tbseparator",
                hidden: !window.Rights.R1010204
            },
            {
                xtype: 'button',
                text: '权限',
                tooltip: '设置权限',
                ename: 'roleLimit',
                icon: 'Scripts/Ext/resources/images/icons/lightning.png',
                hidden: !window.Rights.R1010205
            },
            {
                xtype: "tbspacer",
                width: 10
            }

            ]
        }]
    },
    initComponent: function () {
        this.columns = [{
            header: "序号",
            xtype: 'rownumberer',
            tooltip: "序号",
            width: 40
        },
        {
            text: '角色名称',
            dataIndex: 'role_name',
            width: 150
        },
        {
            text: '创建人',
            dataIndex: 'CR_USER',
            width: 120
        },
        {
            text: '创建时间',
            dataIndex: 'CREATETIME',
            width: 120
        },
        {
            text: '修改人',
            dataIndex: 'UP_USER',
            width: 120
        },
        {
            text: '修改时间',
            dataIndex: 'UPDATETIME',
            width: 120
        },
        {
            text: '备注',
            dataIndex: 'role_remark',
            width: 300
        }];
        this.callParent(arguments);
    }
});