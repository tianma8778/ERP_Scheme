Ext.Ajax.on('requestcomplete', function (conn, response, options, eOpts) {
    if (response.status == 200) {

        var resultObject = Ext.JSON.decode(response.responseText);

        if (resultObject.success == true || resultObject.code === 0) {
            return true;
        } else if (resultObject.success != true && resultObject.code == 1000) {
            Ext.Msg.alert('提示', '会话超时，请重新登录!', function () {
                window.top.location.href = '/Home/login';
            });
            return false;
        } else if (resultObject.success != true &&
                (resultObject.code >= 3000 && resultObject.code <= 3999)) {
            Ext.Msg.alert('提示', "[" + resultObject.code + "]" + resultObject.message);
            return false;
        } else if (resultObject.success != true &&
                    (resultObject.code >= 2000 && resultObject.code <= 2999)) {
            Ext.Msg.alert('错误', "[" + resultObject.code + "]发生系统错误，请联系管理员");
            return false;
        } else {
            Ext.Msg.alert('错误', '发生未知系统错误');
            return false;
        }
    } else {
        Ext.Msg.alert('错误', '网络异常!');
        return false;
    }
});

Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
    Ext.Msg.alert('错误', '网络异常!');

});



Ext.Ajax.request2=function(opts){
    Ext.Ajax.request({
        url: opts.url,
        method: opts.method,
        params: opts.params,
        success: function (response, options) {
            var result = Ext.decode(response.responseText.toString());
            if (result.success = true && result.code == 0) {
                opts.success(response, options);
            } else {
                //全部在Ajax.on中处理
            }
        },
        failure: function (response, options) {
            ////全部在Ajax.on中处理
        }
    });
}