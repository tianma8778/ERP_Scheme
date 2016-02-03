Ext.define('Ext.ux.Portal.GridPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',
    uses: [
        'Ext.data.ArrayStore'
    ],
    height: 515,
    myData: [
        ['3m Co',                              '2015-10-10'],
        ['Alcoa Inc',                          '2015-10-10'],
        ['Altria Group Inc',                   '2015-10-10'],
        ['American Express Company',           '2015-10-10'],
        ['American International Group, Inc.', '2015-10-10'],
        ['AT&T Inc.',                          '2015-10-10'],
        ['Boeing Co.',                         '2015-10-10'],
        ['Caterpillar Inc.',                   '2015-10-10'],
        ['Citigroup, Inc.',                    '2015-10-10'],
        ['E.I. du Pont de Nemours and Company','2015-10-10'],
        ['Exxon Mobil Corp',                   '2015-10-10'],
        ['General Electric Company',           '2015-10-10'],
        ['General Motors Corporation',         '2015-10-10'],
        ['Hewlett-Packard Co.',                '2015-10-10'],
        ['Honeywell Intl Inc',                 '2015-10-10'],
        ['Intel Corporation',                  '2015-10-10'],
        ['International Business Machines',    '2015-10-10'],
        ['Johnson & Johnson',                  '2015-10-10'],
        ['JP Morgan & Chase & Co',             '2015-10-10'],
        ['McDonald\'s Corporation',            '2015-10-10'],
        ['Merck & Co., Inc.',                  '2015-10-10'],
        ['Microsoft Corporation',              '2015-10-10'],
        ['Pfizer Inc',                         '2015-10-10'],
        ['The Coca-Cola Company',              '2015-10-10'],
        ['The Home Depot, Inc.',               '2015-10-10'],
        ['The Procter & Gamble Company',       '2015-10-10'],
        ['United Technologies Corporation',    '2015-10-10'],
        ['Verizon Communications',             '2015-10-10'],
        ['Wal-Mart Stores, Inc.',              '2015-10-10']
    ],

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    change: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    pctChange: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },

    initComponent: function(){

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'company'},
               {name: 'time'}
            ],
            data: this.myData
        });

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'company',
                text   : 'Message',
                //width: 120,
                flex: 1,
                sortable : true,
                dataIndex: 'company'
            },{
                text: 'Time',
                dataIndex:'time',
                width    : 75,
                sortable : true
            }]
        });

        this.callParent(arguments);
    }
});
