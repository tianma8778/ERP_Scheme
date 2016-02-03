Ext.define('Scripts.frame.model.MessageModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID' },
            { name: 'MESSAGE_TEXT' },
            { name: 'SEND_BY' },
            { name: 'SEND_DATE' },
            { name: 'RECEIVE_BY' },
            { name: 'RECEIVE_DATE' },
            { name: 'B_VIEW' }
    ]
});
