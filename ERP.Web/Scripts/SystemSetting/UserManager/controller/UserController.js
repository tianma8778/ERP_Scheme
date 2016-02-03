Ext.define('Scripts.SystemSetting.UserManager.controller.UserController', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.tip.ToolTip', 'Ext.tip.Tip'],
    stores: [
        "UserStore"
    ],
    views: [
        "UserList", "UserEdit"
    ],
    models: [
        "UserModel"
    ],
    init: function () {
        activetab("Ali_UserList");
        this.control({
            'Ali_UserList': {
                itemdblclick: this.editUserDg,
                itemcontextmenu: this.contextmenu
            },
            'Ali_UserList button[action=add]': {
                click: this.addUser
            },
            'Ali_UserList button[action=edit]': {
                click: this.editUser
            },
            'Ali_UserList button[action=editpwd]': {
                click: this.editPwd
            },
            'Ali_UserEdit button[action=save]': {
                click: this.saveUser
            },
            'Ali_UserList button[action=del]': {
                click: this.delUser
            },

            'Ali_UserList button[action=select]': {
                click: this.searchUser
            },
            'Ali_UserList button[action=clear]': {
                click: this.clearQuery
            },

            'Ali_UserList button[action=setrole]': {
                click: this.setRole
            },
            'Ali_RoleSet button[action=save]': {
                click: this.saveUserRole
            },

            'Ali_EditPwd button[action=save]': {
                click: this.saveUserPwd
            },


        });
    },


    clearQuery: function (btn) {
        btn.up("form").getForm().reset();
    },

    //changeCom: function (combo, newValue, oldValue) {
    //    if (combo.getValue() != null) {
    //        var dp_com = combo.up("form").down('combo[name=DEPARTMENT_ID]');
    //        var store = dp_com.getStore();
    //        store.load({
    //            params: {
    //                COM_ID: combo.getValue()
    //            }
    //        });
    //        // dp_com.clearValue();
    //    }
    //},
    //changeDep: function (combo, newValue, oldValue) {
    //    if (combo.getValue() != null) {

    //        var store = this.getStore('Post');
    //        store.load({
    //            params: {
    //                department_id: combo.getValue()
    //            }
    //        });
    //    }
    //},

    addUser: function (btn) {
        var win = Ext.widget("Ali_UserEdit");
        win.setTitle("新增用户");
        var modetype = win.down('textfield[name=modetype]');
        modetype.setValue("ins");

        //var dp_com = win.down("form").down('combo[name=DEPARTMENT_ID]');
        //var store = dp_com.getStore();
        //store.removeAll();

        //win.down("form").down('combo[name=COM_ID]').getStore().load();
        win.show();
    },

    editUserDg: function (grid, record) {

        //var dp_com = win.down("form").down('combo[name=DEPARTMENT_ID]');
        //var store = dp_com.getStore();
        //store.load({
        //    params: {
        //        COM_ID: record.data.COM_ID
        //    }
        //});
        this.openEditUser(record);

    },

    editUser: function (btn) {
        var grid = btn.up('grid');
        var records = grid.getSelectionModel().getSelection();

        if (records.length != 1) {
            Ext.MessageBox.alert('提示', '请选择一条数据');
            return;
        }

        this.openEditUser(records[0]);
    },

    openEditUser: function (record) {
        var win = Ext.widget("Ali_UserEdit");
        var form = win.down("form");
        form.loadRecord(record);

        var Username = win.down("form").down('textfield[name=Username]');
        if (Username.getValue().toLowerCase() == 'admin') {
            Username.readOnly = true;
            Username.fieldStyle = "background-color:#e5e5e5;background-image: none;";
            var Is_Enable = win.down("form").down('checkbox[name=Is_Enable]');
            Is_Enable.hide();
        }

        var Password = form.down('textfield[name=Password]');
        var Password2 = form.down('textfield[name=Password2]');
        form.remove(Password);
        form.remove(Password2);

        var modetype = win.down('textfield[name=modetype]');
        modetype.setValue("upd");

        win.show();
    },

    saveUser: function (btn) {
        var store = Ext.widget("Ali_UserList").getStore();
        var win = btn.up("window"),
        form = win.down("form");
        if (!form.getForm().isValid()) return;

        var modetype = win.down('textfield[name=modetype]').getValue();

        var requestObject = form.getValues();

        Ext.Ajax.request2({
            url: modetype == "ins" ? "/User/AddUser" : "/User/EditUser",
            method: 'POST',
            params: requestObject,
            success: function (response, options) {
                Ext.Msg.alert("提示", "用户修改成功！");
                store.load();
                win.close();
            }
        });
    },

    //editPwd: function (btn) {

    //    var grid = btn.up('grid');
    //    var records = grid.getSelectionModel().getSelection();

    //    if (records.length != 1) {
    //        Ext.MessageBox.alert('提示', '请选择一条数据');
    //    } else {
    //        var win = Ext.widget("Ali_EditPwd");

    //        win.show();

    //        var modetype = win.down('textfield[name=modetype]');
    //        modetype.setValue("upd");

    //    }
    //},

    //saveUserPwd: function (btn) {
    //    var store = Ext.widget("Ali_UserList").getStore();
    //    var win = btn.up("window"),
    //    form = win.down("form");

    //    if (!form.getForm().isValid()) return;

    //    var url;

    //    form.getForm().submit({
    //        waitMsg: "正在提交数据……",
    //        waitTitle: "提示",
    //        url: "/User/EditPwd",
    //        method: "post",
    //        success: function (form, action) {

    //            var result = Ext.decode(action.response.responseText);
    //            if (result.data.success) {
    //                store.load();
    //                win.close();
    //                Ext.Msg.alert("提示", "保存成功!");
    //            }
    //            else {
    //                Ext.Msg.alert("警告", result.data.error);
    //            }


    //        },
    //        failure: function (formm, action) {
    //            Ext.Msg.alert("警告", "数据处理异常！");
    //        }
    //    });
    //},

    delUser: function (btn) {
        var grid = btn.up('gridpanel');
        var records = grid.getSelectionModel().getSelection();

        if (records.length != 1) {
            Ext.MessageBox.alert('提示', '请选择一条数据');
            return;
        }

        for (var i = 0; i < records.length; i++) {
            if (records[i].data.Username.toLowerCase() == 'admin') {
                Ext.Msg.alert("提示", "系统管理员账户不能删除！");
                return false;
            }
        }

        var ID = '';
        for (var i = 0; i < records.length; i++) {
            ID += records[i].data.ID + ',';
        }
        if (ID.length > 0) {
            Ext.MessageBox.confirm('删除', '确定要删除选中的数据吗?', function (result) {
                if (result == 'yes') {
                    Ext.Ajax.request2({
                        url: "/User/DelUser",
                        method: 'POST',
                        params: {
                            ids: ID.substring(0, ID.length - 1)
                        },
                        success: function (response, options) {
                            Ext.Msg.alert("提示", "用户已删除！");
                            grid.store.load();
                        }
                    });
                }
            });
        }
    },

    searchUser: function (btn) {
        var grid = btn.up('gridpanel');
        var store = grid.getStore('User');
        var usercode = grid.down('textfield[name=User_Code]').getValue();
        var username = grid.down('textfield[name=Username]').getValue();
        var comname = grid.down('textfield[name=COM_NAME]').getValue();
        var departmentname = grid.down('textfield[name=DEPARTMENT_NAME]').getValue();
        var phonenumber = grid.down('textfield[name=PHONE_NUMBER]').getValue();
        //var roleid = grid.down('combo[name=ROLE_ID]').getValue();
        var bview = grid.down('combo[name=Checkbox_bview]').getValue();


        store.proxy.extraParams = {
            usercode: usercode,
            username: username,
            comname: comname,
            departmentname: departmentname,
            phonenumber: phonenumber,
            //roleid: roleid,
            bview: bview
        }
        store.loadPage(1);


    },
    //setRole: function (btn) {
    //    var grid = btn.up('grid');
    //    var records = grid.getSelectionModel().getSelection();

    //    if (records.length > 1 || records.length < 1) {
    //        Ext.Msg.alert("警告", "请选定一行数据进行操作！");
    //    } else {
    //        var userid = records[0].data.ID;

    //        var store_no = this.getStore('SystemSetting.User.Role_No');
    //        store_no.load();
    //        var win = Ext.widget("Ali_RoleSet");

    //        var uid = win.down('hiddenfield[name=userid1]');
    //        uid.setValue(userid);

    //        Ext.Ajax.request({
    //            url: "/Role/GetRoleIDListByUserID",
    //            success: function (response, options) {
    //                var o = Ext.decode(response.responseText.toString());
    //                win.down("itemselector").setValue(o.data);

    //            },
    //            failure: function (response, options) {
    //                Ext.Msg.alert("警告", "读取失败，请稍后再试！");
    //            },
    //            method: 'POST',
    //            params: {
    //                userid: userid
    //            }
    //        });

    //        win.show();
    //    }
    //},
    //saveUserRole: function (btn) {
    //    var rolevalues = btn.up('window').down('form').down('itemselector').getValue();
    //    var rolevalue = Ext.encode(rolevalues).replace('[', '').replace(/"/g, '').replace(']', '');
    //    var userid = btn.up('window').down('hiddenfield[name=userid1]').getValue();
    //    var store = Ext.widget("Ali_UserList").getStore();
    //    Ext.Ajax.request({
    //        url: "/Role/SaveRoleForUser",
    //        success: function (response, options) {
    //            var o = Ext.decode(response.responseText.toString());
    //            if (o.data.success == true) {
    //                btn.up('window').close();
    //                store.load();
    //                Ext.Msg.alert("信息", "保存成功！");


    //            } else if (o.data.success == false) {
    //                Ext.Msg.alert("警告", o.data.error);
    //            }
    //        },
    //        failure: function (response, options) {
    //            Ext.Msg.alert("警告", "数据处理异常！");
    //        },
    //        method: 'POST',
    //        params: {
    //            userid: userid,
    //            roles: rolevalue
    //        }
    //    });

    //}
});