﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_settings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var select_box_1 = require("devextreme/ui/select_box");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.reportStorageWebIsRegister = analytics_internal_1.createGlobalModuleVariableFunc(false);
exports.limitation = analytics_internal_1.createGlobalModuleVariableFunc(false);
var orig_optionValuesEqual = select_box_1.default.prototype['_optionValuesEqual'];
select_box_1.default['redefine']({
    _optionValuesEqual: function (optionName, oldValue, newValue) {
        if (optionName === 'value' && (oldValue instanceof analytics_elements_1.ElementViewModel) && (newValue instanceof analytics_elements_1.ElementViewModel)) {
            return oldValue === newValue;
        }
        return orig_optionValuesEqual.apply(this, arguments);
    }
});
