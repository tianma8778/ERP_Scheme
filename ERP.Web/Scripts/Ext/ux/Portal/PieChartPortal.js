Ext.define('Ext.ux.Portal.PieChartPortal', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.chartportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    generateData: function (n, floor) {
        var data = [],
            p = (Math.random() * 11) + 1,
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12) ; i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    },

    initComponent: function () {

        Ext.apply(this, {
            layout: 'fit',
            height: 240,
            items:{
                xtype: 'chart',
                animate: true,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: this.generateData()
                }),
                shadow: true,
                legend: {
                    position: 'right'
                },
                insetPadding: 60,
                theme: 'Base:gradients',
                series: [{
                    type: 'pie',
                    field: 'data1',
                    showInLegend: true,
                    donut: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            //calculate percentage.
                            var total = 0;
                            //store1.each(function(rec) {
                            //    total += rec.get('data1');
                            //});
                            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '18px Arial'
                    }
                }]
            }
        });

        this.callParent(arguments);
    }
});
