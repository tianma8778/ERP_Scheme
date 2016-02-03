Ext.define('Scripts.Frame.view.Center', {
    extend: 'Ext.tab.Panel',
    //require: ["Ext.ux.PortalPanel"],
	alias: 'widget.center',
	id: 'mainContent',
	region: 'center',
	autoDestroy: true,
	border: false,
    plain: true,
	items: [{ 
	    title: '主页',
	    xtype: "panel",
	    items: [{
	        xtype: "portalpanel",
            
	        items: [
            {
                id: 'col-1',
                items: [{
                    id: 'portlet-1',
                    title: '图表',
                    items: Ext.create('Ext.ux.Portal.LineChartPortlet'),
                    listeners: {
                        'close': Ext.bind(this.onPortletClose, this)
                    }
                },
                {
                    id: 'portlet-11',
                    title: '图表',
                    items: Ext.create('Ext.ux.Portal.StackPortlet'),
                    listeners: {
                        'close': Ext.bind(this.onPortletClose, this)
                    }
                }]
            },
	        {
	            id: 'col-2',
	            height: 600,
	            items: [{
	                id: 'portlet-4',
	                title: '消息',
	                items: Ext.create('Ext.ux.Portal.GridPortlet'),
	                listeners: {
	                    'close': Ext.bind(this.onPortletClose, this)
	                }
	            }]
	        }]
	    }]
	}],
	plugins: Ext.create('Ext.ux.TabCloseMenu', {  
        closeTabText : '关闭当前页',  
        closeOthersTabsText : '关闭其他页',  
        closeAllTabsText : '关闭所有页'  
    })
	
});