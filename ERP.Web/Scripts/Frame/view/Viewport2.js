//2
//js获取cookie
/*获取Cookie值*/
var welcome = '用户:' + user_name + ' ';
function getCookie(c_name) {

    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length

            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}


function changePwd() {
    var PwdForm = new Ext.form.FormPanel({
        width: 360,
        plain: true,
        layout: "form",
        defaultType: "textfield",
        labelWidth: 100,
        baseCls: "x-plain",
        defaults: { anchor: "100%", msgTarget: "under" },
        buttonAlign: "center",
        bodyStyle: "padding:0 0 0 0",
        items: [{
            name: "OldPassWord",
            fieldLabel: "旧密码",
            inputType: "password",
            allowBlank: false
        },
        {
            name: "NewPassWord",
            fieldLabel: "新密码",
            inputType: "password",
            allowBlank: false,
            regex: /^([a-zA-Z0-9~_@$]{6,})$/i,
            regexText: '必须同时包含字母和数字,且最少有6位'

        }, {
            name: "ConfirmPassWord",
            inputType: "password",
            fieldLabel: "确认新密码",
            allowBlank: false,
            validator: function (value) {
                var pw = this.previousSibling().value;
                if (value != pw) {
                    return '两次输入的密码不一致';
                } else {
                    return true;
                }
            }
        }
        ]
    });
    var PwdWin = new Ext.Window({
        title: "修改密码",
        width: 400,
        plain: true,
        layout: "form",
        iconCls: "addicon",
        resizable: false,
        defaultType: "textfield",
        labelWidth: 100,
        collapsible: true,
        closable: true,
        modal: 'true',
        buttonAlign: "center",
        bodyStyle: "padding:10px 0 0 15px",
        items: [PwdForm],
        buttons: [{
            text: "保存",
            minWidth: 70,
            handler: function () {
                if (PwdForm.getForm().isValid()) {
                    PwdForm.form.submit({
                        url: "/user/UpdatePwd",
                        waitTitle: 'tip',
                        waitMsg: '保存，请等待...',
                        method: "POST",
                        success: function (form, action) {

                            Ext.MessageBox.alert("成功", "修改成功!");
                            PwdWin.close();

                        },
                        failure: function (form, action) {
                            //console.log(action);
                            Ext.MessageBox.alert("消息!", "保存失败:" + action.result.error);
                        }
                    });
                }
            }
        }, {
            text: "取消",
            minWidth: 70,
            handler: function () {
                PwdWin.close();
            }
        }]

    });
    PwdWin.show();
}
//版本信息
//function showVersion() {
//    var VersionForm = new Ext.form.FormPanel({
//        plain: true,
//        layout: "form",
//        defaultType: "label",
//        baseCls: "x-plain",
//        //defaults: { anchor: "100%", msgTarget: "under" },
//        buttonAlign: "center",
//        items: [{
//            html: '当前版本号：0.4.11'
//        },
//        {
//            html: '修改日期&nbsp;&nbsp;&nbsp;：2016-01-12 10:30'

//        }, {
//            html: '修改内容&nbsp;&nbsp;&nbsp;：1.司机待确认不显示，已确认 检索日期改为 departure_time;</br><label style="margin-left:84px">司机排队信息包装到 当前任务中,收货图片上传</label></br><label style="margin-left:84px">上传图片时第三张图片覆盖第二张图片</label></br><label style="margin-left:84px">车辆借用checkbox问题，调度计划按ID排序</label></br><label style="margin-left:84px">统一显示实际发车时间</label></br><label style="margin-left:84px">预约用车司机配送完成 刷新保存gps信息时提供错误提示</label></br>' +
//                  '<label style="margin-left:72px">2.派车路线规划增加拖拽排序功能</label></br><label style="margin-left:84px">其他bug修复以及优化</label></br>'
//        }
//        ]
//    });
//    var VersionWin = new Ext.Window({
//        title: "版本信息",
//        width: 460,
//        height: 340,
//        plain: true,
//        layout: "form",
//        resizable: false,
//        autoScroll: true,
//        fit: true,
//        defaultType: "label",
//        closable: true,
//        modal: 'true',
//        bodyStyle: "padding:10px 0 0 15px",
//        items: [VersionForm]

//    });
//    VersionWin.show();
//}

function showMessage() {
    //var MessageForm = new Ext.form.FormPanel({
    //    plain: true,
    //    layout: "form",
    //    defaultType: "label",
    //    baseCls: "x-plain",
    //    //defaults: { anchor: "100%", msgTarget: "under" },
    //    buttonAlign: "center",
    //    items: [{
    //        html: '当前版本号：0.2.5'
    //    },
    //    {
    //        html: '修改日期&nbsp;&nbsp;&nbsp;：2016-01-04 16:40'
    //    }, {
    //        html: '修改内容&nbsp;&nbsp;&nbsp;：1.常温派车 地点支持多线路，波次路线多选，加上未发运</br><label style="margin-left:84px">常温 生鲜波次多选，路线多选，地点支持多路线 派车调整</label></br><label style="margin-left:84px">修改录入封车条保存之后才生成费用,修改部分时间字段赋值问题</label></br><label style="margin-left:84px">修改录入封车条保存之后才生成费用,修改部分时间字段赋值问题</label></br>' +
    //              '<label style="margin-left:72px">2.全部页面已添加创建人,创建时间,修改人,修改时间</label></br><label style="margin-left:84px">派车路线规划去掉全选,加上操作权限</label></br>'
    //    }
    //    ]
    //});
    //定义消息
    //Ext.define("viewport.Message.MessageModel", {
    //    extend: "Ext.data.Model",
    //    fields: [
    //         { name: 'ID' },
    //        { name: 'MESSAGE_TEXT' },
    //        { name: 'SEND_BY' },
    //        { name: 'SEND_DATE' },
    //        { name: 'RECEIVE_BY' },
    //        { name: 'RECEIVE_DATE' },
    //        { name: 'B_VIEW' }
    //    ]
    //});
    //var storeA = Ext.create("Ext.data.Store", {
    //    model: "viewport.Message.MessageModel",
    //    autoLoad: true,
    //    pageSize: 25,
    //    proxy: {
    //        type: "ajax",
    //        url: '/Home/GetMessage',
    //        extraParams: {
    //            page: 1,
    //            limit: 25
    //        },
    //        reader: {
    //            type: 'json',
    //            root: 'data'
    //        }
    //    }
    //});
    //console.log(storeA);
    //var gridPanel = new Ext.grid.Panel(
    //    {
    //        store: storeA, //"Scripts.store.SystemManage.Message.MessageStore",
    //        selModel: {
    //            //handleMouseDown: Ext.emptyFn,
    //            injectCheckbox: 0,
    //            //checkbox位于哪一列，默认值为0
    //            mode: 'multi',
    //            //multi,simple,single；默认为多选multi
    //            checkOnly: false,
    //            //如果值为true，则只用点击checkbox列才能选中此条记录
    //            allowDeselect: true,
    //            //如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
    //            enableKeyNav: false,
    //            // 打开/关闭键盘导航网格内。
    //            selType: "rowmodel"
    //        },
    //        viewConfig: {
    //            forceFit: true,
    //            enableTextSelection: true,
    //            autoScroll: true
    //        },
    //        columns: [
    //                { text: 'ID', dataIndex: 'ID' },
    //                { text: '消息内容', dataIndex: 'MESSAGE_TEXT' },
    //                { text: '发送者', dataIndex: 'SEND_BY' },
    //                { text: '发送时间', dataIndex: 'SEND_DATE' },
    //                { text: '接收者', dataIndex: 'RECEIVE_BY' },
    //                { text: '接收日期', dataIndex: 'RECEIVE_DATE' },
    //                { text: '已读', dataIndex: 'B_VIEW' }
    //        ],
    //        listeners: {
    //            itemdblclick: function (me, record, item, index, e, eOpts) {
    //                //双击事件的操作
    //            }
    //        },
    //    }
    //    );
    //console.log(gridPanel.getStore());

    var MessageWin = new Ext.Window({
        title: "系统消息",
        width: 600,
        height: 340,
        plain: true,
        layout: "fit",
        resizable: false,
        autoScroll: true,
        fit: true,
        defaultType: "label",
        closable: true,
        modal: 'true',

        items: [{ xtype: 'Ali_MessageList' }]

    });
    //setTimeout(1000);
    MessageWin.show();
}

function exitApp() {

    window.location.href = '/Home/Logout';

}
var Rights;

//jQuery.ajax({
//    'url':'/User/IsRight',
////'url': 'Response/user/DAL_User.ashx?type=is_Rights',
//'cache': false,
//'async': false,
//'dataType': 'json',
//'success': function(data) {
//    Rights = data;
//}
//});
Ext.define('Scripts.Frame.view.Viewport', {
    extend: 'Ext.container.Viewport',
    //布局方式：border
    layout: 'border',
    items: [
{
    layout: 'border',
    region: 'west',
    margins: '0 5 0 0',
    width: 210,
    minSize: 180,
    //collapsed:true,
    maxSize: 400,
    border: 0,
    //split: true,
    items: [
            {
                xtype: 'container',
                layout: 'vbox',
                region: 'north',

                width: 210,
                items: [{
                    xtype: 'container',
                    layout: 'absolute',
                    items: [
                        {
                            xtype: 'image',
                            src: '/Content/images/logo.png',
                            margin: '2 0 0 5',
                            height: 31,
                            width: 176,
                        },
                        {
                            xtype: 'tool',
                            type: 'expand-left',
                            x: 192,
                            y: 10,
                            listeners: {
                                click: function (e) {
                                    e.up('panel').collapse();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    width: 210,
                    height: 24,
                    margin: '5 0 0 0',
                    border: 0,
                    items: [
                       {
                           xtype: 'container',
                           layout: 'hbox',
                           margin: '0 0 0 3',
                           items: [
                               {
                                   xtype: 'image',
                                   height: 16,
                                   width: 16,
                                   src: '/Content/images/User1.png'
                               },
                                {
                                    xtype: 'label',
                                    html: '<b style="color:#ffffff;font-weight:bold;">' + welcome + '</b>',
                                    margin: '0 10 0 0'
                                }
                           ]
                       },
                       {
                           xtype: 'tbspacer',
                           flex: 1
                       },
                         {
                             xtype: 'button',
                             icon: '/Content/images/log.png',
                             margin: '0 5 0 0'
                         },

                    {
                        xtype: 'button',
                        icon: '/Content/images/exit.png',
                        listeners: {
                            click: function (e) {
                                e.up('panel').collapse();

                                Ext.Msg.confirm("退出", "确定要退出吗？", function (r) {
                                    if (r == 'yes') {
                                        window.location.href = '/Home/Logout';
                                    }
                                });
                            }
                        }

                    }
                    ]
                }
                ]
            },
{
    id: 'west-panel',
    iconCls: 'tabs',
    title: '菜单',
    xtype: 'container',
    region: 'center',

    margins: '5 0 0 0',
    bodyPadding: 0,
    //itemCls: 'accordion-header-padding:10',
    layout: 'accordion',
    layoutConfig: {
        animate: true
    }
}
    ]
},
{
    xtype: 'center',
    margins: '4 0 0 0'
}
//,
//{
//    region: 'south',
//    html: html3
//}
    ]
});
