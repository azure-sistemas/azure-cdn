﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorWrapper.js)
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var reportExpressionEditorAdapter_1 = require("./reportExpressionEditorAdapter");
var ReportExpressionEditorWrapper = (function (_super) {
    __extends(ReportExpressionEditorWrapper, _super);
    function ReportExpressionEditorWrapper(control, value) {
        var _this = _super.call(this) || this;
        _this.control = control;
        _this.value = value;
        _this._allProperties = [];
        _this.title = function () { return analytics_utils_1.getLocalization('Expression Editor', 'AnalyticsCoreStringId.ExpressionEditor_ExpressionCaption'); };
        _this.getPopupContainer = analytics_internal_1.getParentContainer;
        _this.adapter = ko.observable();
        _this.editor = ko.observable();
        _this.properties = ko.observable([]);
        _this.popupVisible = ko.observable(false);
        _this.buttonItems = [];
        _this._createMainPopupButtons();
        return _this;
    }
    ReportExpressionEditorWrapper.prototype._createMainPopupButtons = function () {
        var self = this;
        this.buttonItems = [
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: analytics_utils_1.getLocalization('Save', analytics_internal_1.StringId.DataAccessBtnOK), onClick: function (sender) { self.apply(sender) && self.popupVisible(false); } } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: analytics_utils_1.getLocalization('Cancel', analytics_internal_1.StringId.DataAccessBtnCancel), onClick: function () { self.popupVisible(false); } } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: analytics_utils_1.getLocalization('Apply', 'StringId.Apply'), onClick: function (sender) { self.apply(sender); } } }
        ];
    };
    ReportExpressionEditorWrapper.prototype.apply = function (sender) {
        var value = this.editor().getValue();
        if (this.editor().validate(value, sender)) {
            this.editor().save(null);
            this._allProperties.forEach(function (x) { return x.value && x.content.value && x.value() !== undefined && x.content.value(x.value()); });
            return true;
        }
    };
    ReportExpressionEditorWrapper.prototype.onShowing = function (e) {
        var expressionObj = this.control().expressionObj;
        this._allProperties = [];
        this.properties([]);
        this.createExpressionEditorProperties(expressionObj, this.properties(), this.value);
        this.properties.valueHasMutated();
        this.value() && this.updateExpression(this.value());
        this._undoEngine = analytics_utils_1.UndoEngine.tryGetUndoEngine(this.control());
        this._undoEngine && this._undoEngine.start();
        this.editor().onShowing(e);
        this.editor().initDisplayValue();
    };
    ReportExpressionEditorWrapper.prototype.onHiding = function (e) {
        this._allProperties.forEach(function (x) { return x.content && x.value(x.content.value()); });
        this.editor() && this.editor().onHiding(e);
        this._undoEngine && this._undoEngine.end();
        this.adapter() && this.adapter().dispose();
    };
    ReportExpressionEditorWrapper.prototype.createExpressionEditorProperties = function (expressionObj, properties, selected) {
        var _this = this;
        expressionObj.getInfo().forEach(function (info) {
            var items = [];
            var expand = false;
            if (info.info)
                expand = _this.createExpressionEditorProperties(expressionObj[info.propertyName], items, selected);
            if (info.propertyName === 'Appearance' || info.propertyName === 'Layout') {
                properties.push.apply(properties, items);
            }
            else {
                var content = !items.length && expressionObj[info.propertyName];
                var property = {
                    displayName: analytics_utils_1.getLocalization(info.displayName, info.localizationId),
                    propertyName: info.propertyName,
                    items: items,
                    templateName: !!items.length ? 'dxrd-expressioneditor-property-accordion' : '',
                    collapsed: ko.observable(!expand),
                    content: content,
                    value: ko.observable(content && content.value()),
                    isSelected: ko.observable(content == selected()),
                    click: function () { return _this.switchExpression(property); },
                    isBinded: function () { return !!property.value() || property.items.some(function (x) { return x.isBinded(); }); }
                };
                if (!selected()) {
                    property.isSelected(true);
                    selected(property.content);
                }
                if (property.isSelected())
                    _this.currentProperty = property;
                properties.push(property);
                _this._allProperties.push(property);
            }
        });
        properties.sort(function (a, b) { return a.displayName < b.displayName ? -1 : 1; });
        return properties.some(function (x) { return x.isSelected() || !x.collapsed(); });
    };
    ReportExpressionEditorWrapper.prototype.switchExpression = function (property) {
        if (property === this.currentProperty)
            return;
        var value = this.editor().getValue();
        if (this.editor().validate(value)) {
            this.editor().save(null);
            this.currentProperty.isSelected(false);
            this.currentProperty = property;
            this.updateExpression(property.content);
            property.isSelected(true);
            this.editor().initDisplayValue();
        }
    };
    ReportExpressionEditorWrapper.prototype.updateExpression = function (expression) {
        this.adapter() && this.adapter().dispose();
        this.adapter(new reportExpressionEditorAdapter_1.ReportExpressionEditorAdapter(ko.observable(expression['serializationInfo'] && expression['serializationInfo']['valuesArray'] || []), ko.observable(__assign({}, expression, {
            value: this.currentProperty.value
        }))));
    };
    return ReportExpressionEditorWrapper;
}(analytics_utils_1.Disposable));
exports.ReportExpressionEditorWrapper = ReportExpressionEditorWrapper;
