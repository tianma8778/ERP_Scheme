Ext.define("Scripts.view.SystemManage.Org.LocationWindow", {
    extend: "Ext.window.Window",
    alias: 'widget.Ali_LocationOrgWindow',
    width: 700,
    height: 400,
    closeAction: 'close',
    modal: true,
    layout: "fit",
    items: {
        xtype: "form",
        layout: "fit",
        baseCls: "x-plain",
        bodyStyle: "padding:8px",
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 80,
            anchor: "90%"
        },
        items: [

	        { xtype: "Ali_OrgLocationList", name: "text", layout: "fit" }
	     
        ]
    }
});