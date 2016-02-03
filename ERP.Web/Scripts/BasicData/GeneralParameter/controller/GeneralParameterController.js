Ext.define('Scripts.controller.BasicData.GeneralParameterController', {
    extend: 'Ext.app.Controller',
    stores: ['BasicData.GeneralParameter.GeneralParameterStore', 'BasicData.GeneralParameter.CategoryStore'],
    models: ['BasicData.GeneralParameter.GeneralParameterModel', 'BasicData.GeneralParameter.CategoryModel'],
    views: ['BasicData.GeneralParameter.CategoryList', 'BasicData.GeneralParameter.GeneralParameterList', 'BasicData.GeneralParameter.GeneralParameterPanel', 'BasicData.GeneralParameter.ParameterAddOrEdit'],
    init: function (app) {
        activetab("Ali_GeneralParameterPanel");
        this.control({
            'Ali_GeneralParameterPanel': {
                afterrender: this.TreeRender
            },
            'Ali_CategoryList': {
                select: this.SelectList
            },
            'Ali_GeneralParameterList': {
                itemdblclick: this.EditParameter
            },
            'Ali_GeneralParameterList button[action=add]': {
                click: this.AddParameter
            },
            'Ali_GeneralParameterList button[action=modify]': {
                click: this.ModifyParameter
            },
            'Ali_GeneralParameterList button[action=delete]': {
                click: this.DeleteParameter
            },
            'Ali_ParameterAddOrEdit button[action=gpok]': {
                click: this.SaveParameter
            },
            'Ali_ParameterAddOrEdit button[action=cancel]': {
                click: this.CloseWindow
            }
        });
    },
    TreeRender: function () {
        this.getStore("BasicData.GeneralParameter.CategoryStore").load();
        var store = this.getStore("BasicData.GeneralParameter.GeneralParameterStore");
        store.proxy.extraParams = {

            DATA_BELONG_CAT: ''

        }
        store.load();
        var grid = Ext.ComponentQuery.query("Ali_GeneralParameterList")[0];
        grid.down("textfield[name=PARAMETER_CATEGORY]").setValue('');
    },
    CloseWindow: function (btn) {
        var win = btn.up("window");
        win.close();
    },
    //根据选择的分类查询数据
    SelectList: function (RowModel, record, index, eOpts)
    {
        var grid = Ext.ComponentQuery.query("Ali_GeneralParameterList")[0];
        var PARAMETER_CATEGORY = grid.down("textfield[name=PARAMETER_CATEGORY]");
        var IF_LOCK = grid.down("textfield[name=IF_LOCK]");
        PARAMETER_CATEGORY.setValue(record.data.ID);
        IF_LOCK.setValue(record.data.IF_LOCK);
        if (record.data.IF_LOCK != '0')
        {
            grid.down("button[name=addb]").disable();
            grid.down("button[name=editb]").disable();
            grid.down("button[name=delb]").disable();
            //Ext.getCmp('addb').disable();
            //Ext.getCmp('editb').disable();
            //Ext.getCmp('delb').disable();
        }
        else
        {
            grid.down("button[name=addb]").enable();
            grid.down("button[name=editb]").enable();
            grid.down("button[name=delb]").enable();
        }
        var store = grid.getStore();
        store.proxy.extraParams = {
            DATA_BELONG_CAT: PARAMETER_CATEGORY.getValue()
        }
        store.loadPage(1);
    },
    //双击Grid编辑数据
    EditParameter: function (grid, record)
    {
        var grid1 = grid.up('grid');
        var IF_LOCK = grid1.down("textfield[name=IF_LOCK]").getValue();
        if (IF_LOCK == "0") {
            var win = Ext.widget("Ali_ParameterAddOrEdit");
            win.down("form").loadRecord(record);
            win.setTitle("参数编辑");
            //var store = this.getStore('BasicData.GeneralParameter.GeneralParameterStore');
            //store.load({
            //    params: {
            //        id: record.data.ID
            //    }
            //});
            win.down("hiddenfield[name=id]").setValue(record.data.ID);
            win.down("hiddenfield[name=categoryname]").setValue(record.data.DATA_BELONG_CAT);
            win.down("textfield[name=value]").setValue(record.data.DATA_VALUE);
            win.down("textfield[name=key]").setValue(record.data.DATA_KEY);
            win.down("textfield[name=identify]").setValue(record.data.IDENTIFY_CODE);
            win.show();
        }
        else {
            return;
            //Ext.MessageBox.alert('提示', '此类别不允许更改');
        }
    },
    //点击编辑按钮编辑数据
    ModifyParameter: function (button)
    {

        var grid = button.up('grid');
        var IF_LOCK = grid.down("textfield[name=IF_LOCK]").getValue();
        if (IF_LOCK == "0") {
            var records = grid.getSelectionModel().getSelection();
            if (records.length > 1 || records.length < 1) {
                Ext.MessageBox.alert('提示', '请选定一行数据进行操作');
            } else {
                var win = Ext.widget("Ali_ParameterAddOrEdit");
                win.down("form").loadRecord(records[0]);

                //var store = this.getStore('BasicData.GeneralParameter.GeneralParameterStore');
                //store.load({
                //    params: {
                //        id: records[0].data.ID
                //    }
                //});
                win.down("hiddenfield[name=id]").setValue(records[0].data.ID);
                win.down("textfield[name=value]").setValue(records[0].data.DATA_VALUE);
                win.down("textfield[name=key]").setValue(records[0].data.DATA_KEY);
                win.down("hiddenfield[name=categoryname]").setValue(records[0].data.DATA_BELONG_CAT);
                win.down("textfield[name=identify]").setValue(records[0].data.IDENTIFY_CODE);
                win.show();
            }
        }
        else {
            Ext.MessageBox.alert('提示', '此类别不允许更改');
        }
    },
    //新增数据
    AddParameter: function (button)
    {
        var grid = Ext.ComponentQuery.query("Ali_GeneralParameterList")[0];
        //var panel = button.up('panel');
        var para_cat = grid.down("textfield[name=PARAMETER_CATEGORY]").getValue();
        var IF_LOCK = grid.down("textfield[name=IF_LOCK]").getValue();
        var win = Ext.widget("Ali_ParameterAddOrEdit");
        win.down("hiddenfield[name=categoryname]").setValue(para_cat);
        if (para_cat == '') {
            Ext.MessageBox.alert('提示', '请先选择分类');
            return;
        }
        else if (IF_LOCK!="0"){
            Ext.MessageBox.alert('提示', '此类别不允许更改');
            return;
        }
        else {
            win.show();
        }

    },
    //删除数据
    DeleteParameter: function (button)
    {
        var grid = button.up('gridpanel');
        var loadMarsk = new Ext.LoadMask(grid, {//元素、DOM节点或id, { 
            msg: '正在执行，请稍候...',
            removeMask: true// 完成后移除 
        });
        var IF_LOCK = grid.down("textfield[name=IF_LOCK]").getValue();
        if (IF_LOCK == "0") {
            var records = grid.getSelectionModel().getSelection();
            var PID = '';
            for (var i = 0; i < records.length; i++) {
                PID += "'" + records[i].data.ID + "',";
            }
            if (PID.length > 0) {
                Ext.MessageBox.confirm("删除", "确定删除该记录吗？",
                function (button) {
                    if (button == "yes")
                        loadMarsk.show();
                        Ext.Ajax.request({
                        url: "/GeneralParameter/DeleteParameter",
                        success: function (response, options) {
                            loadMarsk.hide();
                            var o = Ext.decode(response.responseText.toString());
                            if (o.success == true) {
                                Ext.Msg.alert("提示", o.singleInfo);
                                grid.store.loadPage(1);
                            } else if (o.success == false) {
                                Ext.Msg.alert("警告", o.error);
                            }
                        },
                        failure: function (response, options) {
                            loadMarsk.hide();
                            Ext.Msg.alert("警告", "数据处理异常！");
                        },
                        method: 'POST',
                        params: {
                            idlist: PID.substring(0, PID.length - 1)
                        }
                    });
                });
            } else {
                Ext.Msg.alert("提示", "请先选定有效行！");
            }
        }
        else {
            Ext.MessageBox.alert('提示', '此类别不允许更改');
        }
    },
    //保存数据
    SaveParameter: function (btn) {
        var me = this;
        var win = btn.up("window");
        var form = win.down("form");
        var record = form.getRecord();
        if (form.isValid()) {
            form.submit({
                waitMsg: "正在提交数据……",
                waitTitle: "提示",
                url: '/GeneralParameter/SaveParameter',
                params: record,
                method: 'post',
                success: function (form, action) {
                    var result = Ext.decode(action.response.responseText);
                    if (result.data.success) {
                        me.getStore("BasicData.GeneralParameter.GeneralParameterStore").load();
                        Ext.MessageBox.alert('提示', result.data.singleInfo);
                        win.close();
                    }
                    else {
                        Ext.MessageBox.alert('警告', result.data.error);
                    }
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('警告', "数据处理异常！");
                }
            });
        }
    }
});