//Ext.onReady(function () {
    //设置自动刷新轮询数据库，弹出消息框
    var task = {
        run: function () {
            this.filter = {};
            this.store.baseParams = {};
            this.store.reload({
                params: {
                    start: 0,
                    limit: App.config.defaultPageSize
                }
            });
        },
        scope: this,
        interval: 60000 //1000 = 1 second,
    }
    Ext.TaskMgr.start(task);

    this.store = new Ext.data.DirectStore({
        directFn: dataBuluAction.queryMsgInfoWin,
        paramsAsHash: true,
        autoDestroy: true,
        remoteSort: false,
        fields: [],
        listeners: {
            scope: this,
            load: function (store, records, options) {
                if (!records || records.length == 0) {
                    return;
                }
                var msg = '';
                for (var j = 0; j < records.length; j++) {
                    var data = records[j].data;
                    var result = '';
                    if (data.msgType == "0") {
                        result = '' + "项目授权" + '';
                    } else if (data.msgType == "1") {
                        result = '' + '复核反馈' + '';
                    } else {
                        result = '' + "其他消息" + '';
                    }
                    msg = msg + result + "：" + data.xtxmbh + "(" + data.xtxmmc + ")";
                }
                if (msg != '') {
                    win = new Ext.Window({
                        width: 226,
                        height: 160,
                        layout: 'fit',
                        modal: false,
                        plain: true,
                        shadow: false, //去除阴影  
                        draggable: false, //默认不可拖拽  
                        resizable: false,
                        closable: true,
                        closeAction: 'hide', //默认关闭为隐藏  
                        autoHide: 15, //15秒后自动隐藏，false则不自动隐藏 
                        title: '消息提醒',
                        html: '' + msg + '',
                        constructor: function (conf) {
                            Ext.Window.superclass.constructor.call(this, conf);
                            this.initPosition(true);
                        },
                        initEvents: function () {
                            Ext.Window.superclass.initEvents.call(this);
                            //自动隐藏  
                            if (false !== this.autoHide) {
                                var task = new Ext.util.DelayedTask(this.hide, this), second = (parseInt(this.autoHide) || 3) * 1000;
                                this.on('beforeshow', function (self) {
                                    task.delay(second);
                                });
                            }
                            this.on('beforeshow', this.showTips);
                            this.on('beforehide', this.hideTips);
                            //window大小改变时，重新设置坐标  
                            Ext.EventManager.onWindowResize(this.initPosition, this);
                            //window移动滚动条时，重新设置坐标  
                            Ext.EventManager.on(window, 'scroll', this.initPosition, this);
                        },
                        //参数flag为true时强制更新位置  
                        initPosition: function (flag) {
                            //不可见时，不调整坐标
                            if (true !== flag && this.hidden) {
                                return false;
                            }
                            var doc = document, bd = (doc.body || doc.documentElement);
                            //Ext取可视范围宽高(与上面方法取的值相同), 加上滚动坐标  
                            var left = bd.scrollLeft + Ext.lib.Dom.getViewWidth() - 4 - this.width;
                            var top = bd.scrollTop + Ext.lib.Dom.getViewHeight() - 4 - this.height;
                            this.setPosition(left, top);
                        },
                        showTips: function () {
                            var self = this;
                            if (!self.hidden) { return false; }
                            //初始化坐标
                            self.initPosition(true);
                            self.el.slideIn('b', {
                                callback: function () {
                                    //显示完成后,手动触发show事件,并将hidden属性设置false,否则将不能触发hide事件   
                                    self.fireEvent('show', self);
                                    self.hidden = false;
                                }
                            });
                            //不执行默认的show
                            return false;
                        },
                        hideTips: function () {
                            var self = this;
                            if (self.hidden) { return false; }
                            self.el.slideOut('b', {
                                callback: function () {
                                    //渐隐动作执行完成时,手动触发hide事件,并将hidden属性设置true  
                                    self.fireEvent('hide', self);
                                    self.hidden = true;
                                }
                            });
                            //不执行默认的hide
                            return false;
                        }
                    }).show();
                }
            }
        }
    });
    this.store.load();
//});