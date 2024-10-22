﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\formattingrules.js)
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
var customFunctions_1 = require("../../widgets/customFunctions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var FormattingRule = (function (_super) {
    __extends(FormattingRule, _super);
    function FormattingRule(model, parent, serializer) {
        var _this = _super.call(this) || this;
        _this.className = function () {
            return 'formattingrule';
        };
        _this.controlType = 'XRFormattingRule';
        _this.selected = ko.observable(false);
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        _this.parent = parent || null;
        var path = ko.pureComputed(function () {
            var dsPath = _this.getPath('');
            if (!!dsPath) {
                return analytics_internal_1.getFullPath(dsPath, _this.dataMember() || parent.dataMember());
            }
            else {
                return dsPath;
            }
        });
        _this._disposables.push(path);
        _this['conditionObj'] = {
            value: _this.condition,
            path: path,
            functions: customFunctions_1.reportFunctionDisplay,
            customizeCategories: function (_, categories, __) { _addVariablesToExpressionEditor_1.addVariablesToExpressionEditor(categories); }
        };
        return _this;
    }
    FormattingRule.createNew = function (report) {
        return new FormattingRule({}, report);
    };
    FormattingRule.prototype.getInfo = function () {
        return formattingrules_1.formattingRuleSerializationsInfo;
    };
    FormattingRule.prototype.getPath = function (propertyName) {
        return this.parent && this.parent.dsHelperProvider() && this.parent.dsHelperProvider().getDataSourcePath(this['dataSource']() || this.parent.dataSource());
    };
    FormattingRule.prototype.displayType = function () {
        return analytics_utils_1.getLocalization('Formatting Rule', 'DevExpress.XtraReports.UI.FormattingRule');
    };
    return FormattingRule;
}(analytics_utils_1.Disposable));
exports.FormattingRule = FormattingRule;
var FormattingRuleLink = (function () {
    function FormattingRuleLink(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    FormattingRuleLink.createNew = function (rule) {
        var link = new FormattingRuleLink({});
        link.value = ko.observable(rule);
        return link;
    };
    FormattingRuleLink.prototype.getInfo = function () {
        return formattingrules_1.formattingRuleLinkSerializationsInfo;
    };
    return FormattingRuleLink;
}());
exports.FormattingRuleLink = FormattingRuleLink;
var formattingrules_1 = require("../metadata/properties/formattingrules");
var _addVariablesToExpressionEditor_1 = require("../../internal/_addVariablesToExpressionEditor");
