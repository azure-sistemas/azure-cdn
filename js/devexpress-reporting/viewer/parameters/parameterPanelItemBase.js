﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterPanelItemBase.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var editorTemplates_1 = require("../widgets/editorTemplates");
var previewParameter_1 = require("./previewParameter");
var previewParameterHelper_1 = require("./previewParameterHelper");
var ParameterPanelItemBase = (function (_super) {
    __extends(ParameterPanelItemBase, _super);
    function ParameterPanelItemBase(parameterHelper, layoutInfo) {
        var _this = _super.call(this) || this;
        _this.parameterHelper = parameterHelper;
        _this.layoutInfo = layoutInfo;
        _this._parameters = [];
        _this._layoutItems = [];
        _this.isEmpty = ko.observable(true);
        _this.getInfo = ko.observable([]);
        _this.parameterHelper = parameterHelper || new previewParameterHelper_1.PreviewParameterHelper();
        return _this;
    }
    ParameterPanelItemBase.prototype._fixGroupPropertyName = function (name) {
        return analytics_internal_1.getUniqueName(Object.keys(this), name.toLocaleLowerCase().replace(/\s/g, '_'));
    };
    ParameterPanelItemBase.prototype._proceedLayoutInfo = function (layoutInfo, previewParameters) {
        var _this = this;
        this.getInfo([]);
        this._layoutItems = [];
        layoutInfo.layoutItems.forEach(function (itemInfo) {
            if (itemInfo.type === 'Group') {
                var groupItemInfo = itemInfo;
                var name = _this._fixGroupPropertyName(groupItemInfo.title);
                var info = {
                    propertyName: name,
                    displayName: groupItemInfo.title,
                    editor: editorTemplates_1.viewerEditorTemplates.groupEditor,
                    editorOptions: {
                        expanded: groupItemInfo.expanded,
                        titleVisible: groupItemInfo.titleVisible,
                        showExpandButton: groupItemInfo.showExpandButton,
                        borderVisible: itemInfo.borderVisible,
                        orientation: groupItemInfo.orientation
                    }
                };
                var item = new ParameterPanelItemBase(_this.parameterHelper, groupItemInfo);
                _this[name] = item;
                _this._layoutItems.push(item);
                _this.getInfo(_this.getInfo().concat(info));
            }
            else if (itemInfo.type === 'Parameter') {
                var parameterLayoutInfo = itemInfo;
                var previewParameter = previewParameters.filter(function (x) { return x.path === parameterLayoutInfo.path; })[0];
                previewParameter && _this._add(previewParameter, parameterLayoutInfo);
            }
        });
    };
    ParameterPanelItemBase.prototype._add = function (parameter, parameterInfo) {
        if (this._parameters.indexOf(parameter) === -1) {
            this._parameters.push(parameter);
        }
        if (!parameter.visible() && !parameter.hasVisibleExpression) {
            return parameter;
        }
        parameter.hasVerticalLabel(parameterInfo.labelOrientation === 'Vertical');
        parameter.hasSeparator(!!parameterInfo.hasSeparator);
        this[previewParameterHelper_1.PreviewParameterHelper.getPrivatePropertyName(parameter.path)] = parameter.value;
        var parameterPropertyName = previewParameterHelper_1.PreviewParameterHelper.fixPropertyName(parameter.path);
        if (parameter.isMultiValue || !parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) {
            this[parameterPropertyName] = parameter.value;
        }
        else {
            this[parameterPropertyName] = ko.pureComputed({
                read: function () {
                    var parseValue = parameter.value();
                    if (parseValue === null || parseValue === undefined) {
                        return parseValue;
                    }
                    if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                        parseValue = parseInt(parseValue);
                    }
                    else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                        parseValue = parseFloat(parseValue);
                    }
                    return parseValue;
                },
                write: function (newVal) {
                    var expandValue = newVal;
                    if (parameter.allowNull && (expandValue === '' || expandValue === undefined)) {
                        expandValue = null;
                    }
                    else if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                        expandValue = analytics_internal_1.integerValueConverter(expandValue, '0');
                    }
                    else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                        expandValue = analytics_internal_1.floatValueConverter(expandValue, '0');
                    }
                    parameter.value(expandValue);
                }
            });
        }
        this.getInfo(this.getInfo().concat(parameter.valueInfo()));
        return parameter;
    };
    ParameterPanelItemBase.prototype.isPropertyDisabled = function (name) {
        var parameter = this._parameters.filter(function (parameter) { return previewParameterHelper_1.PreviewParameterHelper.getPrivatePropertyName(parameter.path) === name; })[0];
        return parameter && !parameter.enabled();
    };
    ParameterPanelItemBase.prototype.isPropertyVisible = function (name) {
        var parameter = this._parameters.filter(function (parameter) { return previewParameterHelper_1.PreviewParameterHelper.getPrivatePropertyName(parameter.path) === name; })[0];
        return !parameter || parameter.visible();
    };
    ParameterPanelItemBase.prototype.initialize = function (originalParametersInfo, parameters) {
        var _this = this;
        this._parameters.forEach(function (usedParameter) {
            delete _this[previewParameterHelper_1.PreviewParameterHelper.fixPropertyName(usedParameter.path)];
            delete _this[previewParameterHelper_1.PreviewParameterHelper.getPrivatePropertyName(usedParameter.path)];
        });
        this._parameters = [];
        if (!originalParametersInfo) {
            this.isEmpty(true);
            this.getInfo([]);
            return;
        }
        parameters = parameters || (originalParametersInfo.parameters || []).map(function (parameter) {
            var previewParameter = new previewParameter_1.PreviewParameter(parameter, _this.parameterHelper);
            _this._parameters.push(previewParameter);
            return previewParameter;
        });
        var layoutInfo = originalParametersInfo.parameterPanelLayout || this.layoutInfo;
        layoutInfo && this._proceedLayoutInfo(layoutInfo, parameters);
        this._layoutItems.forEach(function (item) { return item.initialize({}, parameters); });
    };
    return ParameterPanelItemBase;
}(analytics_utils_1.Disposable));
exports.ParameterPanelItemBase = ParameterPanelItemBase;
