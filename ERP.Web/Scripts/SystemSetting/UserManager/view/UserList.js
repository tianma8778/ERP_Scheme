Ext.define("Scripts.SystemSetting.UserManager.view.UserList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_UserList',
    store: 'UserStore',
    title: "用户管理",
    closable: true,
    //closeAction: 'destroy',
    modal: true,
    border: false,
    selModel: {
        //handleMouseDown: Ext.emptyFn,
        injectCheckbox: 0,
        //checkbox位于哪一列，默认值为0
        mode: 'multi',
        //multi,simple,single；默认为多选multi
        checkOnly: false,
        //如果值为true，则只用点击checkbox列才能选中此条记录
        // allowDeselect: true,
        //如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
        enableKeyNav: false
        // 打开/关闭键盘导航网格内。
    },
    //destroy: function () { //销毁tabpanel
    //    if (this.fireEvent("destroy", this) != false) {
    //        this.el.remove();
    //        if (Ext.isIE) {
    //            CollectGarbage();
    //        }
    //    }
    //},
    selType: "checkboxmodel",//"rowmodel",//"checkboxmodel",
    listeners: {
        //afterRender: function (thisForm, options) {
        //    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
        //        enter: function () {
        //            thisForm.down('button[action=select]').fireEvent('click', thisForm.down('button[action=select]'));
        //        },
        //        scope: this
        //    });
        //},
        //render: function (grid) {
        //    //var store = grid.getStore();  // Capture the Store.  
        //    var view = grid.getView();    // Capture the GridView.  
        //    var tip = Ext.create('Ext.tip.ToolTip', {
        //        target: view.el,    // The overall target element.  
        //        delegate: view.itemSelector, // Each grid row causes its own seperate show and hide.  
        //        trackMouse: true,         // Moving within the row should not hide the tip.  
        //        renderTo: document.body,  // Render immediately so that tip.body can be  
        //        listeners: {              // Change content dynamically depending on which element  
        //            //  triggered the show.  
        //            beforeshow: function updateTipBody(tip) {
        //                alert(222);
        //                var rowIndex = view.findRowIndex(tip.triggerElement);
        //                var cellIndex = view.findCellIndex(tip.triggerElement);
        //                var cell = view.getCell(rowIndex, cellIndex);
        //                tip.body.dom.innerHTML = cell.innerHTML;
        //            }
        //        }
        //    });
        //}
    },
    tbar: {
        xtype: "form",
        border: 0,
        labelAlign: "right",
        items: [
        {
            xtype: 'toolbar',
            border: 0,
            layout: 'anchor',
            defaults: {
                anchor: '0',
                padding: '5 5 0 0',
                labelAlign: 'right'
            },
            defaultType: 'toolbar',
            items: [{
                border: 0,
                items: [
                    {
                        xtype: 'label',
                        text: '帐号：',
                        width: 60
                    },
                {
                    label: "ceshi",
                    xtype: 'textfield',
                    name: 'User_Code',
                    width: 120
                },
                {
                    xtype: 'label',
                    text: '姓名：',
                    width: 60
                },
                {
                    xtype: 'textfield',
                    name: 'User_Name',
                    width: 120
                },
                {
                    xtype: 'label',
                    text: '公司：',
                    width: 60
                },
                {
                    xtype: 'textfield',
                    name: 'COM_NAME',
                    width: 120
                },
                {
                    xtype: 'label',
                    text: '部门：',
                    width: 60
                },
                {
                    xtype: 'textfield',
                    name: 'DEPARTMENT_NAME',
                    width: 120
                }]
            },
            {
                border: 0,
                items: [

                {
                    xtype: 'label',
                    text: '手机号：',
                    width: 60
                },
                {
                    xtype: 'textfield',
                    name: 'PHONE_NUMBER',
                    width: 120
                },
                //{
                //    xtype: 'label',
                //    text: '角色：'
                //},
                //{
                //    name: 'ROLE_ID',
                //    xtype: 'combo',
                //    //triggerAction: 'all',
                //    //	forceSelection: true,
                //    autoSelect: false,
                //    //store: Ext.create('Scripts.store.SystemManage.Role.RoleStore'),
                //    allowBlank: true,
                //   // editable: false,
                //    //这项必须为true
                //    minChars: 1,
                //    weight: 50,
                //    queryParam: 'role_name',
                //    //ref: '../param',
                //    typeAhead: false,
                //    //	loadingText: '正在加载',
                //    queryMode: 'remote',
                //    valueField: 'id',
                //    displayField: 'role_name',
                //    hiddenName: 'ROLE_ID'
                //},
                {
                    xtype: 'label',
                    text: '有效：',
                    width: 60
                },
                {
                    name: 'Checkbox_bview',
                    xtype: 'combo',
                    width: 60,
                    forceSelection: true,
                    autoSelect: true,
                    value: '-1',
                    editable: false,
                    //这项必须为true
                    minChars: 1,
                    weight: 50,
                    typeAhead: false,
                    queryMode: 'local',
                    store: new Ext.data.ArrayStore({
                        fields: ['key', 'name'],
                        data: [['-1', '所有'], ['1', '是'], ['0', '否']]
                    }),
                    valueField: 'key',
                    displayField: 'name',
                    hiddenName: 'ISENABLE2',
                }]
            },
            {
                border: 0,
                items: [{
                    text: '检索',
                    action: 'select',
                    icon: 'Scripts/Ext/resources/images/icons/application_form_magnify.png'
                    //hidden: !window.Rights.R1010101
                },
                {
                    xtype: "tbseparator"
                    //hidden: !window.Rights.R1010101
                },
                {
                    text: '清空',
                    action: 'clear',
                    icon: 'Scripts/Ext/resources/images/icons/application_form.png'
                    //hidden: !window.Rights.R1010101
                },
                "->", {
                    text: '新建',
                    action: 'add',
                    icon: 'Scripts/Ext/resources/images/icons/application_form_add.png'
                    //hidden: !window.Rights.R1010102
                },
                {
                    xtype: "tbseparator"
                    //hidden: !window.Rights.R1010102
                },
                {
                    text: '编辑',
                    action: 'edit',
                    icon: 'Scripts/Ext/resources/images/icons/application_form_edit.png'
                    //hidden: !window.Rights.R1010103
                },
                //{
                //    xtype: "tbseparator"
                //},
                //{
                //    text: '删除',
                //    action: 'del',
                //    icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png'
                //},
                //{
                //    xtype: "tbseparator"
                //    //hidden: !window.Rights.R1010103
                //},
                //{
                //    text: '密码',
                //    tooltip: '修改用户密码',
                //    action: 'editpwd',
                //    icon: 'Scripts/Ext/resources/images/icons/key.png'
                //    //hidden: !window.Rights.R1010103
                //},
                //{
                //    xtype: "tbseparator"
                //    //hidden: !window.Rights.R1010103
                //},
                //{
                //    text: '角色',
                //    tooltip: '设置权限角色',
                //    action: 'setrole',
                //    icon: 'Scripts/Ext/resources/images/icons/status_online.png'
                //    //hidden: !window.Rights.R1010105 
                //},
                {
                    xtype: "tbseparator"
                    //hidden: !window.Rights.R1010105 
                }
                ]
            }]
        }
        ]
    }
        ,

    //destroy: function () { //销毁tabpanel
    //    if (this.fireEvent("destroy", this) != false) {
    //        this.el.remove();
    //        if (Ext.isIE) {
    //            CollectGarbage();
    //        }
    //    }
    //},
    viewConfig: {
        forceFit: true,
        enableTextSelection: true,
        autoScroll: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            if (record.get('Username').toLowerCase() == 'admin') {
                return 'x-grid-record-text-red';
            } else {
                //return 'x-grid-record-red';
            }
        }
    },
    initComponent: function () {
        this.columns = [{
            header: "ID",
            dataIndex: "ID",
            tooltip: "ID",
            hidden: true
        },
        {
            header: "No",
            xtype: 'rownumberer',
            width: 50
        },
        {
            header: "帐号",
            dataIndex: "Username",
            //tooltip: "帐号",
            sortable: true,
            remoteSort: true,
            width: 120

        },

        {
            header: "有效",
            dataIndex: "Is_Enable",
            tooltip: "有效",
            sortable: true,
            remoteSort: true,
            width: 60,
            renderer: function (value) {
                if (value == 1) {
                    return "<span style='color:green;font-weight:bold';>有效</span>";
                } else {
                    return "<span style='color:red;font-weight:bold';>无效</span>";
                }
            }
        },
        {
            header: "创建人",
            dataIndex: "Create_User",
            tooltip: "创建人",
            sortable: true,
            hidden: true,
            width: 120,
            remoteSort: true
        },
        {
            header: "创建人",
            dataIndex: "Create_User_Text",
            tooltip: "创建人",
            sortable: true,
            width: 120,
            remoteSort: true
        },
        {
            header: "创建时间",
            dataIndex: "Create_Time",
            tooltip: "创建时间",
            sortable: true,
            width: 140,
            remoteSort: true
        },
        {
            header: "修改人",
            dataIndex: "Update_User",
            tooltip: "修改人",
            sortable: true,
            hidden: true,
            width: 120,
            remoteSort: true
        },
        {
            header: "修改人",
            dataIndex: "Update_User_Text",
            tooltip: "修改人",
            sortable: true,
            width: 120,
            remoteSort: true
        },
        {
            header: "修改时间",
            dataIndex: "Update_Time",
            tooltip: "修改时间",
            sortable: true,
            width: 140,
            remoteSort: true
        }];
        this.callParent(arguments);
    },

    dockedItems: [{
        xtype: 'pagingtoolbar',
        //TODO store: 'UserStore',
        dock: 'bottom',
        emptyMsg: '没有数据',
        displayInfo: true,
        displayMsg: '当前显示{0}-{1}条记录 / 共{2}条记录 ',
        beforePageText: '第',
        afterPageText: '页/共{0}页'
    }]

});
