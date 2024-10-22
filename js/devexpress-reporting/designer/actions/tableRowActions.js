﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableRowActions.js)
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
var xrTableRow_1 = require("../controls/xrTableRow");
var metadata_1 = require("../../common/metadata");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var TableRowActions = (function (_super) {
    __extends(TableRowActions, _super);
    function TableRowActions(selection, onComponentAdded, isDisabled) {
        if (isDisabled === void 0) { isDisabled = function () { return false; }; }
        var _this = _super.call(this) || this;
        _this.selection = selection;
        _super.prototype.initActions.call(_this, [
            {
                text: 'Insert Row Above',
                group: function () { return analytics_utils_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Row Above', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowAbove'); },
                imageClassName: 'dxrd-image-actions-insert_row_above',
                imageTemplateName: 'dxrd-svg-actions-insert_row_above',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertRowAbove(); },
            }, {
                text: 'Insert Row Below',
                group: function () { return analytics_utils_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Row Below', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowBelow'); },
                imageClassName: 'dxrd-image-actions-insert_row_below',
                imageTemplateName: 'dxrd-svg-actions-insert_row_below',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertRowBelow(); },
            }, {
                text: 'Delete Row',
                group: function () { return analytics_utils_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_utils_1.getLocalization('Delete Row', 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteRow'); },
                imageClassName: 'dxrd-image-actions-delete_row',
                imageTemplateName: 'dxrd-svg-actions-delete_row',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.deleteRow(); },
            }
        ]);
        _this.onComponentAdded = function (e) { onComponentAdded && onComponentAdded(e); };
        return _this;
    }
    Object.defineProperty(TableRowActions.prototype, "_row", {
        get: function () {
            return this.selection.focused().getControlModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableRowActions.prototype, "_table", {
        get: function () {
            return this._row.parentModel();
        },
        enumerable: true,
        configurable: true
    });
    TableRowActions.prototype.isDisabled = function () {
        var item = this.selection.focused();
        if (item) {
            var report = item.getControlModel().root;
            return report && report.language() !== metadata_1.defaultCulture;
        }
        return true;
    };
    TableRowActions.prototype.insertRowAbove = function () {
        this._table.insertRow(this._row, true, this.onComponentAdded);
    };
    TableRowActions.prototype.insertRowBelow = function () {
        this._table.insertRow(this._row, false, this.onComponentAdded);
    };
    TableRowActions.prototype.deleteRow = function () {
        analytics_internal_1.deleteSelection(this.selection);
    };
    TableRowActions.prototype.condition = function (context) {
        return context instanceof xrTableRow_1.XRTableRowViewModel;
    };
    return TableRowActions;
}(analytics_internal_1.BaseActionsProvider));
exports.TableRowActions = TableRowActions;
