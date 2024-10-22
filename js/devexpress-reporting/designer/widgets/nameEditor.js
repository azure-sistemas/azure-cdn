﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\nameEditor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var NameEditor = (function (_super) {
    __extends(NameEditor, _super);
    function NameEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    NameEditor.prototype._getEditorValidationRules = function () {
        return (this.currentValidationRules || []).concat(_super.prototype._getEditorValidationRules.call(this));
    };
    NameEditor.prototype.generateRules = function (allControls) {
        var self = this;
        if (self.disabled())
            return [];
        if (!this.currentValidationRules) {
            this.currentValidationRules = [{
                    type: 'custom',
                    validationCallback: function (options) {
                        if (options.value == null)
                            return false;
                        return allControls().filter(function (x) {
                            if (ko.unwrap(x.name).toLowerCase() !== options.value.toLowerCase())
                                return false;
                            var model = self._model();
                            if (!model || x === model)
                                return false;
                            var same = model['isSame'];
                            if (same && $.isFunction(same) && same(x))
                                return false;
                            return true;
                        }).length === 0;
                    },
                    get message() { return analytics_utils_1.getLocalization('Name is not unique', 'ASPxReportsStringId.ReportDesigner_NameUniqueError'); }
                }];
        }
        return this._getEditorValidationRules();
    };
    return NameEditor;
}(analytics_widgets_1.Editor));
exports.NameEditor = NameEditor;
