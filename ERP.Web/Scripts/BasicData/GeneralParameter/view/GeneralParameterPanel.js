Ext.define("Scripts.view.BasicData.GeneralParameter.GeneralParameterPanel", {
    extend: "Ext.Panel",
    alias: 'widget.Ali_GeneralParameterPanel',
    title: "通用参数",
    closable: true,
    closeAction: 'destroy',
    border: 0,
    modal: true,
    layout: {
        type: 'border',
        padding: 2
    },
    defaults: {
        //border: 0,
        split: true
    },
    destroy: function () { //销毁tabpanel
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },
    items: [
        {
            region: 'west',
            height: '100%',
            border: 1,
            width:'30%',
            layout: 'fit',
            //border: 0,
            items: [
               {
                   xtype: 'Ali_CategoryList'
               }
            ]
        },
        {
            region: 'center',
            layout: 'fit',
            //border: 0,
            split: true,
            border: 1,
            height:'100%',
            width: '70%',
            items: [
               {
                   xtype: 'Ali_GeneralParameterList'
               }
           ]
        }




    ]





});