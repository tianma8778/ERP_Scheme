Ext.define('Ext.ux.Portal.StackPortlet', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.stackchartportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],


    initComponent: function () {

        Ext.apply(this, {
            layout: 'fit',
            height: 240,
            items: {
                xtype: 'chart',
                animate: true,
                shadow: true,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['year', 'comedy', 'action', 'drama', 'thriller'],
                    data: [
                            { year: 2005, comedy: 34000000, action: 23890000, drama: 18450000, thriller: 20060000 },
                            { year: 2006, comedy: 56703000, action: 38900000, drama: 12650000, thriller: 21000000 },
                            { year: 2007, comedy: 42100000, action: 50410000, drama: 25780000, thriller: 23040000 },
                            { year: 2008, comedy: 38910000, action: 56070000, drama: 24810000, thriller: 26940000 }
                    ]
                }),
                legend: {
                    position: 'right'
                },
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['comedy', 'action', 'drama', 'thriller'],
                    title: false,
                    grid: true,
                    label: {
                        renderer: function (v) {
                            return String(v).replace(/(.)00000$/, '.$1M');
                        }
                    }
                }, {
                    type: 'Category',
                    position: 'left',
                    fields: ['year'],
                    title: false
                }],
                series: [{
                    type: 'bar',
                    axis: 'bottom',
                    gutter: 80,
                    xField: 'year',
                    yField: ['comedy', 'action', 'drama', 'thriller'],
                    stacked: true,
                    tips: {
                        trackMouse: true,
                        width: 65,
                        height: 28,
                        renderer: function (storeItem, item) {
                            this.setTitle(String(item.value[1] / 1000000) + 'M');
                        }
                    }
                }]
            }
        });

        this.callParent(arguments);
    }
});
