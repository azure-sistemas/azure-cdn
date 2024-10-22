﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellActions.js)
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
var tableRowActions_1 = require("./tableRowActions");
var xrTableCell_1 = require("../controls/xrTableCell");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var TableCellActions = (function (_super) {
    __extends(TableCellActions, _super);
    function TableCellActions(selection, onComponentAdded, isDisabled) {
        if (isDisabled === void 0) { isDisabled = function () { return false; }; }
        var _this = _super.call(this, selection) || this;
        _super.prototype.initActions.call(_this, [
            {
                text: 'Insert Row Above',
                group: function () { return analytics_internal_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Insert Row Above', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowAbove'); },
                imageClassName: 'dxrd-image-actions-insert_row_above',
                imageTemplateName: 'dxrd-svg-actions-insert_row_above',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertRowAbove(); },
            }, {
                text: 'Insert Row Below',
                group: function () { return analytics_internal_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Insert Row Below', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowBelow'); },
                imageClassName: 'dxrd-image-actions-insert_row_below',
                imageTemplateName: 'dxrd-svg-actions-insert_row_below',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertRowBelow(); },
            }, {
                text: 'Delete Row',
                group: function () { return analytics_internal_1.getLocalization('Table Rows', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Delete Row', 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteRow'); },
                imageClassName: 'dxrd-image-actions-delete_row',
                imageTemplateName: 'dxrd-svg-actions-delete_row',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.deleteRow(); },
            }, {
                text: 'Insert Cell',
                group: function () { return analytics_internal_1.getLocalization('Table Cells', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Insert Cell', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertCell'); },
                imageClassName: 'dxrd-image-actions-insert_cell',
                imageTemplateName: 'dxrd-svg-actions-insert_cell',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertCell(); },
            }, {
                text: 'Delete Cell',
                group: function () { return analytics_internal_1.getLocalization('Table Cells', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Delete Cell', 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteCell'); },
                imageClassName: 'dxrd-image-actions-delete_cell',
                imageTemplateName: 'dxrd-svg-actions-delete_cell',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.deleteCell(); },
            }, {
                text: 'Insert Column To Left',
                group: function () { return analytics_internal_1.getLocalization('Table Cells', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Insert Column To Left', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertColumnToLeft'); },
                imageClassName: 'dxrd-image-actions-insert_column_to_left',
                imageTemplateName: 'dxrd-svg-actions-insert_column_to_left',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertColumn(false); },
            }, {
                text: 'Insert Column To Right',
                group: function () { return analytics_internal_1.getLocalization('Table Cells', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Insert Column To Right', 'ASPxReportsStringId.ReportDesigner_TableActions_InsertColumnToRight'); },
                imageClassName: 'dxrd-image-actions-insert_column_to_right',
                imageTemplateName: 'dxrd-svg-actions-insert_column_to_right',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.insertColumn(true); },
            }, {
                text: 'Delete Column',
                group: function () { return analytics_internal_1.getLocalization('Table Cells', 'TODO'); },
                displayText: function () { return analytics_internal_1.getLocalization('Delete Column', 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteColumn'); },
                imageClassName: 'dxrd-image-actions-delete_column',
                imageTemplateName: 'dxrd-svg-actions-delete_column',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function () { _this.deleteColumn(); },
            }
        ]);
        _this.onComponentAdded = function (e) { onComponentAdded && onComponentAdded(e); };
        return _this;
    }
    Object.defineProperty(TableCellActions.prototype, "_cell", {
        get: function () {
            return this.selection.focused().getControlModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellActions.prototype, "_row", {
        get: function () {
            return this._cell.parentModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellActions.prototype, "_table", {
        get: function () {
            return this._row.parentModel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellActions.prototype, "_cellSurface", {
        get: function () {
            var cell = this.selection.focused();
            return cell instanceof xrTableCell_1.XRTableCellSurface && cell || null;
        },
        enumerable: true,
        configurable: true
    });
    TableCellActions.prototype.insertCell = function () {
        this._row.insertCellCopy(this._cell, false, this.onComponentAdded);
    };
    TableCellActions.prototype.deleteCell = function () {
        analytics_internal_1.deleteSelection(this.selection);
    };
    TableCellActions.prototype.deleteRow = function () {
        this.selection.initialize(this._cellSurface.parent);
        analytics_internal_1.deleteSelection(this.selection);
    };
    TableCellActions.prototype.insertColumn = function (isRight) {
        this._table.insertColumn(this._cell, isRight, this.onComponentAdded);
    };
    TableCellActions.prototype.deleteColumn = function () {
        this._cellSurface.selectColumn(this.selection);
        analytics_internal_1.deleteSelection(this.selection);
    };
    TableCellActions.prototype.condition = function (context) {
        return context instanceof xrTableCell_1.XRTableCellViewModel && !!this._cellSurface;
    };
    return TableCellActions;
}(tableRowActions_1.TableRowActions));
exports.TableCellActions = TableCellActions;
