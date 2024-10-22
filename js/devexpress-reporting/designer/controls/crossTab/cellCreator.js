﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\cellCreator.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrCrossTabCell_1 = require("../metadata/crosstab/xrCrossTabCell");
var enums_1 = require("./enums");
var CrossTabCellInfo = (function (_super) {
    __extends(CrossTabCellInfo, _super);
    function CrossTabCellInfo(model, serializer) {
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var _this = _super.call(this, model, serializer, xrCrossTabCell_1.cellserializtionInfoBase) || this;
        _this.kind = ko.observable(enums_1.CellKind.None);
        return _this;
    }
    return CrossTabCellInfo;
}(analytics_elements_1.SerializableModel));
exports.CrossTabCellInfo = CrossTabCellInfo;
var CellCreator = (function (_super) {
    __extends(CellCreator, _super);
    function CellCreator(crossTab) {
        var _this = _super.call(this) || this;
        _this.crossTab = crossTab;
        return _this;
    }
    Object.defineProperty(CellCreator.prototype, "rowFieldCount", {
        get: function () { return this.crossTab.rowFields().length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellCreator.prototype, "columnFieldCount", {
        get: function () { return this.crossTab.columnFields().length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellCreator.prototype, "dataFieldCount", {
        get: function () { return this.crossTab.dataFields().length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellCreator.prototype, "rowDataCount", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellCreator.prototype, "columnDataCount", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    CellCreator.prototype.nextRowIndex = function (cell) {
        return cell._rowIndex() + cell._rowSpan();
    };
    CellCreator.prototype.lastRowIndex = function (cell) {
        return this.nextRowIndex(cell) - 1;
    };
    CellCreator.prototype.nextColumnIndex = function (cell) {
        return cell._columnIndex() + cell._columnSpan();
    };
    CellCreator.prototype.lastColumnIndex = function (cell) {
        return this.nextColumnIndex(cell) - 1;
    };
    CellCreator.prototype.setCellKind = function (cell, kind) {
        cell.kind(kind);
    };
    CellCreator.prototype.setLevel = function (cell, dataLevel, columnLevel, rowLevel) {
        if (dataLevel >= 0)
            this.setDataLevel(cell, dataLevel);
        if (columnLevel >= 0)
            this.setColumnLevel(cell, columnLevel);
        if (rowLevel >= 0)
            this.setRowLevel(cell, rowLevel);
    };
    CellCreator.prototype.setDataLevel = function (cell, level) {
        cell.dataLevel = level;
    };
    CellCreator.prototype.setColumnLevel = function (cell, level) {
        cell.columnLevel = level;
    };
    CellCreator.prototype.setRowLevel = function (cell, level) {
        cell.rowLevel = level;
    };
    CellCreator.prototype.indexToLevel = function (index, count) {
        return count - 1 - index;
    };
    CellCreator.prototype.setLayout = function (cell, columnIndex, rowIndex, columnSpan, rowSpan) {
        cell._columnIndex(columnIndex);
        cell._rowIndex(rowIndex);
        cell._columnSpan(columnSpan);
        cell._rowSpan(rowSpan);
    };
    CellCreator.createInstance = function (crossTab) {
        return crossTab.dataFields().length <= 1 ? new CellCreator(crossTab)
            : crossTab.layoutOptions.dataFieldLayout() === enums_1.DataFieldLayout[enums_1.DataFieldLayout.InRow] ? new HorizontalCreator(crossTab)
                : new VerticalCreator(crossTab);
    };
    CellCreator.prototype.create = function () {
        var cells = [];
        var corners = this.createCorners(Math.max(1, this.columnFieldCount), Math.max(1, this.rowFieldCount));
        cells.push.apply(cells, corners);
        this.lastCorner = corners[corners.length - 1];
        var dataHeaders = this.createDataHeaders();
        cells.push.apply(cells, dataHeaders);
        var dataCells = this.createData();
        cells.push.apply(cells, dataCells);
        var columnHeaders = this.createColumnHeaders(this.nextColumnIndex(this.lastCorner), this.columnFieldCount * this.columnDataCount, this.columnDataCount);
        cells.push.apply(cells, columnHeaders);
        var rowHeaders = this.createRowHeaders(this.nextRowIndex(this.lastCorner), this.rowFieldCount * this.rowDataCount, this.rowDataCount);
        cells.push.apply(cells, rowHeaders);
        var rowTotalHeaders = this.createRowTotalHeaders(rowHeaders[rowHeaders.length - 1]._columnIndex(), 1, this.nextRowIndex(rowHeaders[rowHeaders.length - 1]), this.rowDataCount);
        cells.push.apply(cells, rowTotalHeaders);
        cells.push.apply(cells, this.createRowTotals(dataCells[0]._columnIndex(), this.nextRowIndex(dataCells[0]), this.rowDataCount));
        var columnTotalHeaders = this.createColumnTotalHeaders(this.nextColumnIndex(columnHeaders[columnHeaders.length - 1]), columnHeaders[columnHeaders.length - 1]._rowIndex(), 1, this.columnDataCount);
        cells.push.apply(cells, columnTotalHeaders);
        cells.push.apply(cells, this.createColumnTotals(this.nextColumnIndex(dataCells[0]), dataCells[0]._rowIndex(), this.columnDataCount));
        cells.push.apply(cells, this.createGrandTotals(dataCells, this.nextRowIndex(dataCells[dataCells.length - 1]), this.nextColumnIndex(dataCells[dataCells.length - 1]), dataCells.length, 1));
        if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount > 1) {
            cells.push.apply(cells, this.createEmptyHeaders(this.columnFieldCount + 1));
            cells.push.apply(cells, this.createEmptyCells(1));
        }
        return cells;
    };
    CellCreator.prototype.creator = function (cellKind) {
        var cell = new CrossTabCellInfo({});
        this.setCellKind(cell, cellKind);
        return cell;
    };
    CellCreator.prototype.createCorners = function (columnCount, rowCount) {
        var mode = this.crossTab.layoutOptions.cornerHeaderDisplayMode();
        var corners = [];
        if (enums_1.CornerHeaderDisplayMode[mode] === enums_1.CornerHeaderDisplayMode.RowFieldNames) {
            for (var i = 0; i < rowCount; i++) {
                var cell_1 = this.creator(enums_1.CellKind.Corner);
                this.setLayout(cell_1, i, 0, 1, columnCount);
                this.setRowLevel(cell_1, i);
                cell_1.field = ko.observable(this.crossTab.rowFields()[i]);
                corners.push(cell_1);
            }
        }
        else if (enums_1.CornerHeaderDisplayMode[mode] === enums_1.CornerHeaderDisplayMode.ColumnFieldNames) {
            for (var i = 0; i < columnCount; i++) {
                var cell_2 = this.creator(enums_1.CellKind.Corner);
                this.setLayout(cell_2, 0, i, rowCount, 1);
                this.setColumnLevel(cell_2, i);
                cell_2.field = ko.observable(this.crossTab.columnFields()[i]);
                corners.push(cell_2);
            }
        }
        else {
            if (this.crossTab.layoutOptions)
                var cell = this.creator(enums_1.CellKind.Corner);
            this.setLayout(cell, 0, 0, rowCount, columnCount);
            corners.push(cell);
        }
        return corners;
    };
    CellCreator.prototype.createDataHeaders = function () {
        return [];
    };
    CellCreator.prototype.createDataHeader = function (columnIndex, rowIndex, dataLevel, columnLevel, rowLevel) {
        if (columnLevel === void 0) { columnLevel = -1; }
        if (rowLevel === void 0) { rowLevel = -1; }
        var cell = this.creator(enums_1.CellKind.DataHeader);
        this.setLevel(cell, dataLevel, columnLevel, rowLevel);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        cell.field = ko.observable(this.crossTab.dataFields()[dataLevel]);
        return cell;
    };
    CellCreator.prototype.createData = function () {
        var startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        return [this.createDataCell(this.nextColumnIndex(this.lastCorner), startRowIndex, 0)];
    };
    CellCreator.prototype.createDataCell = function (colIndex, rowIndex, level) {
        var cell = this.creator(enums_1.CellKind.Data);
        cell.field = ko.observable(this.crossTab.dataFields()[level]);
        this.setDataLevel(cell, level);
        this.setLayout(cell, colIndex, rowIndex, 1, 1);
        return cell;
    };
    CellCreator.prototype.createColumnTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.columnFieldCount == 0)
            return [];
        var cells = [];
        var columnIndex = startColumnIndex;
        for (var i = 0; i < this.columnFieldCount; i++) {
            var level = this.indexToLevel(i, this.columnFieldCount) - 1;
            for (var j = 0; j < Math.max(1, this.dataFieldCount); j++) {
                cells.push(this.createColumnTotal(columnIndex, startRowIndex, j, level));
            }
            columnIndex += dataCount;
        }
        return cells;
    };
    CellCreator.prototype.createColumnTotal = function (columnIndex, rowIndex, dataLevel, columnLevel) {
        var cell = this.creator(enums_1.CellKind.ColumnTotal);
        this.setLevel(cell, dataLevel, columnLevel, -1);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        return cell;
    };
    CellCreator.prototype.createRowTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.rowFieldCount === 0)
            return [];
        var cells = [];
        var rowIndex = startRowIndex;
        for (var i = 0; i < this.rowFieldCount; i++) {
            var level = this.indexToLevel(i, this.rowFieldCount) - 1;
            for (var j = 0; j < Math.max(1, this.dataFieldCount); j++) {
                cells.push(this.createRowTotal(startColumnIndex, rowIndex, j, level));
            }
            rowIndex += dataCount;
        }
        return cells;
    };
    CellCreator.prototype.createRowTotal = function (columnIndex, rowIndex, dataLevel, rowLevel) {
        var cell = this.creator(enums_1.CellKind.RowTotal);
        this.setLevel(cell, dataLevel, -1, rowLevel);
        this.setLayout(cell, columnIndex, rowIndex, 1, 1);
        return cell;
    };
    CellCreator.prototype.createGrandTotals = function (dataItems, startRowIndex, startColumnIndex, columnInc, rowInc) {
        var columnIndex = startColumnIndex;
        var totals = [];
        for (var i = 0; i < this.columnFieldCount; i++) {
            var columnLevel = this.indexToLevel(i, this.columnFieldCount) - 1;
            var rowIndex = startRowIndex;
            for (var j = 0; j < this.rowFieldCount; j++) {
                var rowLevel = this.indexToLevel(j, this.rowFieldCount) - 1;
                for (var k = 0; k < dataItems.length; k++) {
                    var cell = this.createGrandTotal(k, columnLevel, rowLevel);
                    this.setGrandTotalLayout(cell, k, columnIndex, rowIndex);
                    totals.push(cell);
                }
                rowIndex += rowInc;
            }
            columnIndex += columnInc;
        }
        return totals;
    };
    CellCreator.prototype.createGrandTotal = function (dataLevel, columnLevel, rowLevel) {
        var cell = this.creator(enums_1.CellKind.GrandTotal);
        this.setLevel(cell, dataLevel, columnLevel, rowLevel);
        return cell;
    };
    CellCreator.prototype.setGrandTotalLayout = function (cells, inc, columnIndex, rowIndex) {
        this.setLayout(cells, columnIndex + inc, rowIndex, 1, 1);
    };
    CellCreator.prototype.createColumnHeaders = function (startColumnIndex, columnSpan, dataCount) {
        var cells = [];
        if (this.columnFieldCount === 0) {
            var columnHeader = this.creator(enums_1.CellKind.ColumnHeader);
            this.setColumnLevel(columnHeader, 0);
            this.setLayout(columnHeader, startColumnIndex, 0, dataCount, 1);
            cells.push(columnHeader);
        }
        if (this.crossTab.layoutOptions.columnTotalHeaderPosition() === enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer])
            columnSpan = Math.max(dataCount, columnSpan - dataCount);
        var rowIndex = 0;
        var isReversed = this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData];
        isReversed && (startColumnIndex += dataCount * (this.columnFieldCount + 1));
        for (var i = 0; i < this.columnFieldCount; i++) {
            var columnHeader = this.creator(enums_1.CellKind.ColumnHeader);
            columnHeader.field = ko.observable(this.crossTab.columnFields()[i]);
            this.setColumnLevel(columnHeader, i);
            this.setLayout(columnHeader, isReversed ? startColumnIndex - columnSpan : startColumnIndex, rowIndex, columnSpan, 1);
            cells.push(columnHeader);
            columnSpan = Math.max(dataCount, columnSpan - dataCount);
            rowIndex = this.nextRowIndex(columnHeader);
        }
        return cells;
    };
    CellCreator.prototype.createColumnTotalHeaders = function (startColumnIndex, startRowIndex, rowSpan, dataCount) {
        var cells = [];
        if (this.columnFieldCount === 0)
            return [];
        if (this.crossTab.layoutOptions.columnTotalHeaderPosition() === enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer] && startRowIndex > 0) {
            startRowIndex--;
            rowSpan++;
        }
        var rowIndex = startRowIndex;
        var columnIndex = startColumnIndex;
        var columnInc = dataCount;
        if (this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            columnIndex -= dataCount * 2;
            columnInc = -columnInc;
        }
        for (var i = 0; i < this.columnFieldCount; i++) {
            var level = this.indexToLevel(i, this.columnFieldCount);
            var columnTotalHeader = level === 0 ? this.createColumnGrandTotalHeader() : this.createColumnTotalHeader(level - 1);
            columnTotalHeader.field = ko.observable(this.crossTab.columnFields()[level - 1]);
            this.setLayout(columnTotalHeader, columnIndex, rowIndex, dataCount, rowSpan);
            cells.push(columnTotalHeader);
            if (rowIndex > 0) {
                rowIndex--;
                rowSpan++;
            }
            columnIndex += columnInc;
        }
        return cells;
    };
    CellCreator.prototype.createRowHeaders = function (startRowIndex, rowSpan, dataCount) {
        if (this.rowFieldCount === 0) {
            var rowHeader = this.creator(enums_1.CellKind.RowHeader);
            this.setRowLevel(rowHeader, 0);
            this.setLayout(rowHeader, 0, startRowIndex, 1, dataCount);
            return [rowHeader];
        }
        var cells = [];
        var columnShift = 0;
        if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount > 1) {
            columnShift = 1;
            rowSpan = 1;
        }
        else if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer]) {
            rowSpan = Math.max(dataCount, rowSpan - dataCount);
        }
        var columnIndex = 0;
        var rowIndex = startRowIndex;
        var isReversed = this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData];
        isReversed && (rowIndex += dataCount * (this.rowFieldCount + 1));
        var columnSpan = Math.max(1, this.rowFieldCount * columnShift);
        for (var i = 0; i < this.rowFieldCount; i++) {
            var rowHeader = this.creator(enums_1.CellKind.RowHeader);
            rowHeader.field = ko.observable(this.crossTab.rowFields()[i]);
            this.setRowLevel(rowHeader, i);
            if (this.crossTab.layoutOptions.hierarchicalRowLayout() && this.rowFieldCount - 1 > i
                && this.crossTab.layoutOptions.dataFieldLayout() === enums_1.DataFieldLayout[enums_1.DataFieldLayout.InColumn]) {
                columnSpan += 1;
            }
            this.setLayout(rowHeader, columnIndex, isReversed ? rowIndex - rowSpan : rowIndex, columnSpan, rowSpan);
            cells.push(rowHeader);
            if (!this.crossTab.layoutOptions.hierarchicalRowLayout() || this.rowFieldCount - 2 == i) {
                rowSpan = Math.max(dataCount, rowSpan - dataCount);
            }
            columnSpan = Math.max(1, (this.rowFieldCount - i - 1) * columnShift);
            columnIndex = rowHeader._columnIndex() + 1;
            !isReversed && (rowIndex = rowHeader._rowIndex() + columnShift);
        }
        return cells;
    };
    CellCreator.prototype.createRowTotalHeaders = function (startColumnIndex, columnSpan, startRowIndex, dataCount) {
        if (this.rowFieldCount === 0)
            return [];
        if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer] && startColumnIndex > 0) {
            startColumnIndex--;
            columnSpan++;
        }
        var rowIndex = startRowIndex;
        var rowInc = dataCount;
        if (this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            rowIndex -= dataCount * 2;
            rowInc = -rowInc;
        }
        var columnIndex = startColumnIndex;
        var cells = [];
        for (var i = 0; i < this.rowFieldCount; i++) {
            var level = this.indexToLevel(i, this.rowFieldCount);
            var rowTotalHeader = level === 0 ? this.createRowGrandTotalHeader() : this.createRowTotalHeader(level - 1);
            rowTotalHeader.field = ko.observable(this.crossTab.rowFields()[level - 1]);
            this.setLayout(rowTotalHeader, columnIndex, rowIndex, columnSpan, dataCount);
            cells.push(rowTotalHeader);
            if (columnIndex > 0) {
                columnIndex--;
                columnSpan++;
            }
            rowIndex += rowInc;
        }
        return cells;
    };
    CellCreator.prototype.createEmptyHeaders = function (columnSpan) {
        var rowIndex = this.nextRowIndex(this.lastCorner);
        var columnIndex = this.nextColumnIndex(this.lastCorner);
        var cells = [];
        for (var i = 0; i < this.rowFieldCount - 1; i++) {
            var emptyHeader = this.createEmptyHeader(i);
            this.setLayout(emptyHeader, columnIndex, rowIndex, columnSpan, 1);
            cells.push(emptyHeader);
            rowIndex++;
        }
        return cells;
    };
    CellCreator.prototype.createEmptyCells = function (dataCount) {
        var rowIndex = this.nextRowIndex(this.lastCorner) + 1;
        var columnIndex = 0;
        var rowSpan = this.rowFieldCount * (dataCount + 1) - 2;
        if (this.crossTab.layoutOptions.rowTotalHeaderPosition() === enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer]) {
            rowSpan -= dataCount;
        }
        var cells = [];
        for (var i = 0; i < this.rowFieldCount - 1; i++) {
            var emptyCell = this.createEmptyCell(i);
            this.setLayout(emptyCell, columnIndex, rowIndex, 1, rowSpan);
            cells.push(emptyCell);
            rowIndex++;
            columnIndex++;
            rowSpan -= dataCount + 1;
        }
        return cells;
    };
    CellCreator.prototype.createEmptyHeader = function (level) {
        var emptyHeader = this.creator(enums_1.CellKind.EmptyHeader);
        this.setRowLevel(emptyHeader, level);
        return emptyHeader;
    };
    CellCreator.prototype.createEmptyCell = function (level) {
        var emptyCell = this.creator(enums_1.CellKind.Empty);
        this.setRowLevel(emptyCell, level);
        return emptyCell;
    };
    CellCreator.prototype.createColumnTotalHeader = function (level) {
        var columnHeaderTotal = this.creator(enums_1.CellKind.ColumnTotalHeader);
        this.setColumnLevel(columnHeaderTotal, level);
        return columnHeaderTotal;
    };
    CellCreator.prototype.createColumnGrandTotalHeader = function () {
        var cell = this.creator(enums_1.CellKind.ColumnTotalHeader);
        return cell;
    };
    CellCreator.prototype.createRowTotalHeader = function (level) {
        var rowHeaderTotal = this.creator(enums_1.CellKind.RowTotalHeader);
        this.setRowLevel(rowHeaderTotal, level);
        return rowHeaderTotal;
    };
    CellCreator.prototype.createRowGrandTotalHeader = function () {
        var cell = this.creator(enums_1.CellKind.RowTotalHeader);
        return cell;
    };
    return CellCreator;
}(analytics_utils_1.Disposable));
exports.CellCreator = CellCreator;
var HorizontalCreator = (function (_super) {
    __extends(HorizontalCreator, _super);
    function HorizontalCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HorizontalCreator.prototype, "columnDataCount", {
        get: function () { return this.dataFieldCount; },
        enumerable: true,
        configurable: true
    });
    HorizontalCreator.prototype.createCorners = function (columnCount, rowCount) {
        var corners = _super.prototype.createCorners.call(this, columnCount, rowCount);
        if (this.crossTab.layoutOptions.cornerHeaderDisplayMode() == enums_1.CornerHeaderDisplayMode[enums_1.CornerHeaderDisplayMode.ColumnFieldNames]) {
            var lastCorner = corners[corners.length - 1];
            lastCorner._rowSpan(lastCorner._rowSpan() + 1);
        }
        else
            corners.forEach(function (corner) {
                corner._rowSpan(corner._rowSpan() + 1);
            });
        return corners;
    };
    HorizontalCreator.prototype.createDataHeaders = function () {
        var rowIndex = this.lastRowIndex(this.lastCorner);
        var isReversed = this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData];
        var columnIndex = !isReversed ? this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount * this.dataFieldCount;
        var cells = [];
        for (var i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataHeader(columnIndex, rowIndex, i));
            columnIndex++;
        }
        var columnInc = Math.max(1, this.dataFieldCount);
        isReversed && (columnIndex -= 2 * columnInc);
        for (var i = 0; i < this.columnFieldCount; i++) {
            var columnLevel = this.indexToLevel(i, this.columnFieldCount);
            for (var j = 0; j < columnInc; j++) {
                var dataHeader = this.createDataHeader(columnIndex + j, rowIndex, j, columnLevel);
                this.setLevel(dataHeader, -1, columnLevel, -1);
                cells.push(dataHeader);
            }
            isReversed ? (columnIndex -= columnInc) : (columnIndex += columnInc);
        }
        return cells;
    };
    HorizontalCreator.prototype.createData = function () {
        var startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        var rowIndex = this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] ?
            startRowIndex : startRowIndex + this.rowFieldCount;
        var columnIndex = this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] ?
            this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount * this.dataFieldCount;
        var cells = [];
        for (var i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataCell(columnIndex + i, rowIndex, i));
        }
        return cells;
    };
    HorizontalCreator.prototype.createRowTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            return _super.prototype.createRowTotals.call(this, startColumnIndex, startRowIndex - 2, -dataCount);
        }
        return _super.prototype.createRowTotals.call(this, startColumnIndex, startRowIndex, dataCount);
    };
    HorizontalCreator.prototype.createColumnTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            return _super.prototype.createColumnTotals.call(this, startColumnIndex - 3, startRowIndex, -dataCount);
        }
        return _super.prototype.createColumnTotals.call(this, startColumnIndex + dataCount - 1, startRowIndex, dataCount);
    };
    HorizontalCreator.prototype.createGrandTotals = function (dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            startColumnIndex -= dataItems.length + 2;
            columnIndex = -dataItems.length;
        }
        if (this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            startRowIndex -= 2;
            rowIndex = -1;
        }
        return _super.prototype.createGrandTotals.call(this, dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex);
    };
    HorizontalCreator.prototype.createColumnTotal = function (columnIndex, rowIndex, dataLevel, columnLevel) {
        return _super.prototype.createColumnTotal.call(this, columnIndex + dataLevel, rowIndex, dataLevel, columnLevel);
    };
    HorizontalCreator.prototype.createRowTotal = function (columnIndex, rowIndex, dataLevel, rowLevel) {
        return _super.prototype.createRowTotal.call(this, columnIndex + dataLevel, rowIndex, dataLevel, rowLevel);
    };
    HorizontalCreator.prototype.createEmptyHeaders = function (columnSpan) {
        return _super.prototype.createEmptyHeaders.call(this, columnSpan * this.dataFieldCount);
    };
    return HorizontalCreator;
}(CellCreator));
exports.HorizontalCreator = HorizontalCreator;
var VerticalCreator = (function (_super) {
    __extends(VerticalCreator, _super);
    function VerticalCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VerticalCreator.prototype, "rowDataCount", {
        get: function () { return this.dataFieldCount; },
        enumerable: true,
        configurable: true
    });
    VerticalCreator.prototype.createCorners = function (columnCount, rowCount) {
        var corners = _super.prototype.createCorners.call(this, columnCount, rowCount);
        if (this.crossTab.layoutOptions.cornerHeaderDisplayMode() == enums_1.CornerHeaderDisplayMode[enums_1.CornerHeaderDisplayMode.RowFieldNames]) {
            var lastCorner = corners[corners.length - 1];
            lastCorner._columnSpan(lastCorner._columnSpan() + 1);
        }
        else
            corners.forEach(function (corner) {
                corner._columnSpan(corner._columnSpan() + 1);
            });
        return corners;
    };
    VerticalCreator.prototype.createDataHeaders = function () {
        var startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        var isReversed = this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData];
        var rowIndex = !isReversed ? startRowIndex : startRowIndex + (this.rowFieldCount) * this.dataFieldCount;
        var columnIndex = this.lastColumnIndex(this.lastCorner);
        var cells = [];
        for (var i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataHeader(columnIndex, rowIndex, i));
            rowIndex++;
        }
        var rowInc = Math.max(1, this.dataFieldCount);
        isReversed && (rowIndex -= 2 * rowInc);
        for (var i = 0; i < this.rowFieldCount; i++) {
            var rowLevel = this.indexToLevel(i, this.rowFieldCount);
            for (var j = 0; j < rowInc; j++) {
                var dataHeader = this.createDataHeader(columnIndex, rowIndex + j, j, undefined, rowLevel);
                this.setLevel(dataHeader, -1, -1, rowLevel);
                cells.push(dataHeader);
            }
            isReversed ? (rowIndex -= rowInc) : (rowIndex += rowInc);
        }
        return cells;
    };
    VerticalCreator.prototype.createData = function () {
        var startRowIndex = this.nextRowIndex(this.lastCorner);
        if (this.crossTab.layoutOptions.hierarchicalRowLayout())
            startRowIndex += this.rowFieldCount - 1;
        var rowIndex = this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] ?
            startRowIndex : startRowIndex + (this.rowFieldCount) * this.dataFieldCount;
        var columnIndex = this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] ?
            this.nextColumnIndex(this.lastCorner) : this.nextColumnIndex(this.lastCorner) + this.columnFieldCount;
        var cells = [];
        for (var i = 0; i < this.dataFieldCount; i++) {
            cells.push(this.createDataCell(columnIndex, rowIndex + i, i));
        }
        return cells;
    };
    VerticalCreator.prototype.createRowTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            return _super.prototype.createRowTotals.call(this, startColumnIndex, startRowIndex - 3, -dataCount);
        }
        return _super.prototype.createRowTotals.call(this, startColumnIndex, startRowIndex + dataCount - 1, dataCount);
    };
    VerticalCreator.prototype.createColumnTotals = function (startColumnIndex, startRowIndex, dataCount) {
        if (this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            return _super.prototype.createColumnTotals.call(this, startColumnIndex - 2, startRowIndex, -dataCount);
        }
        return _super.prototype.createColumnTotals.call(this, startColumnIndex, startRowIndex, dataCount);
    };
    VerticalCreator.prototype.createColumnTotal = function (columnIndex, rowIndex, dataLevel, columnLevel) {
        return _super.prototype.createColumnTotal.call(this, columnIndex, rowIndex + dataLevel, dataLevel, columnLevel);
    };
    VerticalCreator.prototype.createRowTotal = function (columnIndex, rowIndex, dataLevel, rowLevel) {
        return _super.prototype.createRowTotal.call(this, columnIndex, rowIndex + dataLevel, dataLevel, rowLevel);
    };
    VerticalCreator.prototype.createGrandTotals = function (dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex) {
        columnIndex = 1;
        rowIndex = dataItems.length;
        if (this.crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            startColumnIndex -= 2;
            columnIndex = -1;
        }
        if (this.crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
            startRowIndex -= this.dataFieldCount + 2;
            rowIndex = -dataItems.length;
        }
        return _super.prototype.createGrandTotals.call(this, dataItems, startRowIndex, startColumnIndex, columnIndex, rowIndex);
    };
    VerticalCreator.prototype.setGrandTotalLayout = function (items, inc, columnIndex, rowIndex) {
        this.setLayout(items, columnIndex, rowIndex + inc, 1, 1);
    };
    VerticalCreator.prototype.createEmptyCells = function (dataCount) {
        return _super.prototype.createEmptyCells.call(this, dataCount * this.dataFieldCount);
    };
    return VerticalCreator;
}(CellCreator));
exports.VerticalCreator = VerticalCreator;
