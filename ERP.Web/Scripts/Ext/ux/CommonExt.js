//
//   公共扩展库   主要扩展EXTJS里面的类
//

Ext.apply(Ext.form.VTypes, {
    daterange: function (val, field) {
        var date = field.parseDate(val);
        //console.log(field);
        // We need to force the picker to update values to recaluate the disabled dates display    
        var dispUpd = function (picker) {
            var ad = picker.activeDate;
            picker.activeDate = null;
            picker.update(ad);
        };

        if (field.startDateField) {
            var sd = Ext.getCmp(field.startDateField);
            if (field.startDateField == "REQUEST_DEPARTURE_TIME") {
                var grid = field.up("form");
                sd = grid.down("datefield[name=" + field.startDateField + "]");
            }
            sd.maxValue = date;
            if (sd.menu && sd.menu.picker) {
                sd.menu.picker.maxDate = date;
                dispUpd(sd.menu.picker);
            }
        }
        else if (field.endDateField) {
            var ed = Ext.getCmp(field.endDateField);
            if (field.endDateField == "REQUEST_ARRIVAL_TIME") {
                var grid = field.up("form");
                ed = grid.down("datefield[name=" + field.endDateField + "]");
            }
            ed.minValue = date;
            if (ed.menu && ed.menu.picker) {
                ed.menu.picker.minDate = date;
                dispUpd(ed.menu.picker);
            }
        }
        return true;
    },

    number: function (val, field) {
        try {
            var regex = /^[0-9]*$/;
            if (regex.test(val))
                return true;
            return false;

        }
        catch (e) {
            return false;
        }
    },
    numberText: '只能输入0-9之间的数字.'

});