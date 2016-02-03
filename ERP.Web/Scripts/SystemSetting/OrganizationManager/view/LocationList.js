Ext.define("Scripts.view.SystemManage.Org.LocationList", {
    extend: "Ext.grid.Panel",
    alias: 'widget.Ali_OrgLocationList',
    store: 'SystemManage.Org.LocationStore',
    //title: "地点信息",
    //closable: true,
    

    selModel: new Ext.selection.CheckboxModel({
        checkOnly: true
    }),
    destroy: function () {
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },
    tbar: {
        xtype: 'container',
        layout: 'anchor',
        defaults: {
            anchor: '0'
        },
        defaultType: 'toolbar',
        items: [{
            items: [
                 { xtype: 'label', text: '区域：', padding: 5 },
                  {
                      xtype: 'combo', name: 'region', autoSelect: true,
                      store: 'BasicData.GeneralParameter.Region',
                      valueField: "DATA_KEY",
                      displayField: "DATA_VALUE", padding: 5
                  },
                  { xtype: 'label', text: '地点名称：', padding: 5 },
                  { xtype: 'textfield', name: 'locationname', padding: 5 },
                  { xtype: 'checkbox', name: 'chkenable', padding: 5 },
                  { xtype: 'label', text: '只显示有效', padding: 5 }


            ]
        },

        {
            items: [{ text: '检索', action: 'select', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    { text: '清空', action: 'clear', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //"->",
                    //{ text: '新建', action: 'add', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //{ text: '编辑', action: 'edit', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //{ text: '删除', action: 'del', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //{ text: '启用', action: 'enable', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //{ text: '禁用', action: 'disable', cls: 'x-btn-default-small', style: 'border-color: #d1d1d1;', width: 75 },
                    //{ xtype: "tbspacer", width: 30 }
            ]
        }]
    },
    initComponent: function () {
        //this.items = [{}];
        //Scripts.view.BasicData.Location.List.superClass.initComponent.apply(this, arguments);
        this.columns = [
        {
            header: "ID",
            dataIndex: "ID",
            tooltip: "ID",
            hidden: true
        },
	    {
	        header: "类型",
	        dataIndex: "TYPE_NAME",
	        tooltip: "类型",
	        sortable: true,
	        remoteSort: true
	    },
	    {
	        header: "区域",
	        dataIndex: "REGION_NAME",
	        tooltip: "区域",
	        sortable: true,
	        remoteSort: true
	    },
	    {
	        header: "地点编号",
	        dataIndex: "LOCATION_NUMBER",
	        tooltip: "地点编号",
	        sortable: true,
	        remoteSort: true
	    },
	    {
	        header: "地点名称",
	        dataIndex: "LOCATION_NAME",
	        tooltip: "地点名称",
	        sortable: true,
	        remoteSort: true
	    },
	    {
	        header: "地点电子围栏编号",
	        dataIndex: "ELECFENCE_NUMBER",
	        tooltip: "地点电子围栏编号",
	        sortable: true,
	        remoteSort: true
	    },
	    {
	        header: "是否有效",
	        dataIndex: "ISENABLE",
	        tooltip: "是否有效",
	        sortable: true,
	        remoteSort: true
	    }
        ];
        this.callParent(arguments);
    },
    selType: 'cellmodel',
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })]
    ,
    dockedItems: [
    {
        xtype: 'pagingtoolbar',
        store: 'SystemManage.Org.LocationStore',
        dock: 'bottom',
        emptyMsg: '没有数据',
        displayInfo: true,
        displayMsg: '当前显示{0}-{1}条记录 / 共{2}条记录 ',
        beforePageText: '第',
        afterPageText: '页/共{0}页'
    }]
});