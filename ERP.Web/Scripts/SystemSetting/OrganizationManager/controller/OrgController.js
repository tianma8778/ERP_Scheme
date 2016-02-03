Ext.define('Scripts.controller.SystemManage.OrgController', {
    extend: 'Ext.app.Controller',
    views: ['SystemManage.Org.OrgTree', 'SystemManage.Org.OrgRightMenu', 'SystemManage.Org.OrgWindow',
            "SystemManage.Org.TreeWindow"],
    models: ['SystemManage.Org.OrgModel', "Scripts.model.BasicData.GeneralParameter.GeneralParameterModel"],
    stores: ['SystemManage.Org.OrgStore', "Scripts.store.BasicData.GeneralParameter.DepType"],
    refs: [
        {
            ref: 'Ali_OrgTree',
            selector: 'Ali_OrgTree'
        }
    ],
    init: function (app) {
        activetab("Ali_OrgTree");
        var win = Ext.widget("Ali_OrgWindow");
        this.control({
            'Ali_OrgTree': {
                itemcontextmenu: this.showRightMenu,
                afterrender: this.treeRender
            },
            'Ali_OrgRightMenu': {
                click: this.rightMenuClick
            },
            'Ali_OrgWindow button[action=ok]': {
                click: this.saveOrg
            }
        });
    },
    treeRender: function () {
        this.getStore("SystemManage.Org.OrgStore").load();
    },
    showRightMenu: function (view, record, item, index, event) {
        event.preventDefault();
        var menu = Ext.widget("Ali_OrgRightMenu");
        view.select();
        menu.showAt(event.getXY());
    },
    rightMenuClick: function (menu, item) {
        var me = this;
        var tree = this.getAli_OrgTree();
        var node = tree.getSelectionModel().getSelection()[0];
        switch (item.eName) {
            case 'add':
                var win = Ext.ComponentQuery.query("Ali_OrgWindow")[0];
                win.setTitle('添加组织');
                var pid = node.get("id");
                var oldPath = node.get("path");
                var newPath = "";
                switch (oldPath) {
                    case "":
                        newPath = ",0,";
                        break;
                    default:
                        newPath = "," + pid + oldPath;
                        break;
                }
                var tier = node.getDepth();
                tier = tier + 1;
                var type = node.get("type");
                win.down("combobox[name=type]").setValue(type);
                if (type === "部门") {
                    win.down("combobox[name=type]").setReadOnly(true);
                }
                else {
                    win.down("combobox[name=type]").setReadOnly(false);
                    win.down("combo[name=depart_type]").setValue("其他类");
                }
                win.down("textfield[name=ncDepCode]").setValue("");
                win.down("textfield[name=ptext]").setValue(node.get("text"));
                win.down("hiddenfield[name=path]").setValue(newPath);
                win.down("hiddenfield[name=tier]").setValue(tier);
                win.down("hiddenfield[name=pid]").setValue(pid);
                win.down("hiddenfield[name=actionType]").setValue("ins");
                win.down("checkbox[name=beValid]").setValue(true);
                win.down("textfield[name=text]").setValue("");
                win.show();
                break;
            case 'edit':
                {
                    var win = Ext.ComponentQuery.query("Ali_OrgWindow")[0]; 
                    win.setTitle('编辑组织')
                    win.down("form").form.reset();
                    win.down("form").loadRecord(node);
                    var type = node.get("type");
                    //禁止编辑部门类型
                    {
                        win.down("combobox[name=type]").setValue(type);
                        win.down("combobox[name=type]").setReadOnly(true);
                    }
                    win.down("hiddenfield[name=actionType]").setValue("upd");
                    win.show();
                }
                break;
            case 'delete':
                if (node.get('tier') == '1') {
                    Ext.MessageBox.alert('提示', '根节点不能删除');
                }
                else if (node.get("leaf")) {
                    Ext.MessageBox.confirm('删除', '确定删除?', function (result) {
                        if (result == 'yes') {
                            tree.body.mask('正在执行，请稍候...');
                            Ext.Ajax.request({
                                url: '/Org/DeleteOrg',
                                params: {
                                    ID: node.get("id")
                                },
                                success: function (response) {
                                    tree.body.unmask();
                                    var ro = Ext.JSON.decode(response.responseText);
                                    if (ro.success == true) {
                                        Ext.MessageBox.alert('信息', ro.singleInfo);
                                        me.getStore("SystemManage.Org.OrgStore").load();
                                    }
                                    else {
                                        Ext.MessageBox.alert('警告',  ro.error);
                                    }
                                },
                                failure: function (response) {
                                    tree.body.unmask();
                                    //var result = Ext.JSON.decode(response.responseText);
                                    Ext.MessageBox.alert('警告', "数据处理异常！");
                                }
                            });
                        }
                    });
                } else {
                    Ext.MessageBox.alert('警告', '不是子节点不能删除');
                }
                break;
            case "setValid":
                tree.body.mask('正在执行，请稍候...');
                Ext.Ajax.request({
                    url: '/Org/ValidOrg',
                    params: {
                        ID: node.get("id"),
                        Value: 1
                    },
                    success: function (response) {
                        tree.body.unmask();
                        var ro = Ext.JSON.decode(response.responseText);
                        if (ro.success == true) {
                            me.getStore("SystemManage.Org.OrgStore").load();
                        }
                        else {
                            Ext.MessageBox.alert('警告', ro.error);
                        }
                    },
                    failure: function (response) {
                        tree.body.unmask();
                        //var result = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.alert('警告', "数据处理异常！");
                    }
                });
                break;
            case "setInValid":
                tree.body.mask('正在执行，请稍候...');
                Ext.Ajax.request({
                    url: '/Org/ValidOrg',
                    params: {
                        ID: node.get("id"),
                        Value: 0
                    },
                    success: function (response) {
                        tree.body.unmask();
                        var ro = Ext.JSON.decode(response.responseText);
                        if (ro.success == true) {
                            me.getStore("SystemManage.Org.OrgStore").load();
                        }
                        else {
                            Ext.MessageBox.alert('警告', ro.error);
                        }
                    },
                    failure: function (response) {
                        tree.body.unmask();
                        //var result = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.alert('警告', "数据处理异常！");
                    }
                });
                break;
        }
    },
    saveOrg: function (btn) {
        var me = this;
        var win = btn.up("window");
        var form = win.down("form");
        var record = form.getRecord();
        if (form.isValid()) {          
            form.submit({
                waitMsg: "正在提交数据……",
                waitTitle: "提示",
                url: '/Org/SaveOrg',
                params: record,
                method: 'post',
                success: function (form, action) {
                    var result = Ext.decode(action.response.responseText);
                    console.log(result);
                    if (result.data.success == true) {
                        me.getStore("SystemManage.Org.OrgStore").load();
                        win.close();
                        var tree = me.getAli_OrgTree();
                        var node = tree.getSelectionModel().deselectAll();
                        Ext.Msg.alert("提示", result.data.singleInfo);
                    }
                    else if (result.data.success == false) {
                        Ext.Msg.alert("警告", result.data.error);
                    }
                },
                failure: function (form, action) {
                    //var result = Ext.decode(action.response.responseText);
                    Ext.MessageBox.alert('警告', "数据处理异常！");
                }
            });
        }
    }
});