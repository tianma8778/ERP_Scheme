Ext.define("Scripts.frame.view.MessageList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_MessageList',
    store: 'Scripts.frame.store.MessageStore',
    //title: "系统消息",
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
        enableKeyNav: false,
        // 打开/关闭键盘导航网格内。
        selType: "rowmodel"
    },

    viewConfig: {
        forceFit: true,
        enableTextSelection: true
    },
    tbar: {
        xtype: 'container',
        layout: 'anchor',
        defaults: {
            anchor: '0',
            border: 0
        },
        defaultType: 'toolbar',
        items: [        
        {
            items: [           
            "->",
            {
                xtype: "tbseparator"
                //,
                //hidden: !window.Rights.R1030803
            },
            {
                text: '标记为已读',
                action: 'Read',
                icon: 'Scripts/Ext/resources/images/icons/application_form_edit.png'
                //,
                //hidden: !window.Rights.R1030802
            },
            {
                xtype: "tbseparator"
                //,
                //hidden: !window.Rights.R1030802
            },
            {
                text: '标记为未读',
                action: 'unRead',
                icon: 'Scripts/Ext/resources/images/icons/application_form_add.png'
                //,
                //hidden: !window.Rights.R1030803
            },
            {
                xtype: "tbseparator"
                //,
                //hidden: !window.Rights.R1030803
            },
            {
                text: '删除',
                action: 'del',
                icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png'
                //,
                //hidden: !window.Rights.R1030804
            },
            {
                xtype: "tbseparator"
                //,
                //hidden: !window.Rights.R1030804
            },
            {
                text: '全部删除',
                action: 'delAll',
                icon: 'Scripts/Ext/resources/images/icons/application_form_delete.png'
                //,
                //hidden: !window.Rights.R1030803
            },
            
            { xtype: "tbspacer", width: 10 }
            ]
        }]
    },
    columns: [
                    { text: 'ID', dataIndex: 'ID', width: 60 },
                    { text: '已读', dataIndex: 'B_VIEW', width: 40 },
                    { text: '消息内容', dataIndex: 'MESSAGE_TEXT',width:160 },
                    { text: '发送者', dataIndex: 'SEND_BY',width:60 },
                    { text: '发送时间', dataIndex: 'SEND_DATE',width:140 },
                    { text: '接收者', dataIndex: 'RECEIVE_BY',width:60 },
                    { text: '接收日期', dataIndex: 'RECEIVE_DATE',width:140 }
    ]
        ,
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Scripts.frame.store.MessageStore',
        dock: 'bottom',
        //分页 位置
        emptyMsg: '没有数据',
        displayInfo: true,
        displayMsg: '当前显示{0}-{1}条记录 / 共{2}条记录 ',
        beforePageText: '第',
        afterPageText: '页/共{0}页'
    }]


});