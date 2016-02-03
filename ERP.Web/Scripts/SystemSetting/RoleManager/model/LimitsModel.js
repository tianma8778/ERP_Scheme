Ext.define('Scripts.model.SystemManage.Role.LimitsModel', {
	extend: 'Ext.data.Model',
    fields:[
        {name:'id'},
        {name:'pid'},
        {name:'text'},
        //type为布尔型时，后面的默认值是必须写的，要不会出错
        {name:'leaf'},
        {name:'ptext'} ,
        {name:'desc'},   
        {name:'checked'}
    ]
});
