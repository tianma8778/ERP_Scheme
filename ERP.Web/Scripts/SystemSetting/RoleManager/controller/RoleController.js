Ext.define('Scripts.controller.SystemManage.RoleController', {
    extend: 'Ext.app.Controller',
    stores: ['SystemManage.Role.RoleStore', 'SystemManage.Role.LimitsStore'],
    views: ['SystemManage.Role.RoleList', 'SystemManage.Role.RoleWindow', 'SystemManage.Role.LimitsTree', 'SystemManage.Role.LimitsWindow'],
    models: ['SystemManage.Role.RoleModel', 'SystemManage.Role.LimitsModel'],
    init: function () {
        activetab('Ali_Rolelist');
        this.control({
            'Ali_Rolelist': {
                itemdblclick: this.EditRoleItem
                //,
                //afterrender: this.reCreate
            },
            'Ali_Rolelist button': {
                click: this.manageRole
            },

            'Ali_Rolelist button[action=clear]': {
                click: this.ClearQuery
            },

            'Ali_RoleWindow button': {
                click: this.Ali_RoleWindowAction
            },
            'Ali_LimitsTree': {
                checkchange: this.treeChecked
            },
            'Ali_LimitsWindow button': {
                click: this.limitsAction
            }
        });
    }
    ,

    ClearQuery: function (btn) {
        var grid = btn.up("grid")
        //  var store = grid.getStore('Vehicle');
        grid.down("textfield[name=search]").setValue("");      //车号


    },

    EditRoleItem: function (grid, record) {
        
       // grid.up("grid").down("textfield[name=search]").setValue("")
       
        var win = Ext.widget("Ali_RoleWindow");

        //if (window.Rights.R1010203) {
        //    win.down('button[action=roleOk]').show();
        //} else {
        //    win.down('button[action=roleOk]').hide();
        //}
         
            win.title = '编辑角色';
            win.down("form").loadRecord(record);
            win.show();

            var modetype = win.down("hiddenfield[name=action_type]");

            modetype.setValue("upd");



    },

    manageRole: function (btn) {
        var me = this;
        var roleGride = btn.up('grid');
        var loadMarsk = new Ext.LoadMask(roleGride, {//元素、DOM节点或id, { 
            msg: '正在执行，请稍候...',
            removeMask: true// 完成后移除 
        });
        var record = roleGride.getSelectionModel().getSelection();
        switch (btn.ename) {
            case 'roleSearch':
                var searchText = roleGride.down("textfield[name=search]").getValue();
                this.getStore('SystemManage.Role.RoleStore').load({
                    params: {
                        keyWord: searchText
                    }
                });
                break;
            case 'roleAdd':
                roleGride.down("textfield[name=search]").setValue("");
                var win = Ext.widget("Ali_RoleWindow");
                win.title = '新增角色';
                var form = win.down('form');
                form.down('hiddenfield[name=action_type]').setValue("ins");
                win.show();
                break;
            case 'roleEdit':
                if (record.length == 1) {
                    roleGride.getSelectionModel().deselect(record);
                  //  roleGride.down("textfield[name=search]").setValue("");
                    var win = Ext.widget("Ali_RoleWindow");
                    win.title = '编辑角色';
                    var form = win.down('form');
                    form.loadRecord(record[0]);
                    form.down('hiddenfield[name=action_type]').setValue("upd");
                    win.show();
                } else {
                    Ext.MessageBox.alert('提示', '请选择要修改的数据');
                }

                break;
            case 'roleDel':
                if (record.length == 1) {
                    var r = record[0].data;
                    Ext.MessageBox.confirm('删除', '确定删除?', function (result) {
                        if (result == 'yes') {
                            loadMarsk.show();
                            Ext.Ajax.request({
                                url: '/Role/DelRole',
                                params: {
                                    id: r.id
                                },
                                success: function (response) {

                                    var result = Ext.decode(response.responseText.toString());
                                    if (result.success == true) {
                                        loadMarsk.hide();
                                        me.getStore("SystemManage.Role.RoleStore").load();
                                        Ext.Msg.alert("提示", "删除成功!");

                                    } else if (result.success == false) {
                                        loadMarsk.hide();
                                        Ext.Msg.alert("警告", result.error);

                                    }

                                },
                                failure: function (form, action) {
                                    loadMarsk.hide();
                                    Ext.Msg.alert("提示", "删除失败:" + action.result.error);
                                    //Ext.MessageBox.alert('提示', '出错了');
                                }
                            });
                        }
                    });
                } else {
                    Ext.MessageBox.alert('提示', '请选择一行数据');
                }
                break;
            case 'roleLimit':
                if (record.length == 1) {
                    roleGride.getSelectionModel().deselect(record);
                    roleGride.down("textfield[name=search]").setValue("");
                    
                    var win = Ext.widget("Ali_LimitsWindow");
                    win.roleid = record[0].data.id;
                    this.getStore("SystemManage.Role.LimitsStore").load({
                        params: {
                            roleId: record[0].data.id
                        }
                    });
                    win.show();
                } else {
                    Ext.MessageBox.alert('提示', '请选择要修改的数据');
                }

                break;
        }
    },
    reCreate: function (grid) {
        this.getStore('SystemManage.Role.RoleStore').load();
    },
    Ali_RoleWindowAction: function (btn) {
        var me = this;
        var win = btn.up("window");
        switch (btn.action) {
            //case 'roleCancel':
            //    win.close();
            //    break;
            case 'roleOk':
                var form = win.down("form");
                var modetype = win.down("hiddenfield[name=action_type]").getValue();
                // var record=form.getValues();
                if (form.isValid()) {
                    form.submit({
                        waitMsg: "正在提交数据……",
                        waitTitle: "提示",
                        url: '/Role/SaveRoleModel',
                        //  params :record,
                        method: 'post',
                        success: function (form, action) {
                           
                            var result = Ext.decode(action.response.responseText);
                            if (result.data.success == true) {

                                me.getStore("SystemManage.Role.RoleStore").load();
                                win.close();
                                Ext.Msg.alert("提示", "保存成功!");

                            } else if (result.data.success == false) {
                                Ext.Msg.alert("警告", result.data.error);
                            }


                        },
                        failure: function (form, action) {
                            
                            Ext.Msg.alert("提示", "保存失败:" + action.result.error);
                            //Ext.MessageBox.alert('提示', '出错了');
                        },
                        params: {
                            type: modetype
                        }
                    });
                }
                break;
        }
    },
    treeChecked: function (node, checked) {
        if (checked == true) {
            node.checked = checked;
            //alert(node.get("leaf"));
            //获得父节点
            pNode = node.parentNode;
            //当checked == true通过循环将所有父节点选中
            for (; pNode != null; pNode = pNode.parentNode) {
                pNode.set("checked", true);
            }
            if (!node.get("leaf")) {
                node.cascadeBy(function (node) {
                    node.set('checked', true);

                });
            }

        } else {

            //取消选中

            if (!node.get("leaf")) {
                node.cascadeBy(function (node) {
                    node.set('checked', false);

                });
            }
            //下面是向上取消

            var clickNode = node;
            // alert(node.get("pid"));
            while (true) {
                // alert(clickNode.get("id"));
                if (clickNode.get("pid") == 0) {
                    return;
                }
                var checkFlag = false;
                var nextSi = clickNode;
                var preSi = clickNode;
                //   alert(preSi);


                if (!checkFlag && nextSi != null) {
                    for (; nextSi != null; nextSi = nextSi.nextSibling) {
                        if (nextSi.get("checked")) {
                            checkFlag = true;;
                            return;
                        }
                    }
                }

                if (!checkFlag && preSi != null) {
                    for (; preSi != null; preSi = preSi.previousSibling) {

                        if (preSi.get("checked")) {
                            checkFlag = true;
                            return;
                        }
                    }
                }
                if (!checkFlag) {
                    //alert("没有兄弟被选中");
                    clickNode = clickNode.parentNode;
                    if (clickNode != null) {
                        clickNode.set("checked", false);
                    } else {
                        return;
                    }
                } else {
                    return;
                }



            }
        }
        //当该节点有子节点时，将所有子节点选中删除



    },
    limitsAction: function (btn) {
        var ids = '';
        var win = btn.up("window");
        var store = Ext.widget("Ali_Rolelist").getStore();
        switch (btn.action) {
            case 'limitsOk':
                var _limitTree = win.down('treepanel');
                var _checkedNode = _limitTree.getChecked();
                if (_checkedNode.length > 0) {
                    for (var i = 0; i < _checkedNode.length; i++) {
                        ids = ids + "," + _checkedNode[i].get("desc");///desc里放的是id,id里放的是limits_id
                    }
                    Ext.Ajax.request({
                        url: '/Role/SaveRoleLimitsList',
                        params: {
                            ids: ids,
                            winId: win.roleid
                        },
                        success: function (response) {
                           

                            var result = Ext.decode(response.responseText.toString());
                            if (result.success == true) {

                                win.close();
                                store.load();
                                // process server response here
                                Ext.Msg.alert("提示", "保存成功!");

                            } else if (result.success == false) {

                                Ext.Msg.alert("警告", result.error);

                            }


                        },
                        failure: function (form, action) {

                            Ext.Msg.alert("提示", "保存失败:" + action.result.error);
                            //Ext.MessageBox.alert('提示', '出错了');
                        }
                    });

                } else {
                    win.close();
                }
                break;

            //case 'limitsCancel':

            //    win.close();
            //    break;
        }
    }
});