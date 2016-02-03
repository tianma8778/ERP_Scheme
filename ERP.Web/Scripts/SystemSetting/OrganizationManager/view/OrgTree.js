Ext.define("Scripts.view.SystemManage.Org.OrgTree", {
    extend: "Ext.tree.Panel",
    alias: 'widget.Ali_OrgTree',
    store: "SystemManage.Org.OrgStore",
    closable: true,
    title: '组织管理',
    autoScroll: true,
    rootVisible: false,
    useArrows: true,
    renderTo: Ext.getBody(),
    fields: ['text', 'type', 'path', 'tier', 'beValid', 'ncDepCode', 'DEPART_TYPE_Name', 'depart_type', 'amo_user', 'amo_vehicle', 'amo_location', 'CREATETIME', 'UPDATETIME', 'CR_USER', 'UP_USER'],
    columns: [{
        xtype: 'treecolumn',
        text: '节点名',
        dataIndex: 'text',
        width: 300,
        sortable: true
    }, {
        text: '节点类型',
        dataIndex: 'type',
        flex: 1,
        sortable: true
    }
    , {
        text: '是否有效',
        dataIndex: 'beValid',
        flex: 1,
        sortable: true
        ,
        renderer: function (value) {
            if (value == true) {
                return "<span style='color:green;font-weight:bold';>有效</span>";
            } else {
                return "<span style='color:red;font-weight:bold';>无效</span>";
            }
        }
    },
    {
        text: ' NC编码',
        dataIndex: 'ncDepCode',
        flex: 1,
        sortable: true
        //, 
        ////改变列颜色自定义renderner方法
        //renderer: function (data, cell, record, rowIndex, columnIndex, store) {
        //    //var value = record.get('name');
        //    cell.style = "background-color: gray";//+ value;
        //    return data;
        //}
    },
    {
        text: '部门类型',
        dataIndex: 'DEPART_TYPE_Name',
        flex: 1,
        sortable:true
    },
    {
        text: '部门类型KEY',
        dataIndex: 'depart_type',
        flex: 1,
        sortable: true,
        hidden:true
        // ,
        //renderer: function (value) {
        //    if (value != '其他类') {
        //        return "<span style='color:green;font-weight:bold';>" + value + "</span>";
        //    } else {
        //        return "<span style='color:red;font-weight:bold';>" + value + "</span>";
        //    }
        //}
    },
    {
        text: '用户数量',
        dataIndex: 'amo_user',
        flex: 1,
        sortable: true
        //, 
        ////改变列颜色自定义renderner方法
        //renderer: function (data, cell, record, rowIndex, columnIndex, store) {
        //    //var value = record.get('name');
        //    cell.style = "background-color: gray";//+ value;
        //    return data;
        //}
    },
    {
        text: '车辆数量',
        dataIndex: 'amo_vehicle',
        flex: 1,
        sortable: true
        //, 
        ////改变列颜色自定义renderner方法
        //renderer: function (data, cell, record, rowIndex, columnIndex, store) {
        //    //var value = record.get('name');
        //    cell.style = "background-color: gray";//+ value;
        //    return data;
        //}
    },
    {
        text: '地点数量',
        dataIndex: 'amo_location',
        flex: 1,
        sortable: true
        //, 
        ////改变列颜色自定义renderner方法
        //renderer: function (data, cell, record, rowIndex, columnIndex, store) {
        //    //var value = record.get('name');
        //    cell.style = "background-color: gray";//+ value;
        //    return data;
        //}
    },
    {
        text: '创建人',
        dataIndex: 'CR_USER',
        flex: 1,
        sortable: true
    },
    {
        text: '创建时间',
        dataIndex: 'CREATETIME',
        width:120,
        sortable: true
    },
    {
        text: '修改人',
        dataIndex: 'UP_USER',
        flex: 1,
        sortable: true
    },
    {
        text: '修改时间',
        dataIndex: 'UPDATETIME',
        width: 120,
        sortable: true
    }
    ]
});