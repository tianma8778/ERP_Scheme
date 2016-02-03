Ext.define('Ext.ux.Portal.LineChartPortlet', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.linechartportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.series.*',
        'Ext.layout.container.Fit'
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
        //console.log(data);
        return data;
    },

    initComponent: function () {

        Ext.apply(this, {
            layout: 'fit',
            height: 240,
            items: {
                xtype:'chart',
                animate: false,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: this.generateData()
                }),
                insetPadding: 30,
                axes: [{
                    type: 'Numeric',
                    minimum: 0,
                    position: 'left',
                    fields: ['data1'],
                    title: false,
                    grid: true,
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0'),
                        font: '10px Arial'
                    }
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: false,
                    label: {
                        font: '11px Arial',
                        renderer: function(name) {
                            return name.substr(0, 3) + ' 07';
                        }
                    }
                }],
                series: [{
                    type: 'line',
                    axis: 'left',
                    xField: 'name',
                    yField: 'data1',
                    listeners: {
                        itemmouseup: function(item) {
                            //Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Ext.Date.monthNames[item.value[0]]);
                        }  
                    },
                    tips: {
                        trackMouse: true,
                        width: 80,
                        height: 40,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name'));
                            this.update(storeItem.get('data1'));
                        }
                    },
                    style: {
                        fill: '#38B8BF',
                        stroke: '#38B8BF',
                        'stroke-width': 3
                    },
                    markerConfig: {
                        type: 'circle',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0,
                        fill: '#38B8BF',
                        stroke: '#38B8BF'
                    }
                }]
            }
        });

        this.callParent(arguments);
    }
});
