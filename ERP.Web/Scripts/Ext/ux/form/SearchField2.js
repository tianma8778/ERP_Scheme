﻿Ext.define('Ext.ux.form.SearchField2', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchfield2',
    //requires: ["Scripts.view.Finance.Special.VehicleChoosePanel", "Scripts.view.Finance.Special.ChoosedVehicleList", "Scripts.view.Finance.Special.AllVehicleList"],
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch: false,
    paramName: 'query',

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        me.on('specialkey', function (f, e) {
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });

        // We're going to use filtering
        //me.store.remoteFilter = true;

        // Set up the proxy to encode the filter in the simplest way as a name/value pair

        // If the Store has not been *configured* with a filterParam property, then use our filter parameter name
        //if (!me.store.proxy.hasOwnProperty('filterParam')) {
        //    me.store.proxy.filterParam = me.paramName;
        //}
        //me.store.proxy.encodeFilters = function (filters) {
        //    return filters[0].value;
        //}
    },

    afterRender: function () {
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    //onTrigger1Click: function () {
    //    var me = this;

    //    if (me.hasSearch) {
    //        me.setValue('');
    //        me.store.clearFilter();
    //        me.hasSearch = false;
    //        me.triggerCell.item(0).setDisplayed(false);
    //        me.updateLayout();
    //    }
    //},

    onTrigger2Click: function () {
        var win = Ext.widget("Ali_LicenseWindow");
        var grid = win.down('gridpanel');
        var idlist = Ext.getCmp('licenselistid').getValue();
        var idl = new Array();
        idl = idlist.split(",");
        win.show();
        for (var i = 0; i < idl.length; i++) {
            for (var j = 0; j < grid.store.data.length; j++) {
                if (grid.store.data.items[j].data.ID == idl[i]) {
                    grid.getSelectionModel().select(j, true, false);
                }
            }
        }
    }
});