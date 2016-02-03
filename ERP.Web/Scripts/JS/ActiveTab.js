function activetab(panel_widgetname) {
    var center = Ext.getCmp('mainContent');
    var widgetPanel = center.child(panel_widgetname);;
  //  alert(widgetPanel);

    if (!widgetPanel) {
        var widgetPanel = Ext.widget(panel_widgetname);
        center.add(widgetPanel);
        center.setActiveTab(widgetPanel);
    } else {
        center.setActiveTab(widgetPanel);
    }
}