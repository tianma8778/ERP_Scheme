Ext.define("Scripts.frame.store.MessageStore", {
    extend: "Ext.data.Store",
    model: "Scripts.frame.model.MessageModel",
    //data: [
    //     { ID: 'Ed', MESSAGE_TEXT: 'Spencer' },
    //     { ID: 'Tommy', MESSAGE_TEXT: 'Maintz' },
    //     { ID: 'Aaron', MESSAGE_TEXT: 'Conran' },
    //     { ID: 'Jamie', MESSAGE_TEXT: 'Avins' }
    //]
    autoLoad: true,
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: '/Home/GetMessage',
        reader: {
            //type: 'json'
            //,
            root: 'data'
            //totalProperty: 'totalRows'
        },
        params: {
            unread: 'false'
        }
    }
});