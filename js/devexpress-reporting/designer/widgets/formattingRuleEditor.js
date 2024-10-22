﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formattingRuleEditor.js)
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
var formattingrules_1 = require("../controls/properties/formattingrules");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var FormattingRuleEditor = (function (_super) {
    __extends(FormattingRuleEditor, _super);
    function FormattingRuleEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        var rules = ko.pureComputed(function () {
            var formattingRuleSheet = _this._model() && _this._model()['root'] && _this._model()['root'].formattingRuleSheet || ko.observableArray();
            formattingRuleSheet().forEach(function (rule) {
                _this._disposables.push(rule.selected = ko.pureComputed({
                    read: function () {
                        return _this.value()().filter(function (link) { return link.value() === rule; }).length > 0;
                    },
                    write: function (val) {
                        if (val) {
                            _this.value().push(formattingrules_1.FormattingRuleLink.createNew(rule));
                        }
                        else {
                            var link = _this.value()().filter(function (itemLink) { return itemLink.value() === rule; })[0];
                            _this.value().remove(link);
                        }
                    }
                }));
            });
            return formattingRuleSheet;
        });
        _this._disposables.push(rules);
        _this.options = {
            addHandler: function () { return formattingrules_1.FormattingRule.createNew(_this._model()['root']); },
            values: rules,
            displayName: _this.displayName(),
            level: _this.level,
            info: _this.info
        };
        return _this;
    }
    return FormattingRuleEditor;
}(analytics_widgets_1.Editor));
exports.FormattingRuleEditor = FormattingRuleEditor;
