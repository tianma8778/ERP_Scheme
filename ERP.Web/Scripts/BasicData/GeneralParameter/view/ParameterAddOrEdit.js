Ext.define("Scripts.view.BasicData.GeneralParameter.ParameterAddOrEdit", {
    extend: "Ext.window.Window",
    alias: 'widget.Ali_ParameterAddOrEdit',
    //width: 380,
    //height: 160,
    closeAction: 'destroy',
    border: 0,
    modal: true, //模态
    destroy: function () { //销毁tabpanel
        if (this.fireEvent("destroy", this) != false) {
            this.el.remove();
            if (Ext.isIE) {
                CollectGarbage();
            }
        }
    },
    listeners: {
        afterRender: function (thisForm, options) {
            var els = Ext.DomQuery.select('input[type!=hidden]'); //Ext.query("UserEdit input,textarea,combobox"); //Ext.query("#Ali_UserEdit input,textarea,combobox");
            Ext.create("Ext.util.KeyMap", this.el, {
                key: 13,
                fn: function (key, e) {
                    var el = e.target, target = els, ln = target.length;
                    for (var i = 0; i < ln; i++) {
                        if (target[i] == el) {
                            if (i + 1 == ln) {
                                target[0].focus();
                            } else {
                                target[i + 1].focus();
                            }
                        }
                    }
                },
                scope: this
            });
        }
    },
    items: {
        xtype: "form",
        url: "",
        //baseCls: "x-plain",
        bodyStyle: "padding:8px",
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 80,
            anchor: "100%"
        },
        items: [
            {
                xtype: "textfield", name: "key", fieldLabel: "数据键", allowBlank: false, maxLength: 20, blankText: '请输入数据键', maxLengthText: '数据键不能超过20个字符'
            },
	        {
	            xtype: "textfield", name: "value", fieldLabel: "数据值", allowBlank: false, maxLength: 30, blankText: '请输入数据值',maxLengthText: '数据值不能超过30个字符'
	        },
            {
            	xtype: "textfield", name: "identify", fieldLabel: "标识码", maxLength: 20, maxLengthText: '标识码不能超过20个字符'
            },
            { xtype: "hiddenfield", name: "id" },
	        { xtype: "hiddenfield", name: "categoryname" }
        ]
    },
    buttonAlign: 'center',
    buttons: [
	    {
	        text: "确定",
	        action: "gpok",
	        hidden: !window.Rights.R1020103
	    }
    ]
});