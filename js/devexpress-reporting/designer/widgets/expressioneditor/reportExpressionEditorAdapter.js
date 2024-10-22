﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorAdapter.js)
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
var ko = require("knockout");
var $ = require("jquery");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var _addVariablesToExpressionEditor_1 = require("../../internal/_addVariablesToExpressionEditor");
var ReportExpressionEditorAdapter = (function (_super) {
    __extends(ReportExpressionEditorAdapter, _super);
    function ReportExpressionEditorAdapter(values, value) {
        var _this = _super.call(this) || this;
        _this.values = values;
        _this.value = value;
        _this.popupVisible = ko.observable(false);
        return _this;
    }
    ReportExpressionEditorAdapter.prototype._onHidingPopup = function (e) {
        if (this._relatedControlClassName)
            e.component.content().classList.remove(this._relatedControlClassName);
    };
    ReportExpressionEditorAdapter.prototype._onShowingPopup = function (editableObject) {
        var _this = this;
        return function (e) {
            if (editableObject && editableObject.expressionObj) {
                var type = editableObject.controlType || 'unknown';
                _this._relatedControlClassName = 'dx-expression-popup-related-' + type.toLowerCase().split('.').join('_');
                $(e.component.content())[0].classList.add(_this._relatedControlClassName);
            }
        };
    };
    ReportExpressionEditorAdapter.prototype.patchOptions = function (reportExplorerProvider, editableObject) {
        var _this = this;
        if (!this.value()) {
            return false;
        }
        else {
            if (!this.value()['customizeCategories']) {
                this.value()['customizeCategories'] = function (sender, groups, onClick) {
                    groups.splice(0, 0, _this._createReportItems(reportExplorerProvider, onClick));
                    if (_this.values() && _this.values().length > 0) {
                        groups.splice(2, 0, _this._createValuesTab());
                    }
                    _addVariablesToExpressionEditor_1.addVariablesToExpressionEditor(groups, _this.value().eventName === 'PrintOnPage' ? function (items) {
                        items.push({ text: 'Arguments.PageIndex', val: '[Arguments.PageIndex]', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Arguments_PageIndex' });
                        items.push({ text: 'Arguments.PageCount', val: '[Arguments.PageCount]', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Arguments_PageCount' });
                        return items;
                    } : undefined);
                };
                this.value().onHiding = this._onHidingPopup;
                this.value().onShowing = this._onShowingPopup(editableObject);
            }
            return true;
        }
    };
    ReportExpressionEditorAdapter.prototype._createReportItems = function (reportExplorerProvider, onClick) {
        var item = {
            displayName: analytics_utils_1.getLocalization('Report Items', 'ReportStringId.ExpressionEditor_ItemInfo_ReportItems'),
            content: {
                showDescription: false,
                isSelected: ko.observable(false),
                data: {
                    fields: {
                        itemsProvider: reportExplorerProvider,
                        expandRootItems: true,
                        selectedPath: ko.observable(''),
                        templateName: 'dx-ee-treelist-item',
                        treeListController: new analytics_widgets_internal_1.ExpressionEditorTreeListController('', function (item, element) { onClick('[' + ['ReportItems', item.text].join('.') + ']'); })
                    }
                },
                name: 'dx-expressioneditor-fields'
            }
        };
        return item;
    };
    ReportExpressionEditorAdapter.prototype._createValuesTab = function () {
        var items = this.values().map(function (item) {
            var display = item.value || item;
            return {
                text: "'" + display + "'",
                displayName: display
            };
        });
        return analytics_widgets_internal_1.createExpressionEditorCollectionToolOptions(items, 'Values', 'ReportStringId.ExpressionEditor_ItemInfo_Values', false);
    };
    return ReportExpressionEditorAdapter;
}(analytics_utils_1.Disposable));
exports.ReportExpressionEditorAdapter = ReportExpressionEditorAdapter;
