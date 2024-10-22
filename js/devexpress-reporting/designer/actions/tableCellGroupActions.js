﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellGroupActions.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var TableCellGroupActions = (function (_super) {
    __extends(TableCellGroupActions, _super);
    function TableCellGroupActions(selectionProvider) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = selectionProvider;
        _this._distributeColumnsAction = {
            group: function () { return analytics_utils_1.getLocalization('Table Cells', 'TODO'); },
            text: 'Distribute Columns Evenly',
            displayText: function () { return analytics_utils_1.getLocalization('Distribute Columns Evenly', 'ReportStringId.Cmd_TableDistributeColumnsEvenly'); },
            imageClassName: 'dxrd-image-actions-distribute_columns_evenly',
            imageTemplateName: 'dxrd-svg-actions-distribute_columns_evenly',
            clickAction: function () { _this._distributeColumns(); }
        };
        _this._distributeRowsAction = {
            group: function () { return analytics_utils_1.getLocalization('Table Cells', 'TODO'); },
            text: 'Distribute Rows Evenly',
            displayText: function () { return analytics_utils_1.getLocalization('Distribute Rows Evenly', 'ReportStringId.Cmd_TableDistributeRowsEvenly'); },
            imageClassName: 'dxrd-image-actions-distribute_rows_evenly',
            imageTemplateName: 'dxrd-svg-actions-distribute_rows_evenly',
            clickAction: function () { _this._distributeRows(); }
        };
        _super.prototype.initActions.call(_this, [
            _this._distributeColumnsAction,
            _this._distributeRowsAction
        ]);
        _this.setDisabled = function (context) {
            var status = { rows: false, cols: false }, cells = _this._selectedCells();
            if (cells.length) {
                var row0 = cells[0].parentModel(), colIndex0 = row0.cells().indexOf(cells[0]);
                for (var i = 1; i < cells.length; i++) {
                    var rowi = cells[i].parentModel();
                    if (!status.rows && rowi.name() !== row0.name())
                        status.rows = true;
                    if (!status.cols && rowi.cells().indexOf(cells[i]) != colIndex0)
                        status.cols = true;
                    if (status.rows && status.cols)
                        break;
                }
            }
            _this._distributeColumnsAction.disabled(!status.cols);
            _this._distributeRowsAction.disabled(!status.rows);
        };
        return _this;
    }
    TableCellGroupActions.prototype._distributeColumns = function () {
        var cellsByRows = this._selectedCells()
            .reduce(function (acc, x) {
            var row = x.parentModel().name();
            if (acc[row])
                acc[row].push(x);
            else
                acc[row] = [x];
            return acc;
        }, {});
        Object.keys(cellsByRows).forEach(function (row) {
            var cells = cellsByRows[row];
            if (cells.length >= 2) {
                var weight = cells.reduce(function (acc, x) { return acc + x.weight(); }, 0) / cells.length;
                cells
                    .sort(function (x, y) { return x.left() - y.left(); })
                    .forEach(function (x) { x.weight(weight); });
            }
        });
    };
    TableCellGroupActions.prototype._distributeRows = function () {
        var _this = this;
        var rowModels = this._selectedCells()
            .map(function (x) { return x.parentModel(); })
            .reduce(function (acc, x) { return acc.indexOf(x) >= 0 ? acc : acc.concat(x); }, []), weight = rowModels.reduce(function (acc, x) { return acc + x.weight(); }, 0) / rowModels.length;
        rowModels.forEach(function (x) { x.weight(weight); });
        var minHeight = Math.max.apply(Math, [].concat.apply([], rowModels.map(function (x) { return x.cells(); })).map(function (x) {
            var height = _this._calculateMinimalHeight(x), rowSpan = x['rowSpan']();
            if (rowSpan > 1) {
                var row = x.parentModel(), table = row.parentModel(), rowIdx = table.rows.indexOf(row), divisor = 1;
                for (var i = 1; i < rowSpan; i++) {
                    var nextRow = table.rows()[rowIdx + i];
                    if (!nextRow)
                        break;
                    if (rowModels.indexOf(nextRow) >= 0)
                        divisor++;
                    else
                        height -= nextRow.size.height();
                }
                height /= divisor;
            }
            return height;
        })), height = rowModels[0].height();
        if (height < minHeight) {
            var table = rowModels[0].parentModel();
            table.size.height(table.size.height() + (minHeight - height) * rowModels.length);
            weight *= minHeight / height;
            rowModels.forEach(function (x) { x.weight(weight); });
        }
    };
    TableCellGroupActions.prototype._calculateMinimalHeight = function (cell) {
        return Math.max.apply(Math, [this._calculateTextHeight(cell) + this._calculateBordersHeight(cell) + this._calculatePaddingsHeight(cell)].concat(cell.controls().map(function (control) { return control.location.y() + control.size.height(); })));
    };
    TableCellGroupActions.prototype._calculateTextHeight = function (cell) {
        if (!(cell.text && cell.text()))
            return 0;
        var wordWrap = ko.unwrap(cell['wordWrap']), width = wordWrap ? Math.max(1, cell.width() - this._calculatePaddingsWidth(cell)) + 'px' : 'auto', $div = $('<div>')
            .css($.extend({
            'height': 'auto',
            'width': width,
            'overflow': 'hidden'
        }, cell.surface.cssCalculator.createFont(ko.unwrap(cell['font'])), cell.surface.cssCalculator.createWordWrap(wordWrap, cell.multiline())))
            .html(cell.text())
            .appendTo($('body'));
        try {
            return analytics_internal_1.pixelToUnits(Math.ceil($div[0].getBoundingClientRect().height) + 2, cell.root.measureUnit(), 1);
        }
        finally {
            $div.remove();
        }
    };
    TableCellGroupActions.prototype._calculateBordersHeight = function (cell) {
        var borders = cell.borders();
        var toCount;
        if (borders == 'All')
            toCount = [true, true];
        else {
            toCount = [false, false];
            if (borders.indexOf('Top') >= 0)
                toCount[0] = true;
            if (borders.indexOf('Bottom') >= 0)
                toCount[1] = true;
        }
        var row = cell.parentModel();
        var rowIndex = row.parentModel().rows().indexOf(row);
        if (rowIndex != 0)
            toCount[0] = false;
        return toCount.filter(function (x) { return x; }).length * ko.unwrap(cell['borderWidth']);
    };
    TableCellGroupActions.prototype._isCellTextControl = function (cell) { return cell.surface.getChildrenCollection()().length === 0; };
    TableCellGroupActions.prototype._calculatePaddingsHeight = function (cell) { return this._isCellTextControl(cell) ? cell.paddingObj.top() + cell.paddingObj.bottom() : 0; };
    TableCellGroupActions.prototype._calculatePaddingsWidth = function (cell) { return this._isCellTextControl(cell) ? cell.paddingObj.left() + cell.paddingObj.right() : 0; };
    TableCellGroupActions.prototype._selectedCells = function () {
        var result = [];
        this._selectionProvider.selectedItems
            .map(function (x) { return x.getControlModel(); })
            .forEach(function (x) {
            switch (x.controlType) {
                case 'XRTableCell':
                    result.push(x);
                    break;
                case 'XRTableRow':
                    result.push.apply(result, x.cells());
                    break;
                case 'XRTable':
                    x.rows().forEach(function (row) { return result.push.apply(result, row.cells()); });
                    break;
            }
        });
        return result;
    };
    TableCellGroupActions.prototype.condition = function (context) {
        return this._selectionProvider.selectedItems.length > 1
            && this._selectionProvider.selectedItems.every(function (x) { return ['XRTableCell', 'XRTableRow'].indexOf(x.getControlModel().controlType) >= 0; })
            || this._selectionProvider.selectedItems.length == 1
                && ['XRTable', 'XRTableRow'].indexOf(this._selectionProvider.selectedItems[0].getControlModel().controlType) >= 0;
    };
    return TableCellGroupActions;
}(analytics_internal_1.BaseActionsProvider));
exports.TableCellGroupActions = TableCellGroupActions;
