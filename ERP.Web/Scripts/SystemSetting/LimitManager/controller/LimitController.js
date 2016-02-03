Ext.define('Scripts.controller.SystemManage.LimitController', {
    extend: 'Ext.app.Controller',
    stores: ['SystemManage.Limit.LimitStore', 'SystemManage.Limit.LimitTypeStore'],
    models: ['SystemManage.Limit.LimitModel', 'SystemManage.Limit.LimitTypeModel'],
    //views: ['SystemManage.Limit.LimitTree'],
    views: ['SystemManage.Limit.LimitTree', 'SystemManage.Limit.LimitWindow', 'SystemManage.Limit.MenuList', 'SystemManage.Limit.LimitEditWindow', 'SystemManage.Limit.LimitRightMenu'],
    refs: [
       {
           ref: 'Ali_LimitTree',
           selector: 'Ali_LimitTree'
       }
   ],
    init: function(app) {
        activetab("Ali_LimitTree");
        this.control({
            'Ali_LimitTree': {
                itemcontextmenu: this.showRightMenu,
                afterrender: this.treeRender
            },
            'Ali_LimitRightMenu': {
                click: this.rightMenuClick
            },
            //'Ali_LimitWindow button[action=cancel]': {
            //    click: this.closeWindow
            //},
            'Ali_LimitWindow button[action=ok]': {
                click: this.saveLimit
            },
            //'Ali_LimiteditWindow button[action=cancel]': {
            //    click: this.closeWindow
            //},
            'Ali_LimiteditWindow button[action=ok]': {
                click: this.saveHtmlLimit
            }
        });
    },
    treeRender: function() {
        this.getStore("SystemManage.Limit.LimitStore").load();
    },
    showRightMenu: function(view, record, item, index, event) {
        event.preventDefault();
        var menu = Ext.widget("Ali_LimitRightMenu");
        view.select();
        menu.showAt(event.getXY());
    },
    rightMenuClick: function(menu, item) {
        var me = this;
        var tree = this.getAli_LimitTree();
        var node = tree.getSelectionModel().getSelection()[0];
        switch (item.eName) {
            case 'add':
                var win = Ext.widget("Ali_LimitWindow");
                win.title = "添加权限";
                win.down("textfield[name=ptext]").setValue(node.get("text"));
                win.down("hiddenfield[name=pid]").setValue(node.get("id"));
                win.down("hiddenfield[name=actionType]").setValue("ins");
                win.show();
                break;
            case 'edit':
                var limittype = node.get("desc");
                if (limittype == 'html') {
                    var win = Ext.widget("Ali_LimiteditWindow");
                    win.title = "编辑权限";
                    Ext.Ajax.request({
                        url: 'Limit/GetMenuList?limitid=' + node.get("id") + '&ptext=' + node.get("ptext"),
                        //params: {
                        //    id: node.get("id"),
                        //    actionType: "delete"
                        //},
                        success: function(response) {
                            var ro = Ext.JSON.decode(response.responseText);
                            win.down("form").getForm().setValues(ro.data[0]);
                        }
                    });
                    win.down("hiddenfield[name=actionType]").setValue("editmenu");
                    win.show();
                }
                else {
                    var win = Ext.widget("Ali_LimitWindow");
                    win.title = "编辑权限";
                    win.down("form").form.reset();
                    win.down("form").loadRecord(node);
                    win.down("hiddenfield[name=actionType]").setValue("upd");
                    win.show();
                }
                break;
            case 'delete':
                if (node.get("leaf")) {
                    Ext.MessageBox.confirm('删除', '确定删除?', function(result) {
                        if (result == 'yes') {
                            tree.body.mask('正在执行，请稍候...');
                            Ext.Ajax.request({
                                url: '/Limit/DeleteLimits',
                                params: {
                                    id: node.get("id")
                                    //,
                                    //actionType: "delete"
                                },
                                success: function (response) {
                                    tree.body.unmask();
                                    var result = Ext.decode(response.responseText.toString());
                                    if (result.success == true) {

                                        var ro = Ext.JSON.decode(response.responseText);
                                        me.getStore("SystemManage.Limit.LimitStore").load();
                                        // process server response here

                                    } else if (result.success == false) {
                                        tree.body.unmask();
                                        Ext.Msg.alert("警告", result.error);

                                    }
                                }
                            });
                        }
                    });
                } else {
                    Ext.MessageBox.alert('提示', '不是子节点不能删除');
                }

                break;
        }
    },
    //closeWindow: function(btn) {
    //    var win = btn.up("window");
    //    win.close();
    //},
    saveLimit: function(btn) {
        var me = this;
        var win = btn.up("window");
        var form = win.down("form");
        var record = form.getRecord();
        if (form.isValid()) {
            form.submit({
                waitMsg: "正在提交数据……",
                waitTitle: "提示",
                url: '/Limit/SaveLimitModel',
                params: record,
                method: 'post',
                success: function (form, action) {

                    var result = Ext.decode(action.response.responseText);
                    if (result.data.success == true) {

                        me.getStore("SystemManage.Limit.LimitStore").load();

                        win.close();
                        var tree = me.getAli_LimitTree();
                        var node = tree.getSelectionModel().deselectAll();

                    } else if (result.data.success == false) {
                        Ext.Msg.alert("警告", result.data.error);
                    }


                   
                },
                failure: function(form, action) {
                    Ext.MessageBox.alert('提示', '数据处理异常！');
                }
            });
        }
    }
    ,
    saveHtmlLimit: function (btn) {
        var me = this;
        var win = btn.up("window");
        var form = win.down("form");
        var record = form.getRecord();
        if (form.isValid()) {
            form.submit({
                waitMsg: "正在提交数据……",
                waitTitle: "提示",
                url: '/Limit/SaveLimitHtmlModel',
                params: record,
                method: 'post',
                success: function (form, action) {


                    var result = Ext.decode(action.response.responseText);
                    if (result.data.success == true) {

                        me.getStore("SystemManage.Limit.LimitStore").reload();

                        win.close();
                        var tree = me.getAli_LimitTree();
                        var node = tree.getSelectionModel().deselectAll();

                    } else if (result.data.success == false) {
                        Ext.Msg.alert("警告", result.data.error);
                    }

                  
                    
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('提示', '数据处理异常！');
                }
            });
        }
    }



});