﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTable.js)
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
var xrControl_1 = require("./xrControl");
var xrTableRow_1 = require("./xrTableRow");
var _tableCalculationProvider_1 = require("./utils/_tableCalculationProvider");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var XRTableControlViewModel = (function (_super) {
    __extends(XRTableControlViewModel, _super);
    function XRTableControlViewModel(control, parent, serializer) {
        var _this = _super.call(this, control, parent, serializer) || this;
        _this.rows = ko.observableArray();
        _this._disposables.push(_this.rowsTotalWeight = ko.pureComputed(function () {
            var result = 0;
            _this.rows().forEach(function (row) {
                result += row.weight();
            });
            return result;
        }));
        _this._disposables.push(_this.pixelHeightWeight = ko.pureComputed(function () {
            return _this.size.height() !== 0 ? _this.rowsTotalWeight() / _this.size.height() : 0;
        }));
        var deserializedRows = analytics_utils_1.deserializeArray(control.Rows, function (item) { return new xrTableRow_1.XRTableRowViewModel(item, _this, serializer); });
        _this.rows(deserializedRows());
        _this.tableCalculationProvider = new _tableCalculationProvider_1.TableCalculationProvider(_this);
        return _this;
    }
    XRTableControlViewModel.prototype._getAdjacentCells = function (condition) {
        var adjacentCells = [];
        this.rows().forEach(function (row) {
            row.cells().filter(function (cell) { return condition(cell); }).forEach(function (cell) {
                adjacentCells.push(cell);
            });
        });
        return adjacentCells;
    };
    XRTableControlViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.rows);
        this.resetObservableArray(this.rows);
    };
    XRTableControlViewModel.prototype.updateRowLocation = function (row, deltaHeight) {
        var oldHeight = row.height();
        var rowIndex = this.rows().indexOf(row);
        if (rowIndex > 0) {
            var topRowHeight = this.rows()[rowIndex - 1].height;
            var topHeight = topRowHeight() - deltaHeight;
            topRowHeight(topHeight > 0 ? topHeight : 0);
        }
        else {
            var deltaWeight = (row.weight() / oldHeight) * deltaHeight;
            row.weight(row.weight() + deltaWeight);
            this.location.y(this.location.y() - deltaHeight);
            this.size.height(this.size.height() + deltaHeight);
        }
    };
    XRTableControlViewModel.prototype.addChild = function (control, position, onComponentAdded) {
        if (control instanceof xrTableRow_1.XRTableRowViewModel) {
            if (this.rows().indexOf(control) === -1) {
                control.parentModel(this);
                if (position != null) {
                    this.rows.splice(position, 0, control);
                }
                else {
                    this.rows.push(control);
                }
                if ($.isFunction(onComponentAdded))
                    onComponentAdded({ parent: this, model: control });
            }
        }
        else {
            throw new Error('Trying to add non a row to the table.');
        }
    };
    XRTableControlViewModel.prototype.insertRow = function (selectedRow, isRowAbove, onComponentAdded) {
        var selectedRowHeight = selectedRow.height(), newRow = new xrTableRow_1.XRTableRowViewModel({
            '@ControlType': 'XRTableRow',
            '@Weight': selectedRow.weight(),
            '@HeightF': selectedRowHeight,
        }, this), indexSelectedRow = this.rows.indexOf(selectedRow);
        selectedRow.cells().forEach(function (cell) {
            newRow.createChild({ '@ControlType': 'XRTableCell', '@Weight': cell.weight(), '@Padding': '2,2,0,0,100', '@Multiline': 'true' });
        });
        this.addChild(newRow, indexSelectedRow + (isRowAbove ? 0 : 1), onComponentAdded);
        this.size.height(this.size.height() + selectedRowHeight);
    };
    XRTableControlViewModel.prototype.removeChild = function (selectedRow) {
        if (this.rows().length > 0 && this.rows().indexOf(selectedRow) !== -1) {
            var index = this.rows().indexOf(selectedRow);
            this.size.height(this.size.height() - selectedRow.height());
            this.rows.splice(index, 1);
        }
        if (this.rows().length === 0) {
            this.parentModel().removeChild(this);
        }
    };
    XRTableControlViewModel.prototype.insertColumn = function (selectedCell, isRight, onComponentAdded) {
        var selectedCellX = selectedCell.surface.rect().left, selectedCellRight = selectedCell.surface.rect().left + selectedCell.surface.rect().width, adjacentCells = this._getAdjacentCells(function (cell) { return isRight ? ((cell.surface.rect().left + cell.surface.rect().width) === selectedCellRight) : (cell.surface.rect().left === selectedCellX); });
        adjacentCells.forEach(function (cell) {
            cell.parentModel().insertCellCopy(cell, isRight, onComponentAdded);
        });
    };
    XRTableControlViewModel.prototype.addColumnToCalculation = function (diff, last) {
        if (last === void 0) { last = false; }
        var rows = this.rows();
        for (var i = 0; i < rows.length; i++) {
            rows[i].addCellToCalculation(last ? rows[i].cells().length - 1 : 0, diff);
        }
    };
    return XRTableControlViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRTableControlViewModel = XRTableControlViewModel;
var XRTableSurface = (function (_super) {
    __extends(XRTableSurface, _super);
    function XRTableSurface(control, context) {
        var _this = _super.call(this, control, context, XRTableSurface._unitProperties) || this;
        _this._isUpdating = false;
        _this.template = 'dxrd-table';
        _this.selectiontemplate = 'dxrd-table-selection';
        _this._disposables.push(_this.css = ko.pureComputed(function () {
            return {};
        }));
        _this._disposables.push(_this.contentCss = ko.pureComputed(function () {
            return {};
        }));
        return _this;
    }
    XRTableSurface.prototype._getChildrenHolderName = function () { return 'rows'; };
    XRTableSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.rows);
        this.resetObservableArray(this.rows);
    };
    XRTableSurface.prototype._isCellInColumn = function (cell, locationStart, locationEnd) {
        return Math.abs(cell.rect().left - locationStart) < 0.01 && Math.abs(cell.rect().left + cell.rect().width - locationEnd) < 0.01;
    };
    XRTableSurface.prototype.selectColumn = function (selection, cellSurface) {
        var _this = this;
        selection.initialize(this);
        var locationStart = cellSurface.rect().left, locationEnd = locationStart + cellSurface.rect().width;
        selection.selecting({ control: cellSurface, cancel: false });
        this.rows().forEach(function (rowSurface) {
            rowSurface.cells().forEach(function (cellSurface) {
                if (_this._isCellInColumn(cellSurface, locationStart, locationEnd)) {
                    selection.selecting({ control: cellSurface, cancel: false });
                    return true;
                }
            });
        });
    };
    XRTableSurface.prototype.isThereIntersectionWithChildCollection = function () {
        return false;
    };
    XRTableSurface._unitProperties = {
        _x: function (o) {
            return o.location.x;
        },
        _y: function (o) {
            return o.location.y;
        },
        _width: function (o) {
            return o.size.width;
        },
        _height: function (o) {
            return o.size.height;
        }
    };
    return XRTableSurface;
}(xrControl_1.XRControlSurfaceBase));
exports.XRTableSurface = XRTableSurface;
