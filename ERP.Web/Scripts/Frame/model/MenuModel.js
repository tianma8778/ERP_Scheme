Ext.define('Scripts.Frame.model.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id' },
        { name: 'text' },
        { name: 'leaf' },
        { name: 'controllername' },
        { name: 'viewname' },
        { name: 'panelname' }
    ]
});
