Ext.define('Scripts.Frame.controller.FrameController', {
    extend: 'Ext.app.Controller',
    requires: [
               'Ext.ux.window.Notification'
    ],
    views: ['Viewport', 'Center'],
    models: ['MenuModel'],
    //通过init函数来监听视图事件，控制视图与控制器的交互
    init: function () {
        var me = this;
        this.control({
            'viewport': {
                render: me.onRender
            },
            'Ali_MessageList button[action=Read]': {
                click: this.ReadClick
            },
            'Ali_MessageList button[action=unRead]': {
                click: this.unReadClick
            },
            'Ali_MessageList button[action=del]': {
                click: this.delClick
            },
            'Ali_MessageList button[action=delAll]': {
                click: this.delAllClick
            },
            scope: me
        });
    },
    onRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: '/Home/GetUserTopMenuRights', // 获取面板的地址     
            method: 'GET',
            callback: function (options, success, response) {
                me.createTree(Ext.JSON.decode(response.responseText).data);
            }
        });

        //var task = { //Ext的定时器，每隔2秒刷新store。  
        //    run: function () {
        //        var reusable = null;
        //        if (!reusable) {

        //            reusable = Ext.create('widget.uxNotification', {
        //                title: '消息通知',
        //                closeAction: 'hide',
        //                position: 'br',
        //                manager: 'demo1',
        //                useXAxis: false,
        //                width: 250,
        //                height: 115,
        //                autoCloseDelay: 7000,
        //                iconCls: 'ux-notification-icon-information'
        //            })

        //        }
        //        Ext.Ajax.request({
        //            url: '/Home/GetMessage', // 获取面板的地址    extraParams 
        //            method: 'GET',
        //            params: {
        //                page: 1,
        //                limit: 25,
        //                unread: 'true'
        //            },
        //            callback: function (options, success, response) {
        //                var datas = Ext.JSON.decode(response.responseText).data;
        //                //console.log(datas);
        //                var content = "";
        //                Ext.each(datas, function (data) {
        //                    content = content + data.MESSAGE_TEXT + "<br />";
        //                });
        //                //me.createTree(Ext.JSON.decode(response.responseText).data);
        //                reusable.update(content);
        //                if (content != "") {
        //                    reusable.show();
        //                }
        //            }
        //        });


        //        //moneyStore.load();
        //        //if (moneyStore.getAt(0)) {
        //        //    if (f == 0) {
        //        //        setTime(moneyStore.getAt(0).data.endtime)
        //        //    }
        //        //    f = 1;
        //        //}
        //    },
        //    interval: 1000 * 60 * 30
        //    // 2 second   
        //}

        //Ext.TaskManager.start(task);//启动定时器
        //Ext.TaskMgr.stop(task);//关闭定时器


    },
    createTree: function (datas) {
        var me = this;
        Ext.each(datas, function (data) {
            //console.log(data);
            var tree = Ext.create("Ext.tree.Panel", {
                title: data.title,
                autoScroll: true,
                animate: false,
                enableDD: true,
                containerScroll: true,
                rootVisible: false,
                border: false,
                root: {
                    text: 'root'
                },
                store: me.createTreeStore(data.id)
            });
            tree.on('itemclick', me.onTreeItemClick, me);

            Ext.getCmp('west-panel').add(tree);
        });

    },
    onTreeItemClick: function (view, record) {
        if (!record.isLeaf()) {
            return false;
        }

        var controllername = record.get("controllername");

        var viewname = record.get("viewname");
        var panelname = record.get("panelname");
        var app = Scripts.Frame.getApplication();
        if (!Ext.ClassManager.isCreated(controllername)) {
            Ext.require(controllername, function () {
                var appcontrol = app.getController(controllername);
            }, self);
        }
        else {
            var center = Ext.getCmp('mainContent');// Ext.widget("center");
            var panel = center.child(panelname);
            if (!panel) {
                var panel = Ext.create(viewname);
                center.add(panel);
                center.setActiveTab(panel);
            } else {
                center.setActiveTab(panel);
            }
        }

    },
    createTreeStore: function (id) {
        var me = this;
        return Ext.create("Ext.data.TreeStore", {
            requires: 'Scripts.Frame.model.MenuModel',
            model: 'Scripts.Frame.model.MenuModel',
            defaultRootId: id, // 默认的根节点id  
            proxy: {
                type: 'ajax', // 获取方式
                url: '/Home/GetMenuTree', // 获取树节点的地址  
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            clearOnLoad: true,
            nodeParam: 'topMenuId'// 设置传递给后台的参数名,值是树节点的id属性  
        });
    }
    //,
    //ReadClick: function (btn) {
    //    var grid = btn.up("grid");
    //    //console.log(grid);
    //    var records = grid.getSelectionModel().getSelection();
    //    var ID = '';
    //    for (var i = 0; i < records.length; i++) {
    //        ID += records[i].data.ID + ',';
    //    }
    //    if (ID.length > 0) {
    //        Ext.MessageBox.confirm('提示', '确定标记为已读?', function (result) {
    //            if (result == 'yes') {
    //                Ext.Ajax.request({
    //                    url: "/Home/SetMessageRead",
    //                    success: function (response, options) {
    //                        var o = Ext.decode(response.responseText.toString());
    //                        if (o.success == true) {
    //                            Ext.Msg.alert("提示", o.singleInfo);
    //                            grid.store.load(
    //                                {
    //                                    params: {
    //                                        page: 1,
    //                                        limit: 25
    //                                    },
    //                                    callback: function (records, options, success) {
    //                                        if (success == true) {
    //                                            //Ext.Msg.alert('tisih', grid.store.sum('B_VIEW'));
    //                                            //console.log(grid.store.sum('B_VIEW'));
    //                                        }
    //                                    }
    //                                }
    //                                );

    //                        } else if (o.success == false) {
    //                            Ext.Msg.alert("警告", o.error);
    //                        }
    //                    },
    //                    failure: function (response, options) {
    //                        Ext.Msg.alert("警告", "数据处理异常！");
    //                    },
    //                    method: 'POST',
    //                    params: {
    //                        read: 'true',
    //                        ids: ID.substring(0, ID.length - 1)
    //                    }
    //                });
    //            }

    //        });
    //    } else {
    //        Ext.Msg.alert("提示", "请选择数据");
    //    }
    //    //console.log(ID);
    //    //Ext.Msg.alert("提示", records[0].data.ID);
    //},
    //unReadClick: function (btn) {
    //    var grid = btn.up("grid");
    //    var records = grid.getSelectionModel().getSelection();
    //    var ID = '';
    //    for (var i = 0; i < records.length; i++) {
    //        ID += records[i].data.ID + ',';
    //    }
    //    if (ID.length > 0) {
    //        Ext.MessageBox.confirm('提示', '确定标记为未读?', function (result) {
    //            if (result == 'yes') {
    //                Ext.Ajax.request({
    //                    url: "/Home/SetMessageRead",
    //                    success: function (response, options) {
    //                        var o = Ext.decode(response.responseText.toString());
    //                        if (o.success == true) {
    //                            Ext.Msg.alert("提示", o.singleInfo);
    //                            grid.store.load(
    //                                {
    //                                    params: {
    //                                        page: 1,
    //                                        limit: 25
    //                                    },
    //                                }
    //                                );
    //                        } else if (o.success == false) {
    //                            Ext.Msg.alert("警告", o.error);
    //                        }
    //                    },
    //                    failure: function (response, options) {
    //                        Ext.Msg.alert("警告", "数据处理异常！");
    //                    },
    //                    method: 'POST',
    //                    params: {
    //                        read: 'false',
    //                        ids: ID.substring(0, ID.length - 1)
    //                    }
    //                });
    //            }

    //        });
    //    } else {
    //        Ext.Msg.alert("提示", "请选择数据");
    //    }
    //    //console.log(ID);
    //    //Ext.Msg.alert("提示", records[0].data.ID);
    //},
    //delClick: function (btn) {
    //    var grid = btn.up("grid");
    //    var records = grid.getSelectionModel().getSelection();
    //    var ID = '';
    //    for (var i = 0; i < records.length; i++) {
    //        ID += records[i].data.ID + ',';
    //    }
    //    if (ID.length > 0) {
    //        Ext.MessageBox.confirm('提示', '确定删除?', function (result) {
    //            if (result == 'yes') {
    //                Ext.Ajax.request({
    //                    url: "/Home/DelMessage",
    //                    success: function (response, options) {
    //                        var o = Ext.decode(response.responseText.toString());
    //                        if (o.success == true) {
    //                            Ext.Msg.alert("提示", o.singleInfo);
    //                            grid.store.load(
    //                                {
    //                                    params: {
    //                                        page: 1,
    //                                        limit: 25
    //                                    },
    //                                }
    //                                );
    //                        } else if (o.success == false) {
    //                            Ext.Msg.alert("警告", o.error);
    //                        }
    //                    },
    //                    failure: function (response, options) {
    //                        Ext.Msg.alert("警告", "数据处理异常！");
    //                    },
    //                    method: 'POST',
    //                    params: {
    //                        ids: ID.substring(0, ID.length - 1)
    //                    }
    //                });
    //            }

    //        });
    //    } else {
    //        Ext.Msg.alert("提示", "请选择数据");
    //    }
    //    //console.log(ID);
    //    //Ext.Msg.alert("提示", records[0].data.ID);
    //},
    //delAllClick: function (btn) {
    //    var grid = btn.up("grid");
    //    var records = grid.getSelectionModel().getSelection();
    //    var ID = '';
    //    for (var i = 0; i < records.length; i++) {
    //        ID += records[i].data.ID + ',';
    //    }
    //    if (ID.length > 0) {
    //        Ext.MessageBox.confirm('提示', '确定全部删除?', function (result) {
    //            if (result == 'yes') {
    //                Ext.Ajax.request({
    //                    url: "/Home/DelMessageAll",
    //                    success: function (response, options) {
    //                        var o = Ext.decode(response.responseText.toString());
    //                        if (o.success == true) {
    //                            Ext.Msg.alert("提示", o.singleInfo);
    //                            grid.store.load(
    //                                {
    //                                    params: {
    //                                        page: 1,
    //                                        limit: 25
    //                                    },
    //                                }
    //                                );
    //                        } else if (o.success == false) {
    //                            Ext.Msg.alert("警告", o.error);
    //                        }
    //                    },
    //                    failure: function (response, options) {
    //                        Ext.Msg.alert("警告", "数据处理异常！");
    //                    },
    //                    method: 'POST'
    //                });
    //            }

    //        });
    //    } else {
    //        Ext.Msg.alert("提示", "请选择数据");
    //    }
    //    //console.log(ID);
    //    //Ext.Msg.alert("提示", records[0].data.ID);
    //}
});
