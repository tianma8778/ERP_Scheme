Ext.define('Ext.ux.Portal.Chart2Portlet', {

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
            items: {
                xtype: 'chart',
                animate: true,
                style: 'background:#fff',
                shadow: false,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: this.generateData()
                }),
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['data1'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: 'Number of Hits',
                    minimum: 0
                }, {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'bar',
                    axis: 'bottom',
                    label: {
                        display: 'insideEnd',
                        field: 'data1',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'horizontal',
                        color: '#333',
                        'text-anchor': 'middle',
                        contrast: true
                    },
                    xField: 'name',
                    yField: ['data1'],
                    //color renderer
                    renderer: function (sprite, record, attr, index, store) {
                        var fieldValue = Math.random() * 20 + 10;
                        var value = (record.get('data1') >> 0) % 5;
                        var color = ['rgb(213, 70, 121)',
                                     'rgb(44, 153, 201)',
                                     'rgb(146, 6, 157)',
                                     'rgb(49, 149, 0)',
                                     'rgb(249, 153, 0)'][value];
                        return Ext.apply(attr, {
                            fill: color
                        });
                    }
                }]
            }
        });

        this.callParent(arguments);
    }
});
