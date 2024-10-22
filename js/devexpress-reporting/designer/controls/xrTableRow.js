﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableRow.js)
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
var xrTableCell_1 = require("./xrTableCell");
var _tableComponentSurface_1 = require("./utils/_tableComponentSurface");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var XRTableRowViewModel = (function (_super) {
    __extends(XRTableRowViewModel, _super);
    function XRTableRowViewModel(control, parent, serializer) {
        var _this = _super.call(this, control, parent, serializer) || this;
        _this.top = ko.observable(0);
        _this.width = parent.size.width;
        _this.cells = ko.observableArray();
        _this._disposables.push(_this.cellsTotalWeight = ko.pureComputed(function () {
            var result = 0;
            _this.cells().forEach(function (cell) {
                result += cell.weight();
            });
            return result;
        }));
        _this._disposables.push(_this.pixelWidthWeight = ko.pureComputed(function () {
            return parent.size.width() !== 0 ? _this.cellsTotalWeight() / parent.size.width() : 0;
        }));
        _this._disposables.push(_this.height = ko.pureComputed({
            read: function () {
                var result = parent.size.height() * _this.weight() / parent.rowsTotalWeight();
                return analytics_internal_1.roundingXDecimals(result);
            },
            write: function (newHeight) {
                var dHeight = newHeight - _this.height(), newWeight = parent.pixelHeightWeight() * newHeight, dWeight = newWeight - _this.weight(), thisRowIndex = parent.rows().indexOf(_this);
                _this.weight(newWeight);
                if (thisRowIndex < parent.rows().length - 1) {
                    parent.rows()[thisRowIndex + 1].weight(parent.rows()[thisRowIndex + 1].weight() - dWeight);
                }
                else {
                    parent.size.height(parent.size.height() + dHeight);
                }
            }
        }));
        _this.size = new analytics_elements_1.Size(0, 0);
        _this._disposables.push(_this.size.height = ko.pureComputed({ read: function () { return _this.height(); }, write: function (newVal) { if (analytics_internal_1.checkModelReady(_this.root)) {
                _this.height(newVal);
            } } }));
        _this._disposables.push(_this.size.width = ko.pureComputed({ read: function () { return _this.width(); }, write: function (newVal) { if (analytics_internal_1.checkModelReady(_this.root)) {
                _this.width(newVal);
            } } }));
        var deserializedCells = analytics_utils_1.deserializeArray(control.Cells, function (item) { return _this.getControlFactory().createControl(item, _this, serializer); });
        _this.cells(deserializedCells());
        var _top = ko.observable(null);
        _this._disposables.push(_this.top = ko.pureComputed({
            read: function () {
                var index = parent.rows().indexOf(_this);
                if (index > 0) {
                    var previousRow = parent.rows()[index - 1];
                    _top(previousRow.top() + previousRow.height());
                }
                else {
                    _top(0);
                }
                return _top();
            },
            write: function (val) {
                parent.updateRowLocation(_this, _top() - val);
                _top(val);
            }
        }));
        return _this;
    }
    XRTableRowViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.cells);
        this.resetObservableArray(this.cells);
    };
    XRTableRowViewModel.prototype.hasCalculationNode = function (cellIndex) {
        return this.parentModel().tableCalculationProvider.hasCalculationNode(this.parentModel().rows().indexOf(this), cellIndex);
    };
    XRTableRowViewModel.prototype.addCellToCalculation = function (cellIndex, delta) {
        var cell = this.cells()[cellIndex];
        var newWeight = this.pixelWidthWeight() * (cell.width() + delta);
        this.parentModel().tableCalculationProvider.addCalculationNode({
            column: cellIndex,
            row: this.parentModel().rows().indexOf(this),
            calc: function () {
                cell.weight(newWeight);
            }
        });
    };
    XRTableRowViewModel.prototype.addColumnToCalculation = function (diff, last) {
        this.parentModel().addColumnToCalculation(diff, last);
    };
    XRTableRowViewModel.prototype.addTableOffset = function (width, left) {
        this.parentModel().tableCalculationProvider.addTableOffset(width, left);
    };
    XRTableRowViewModel.prototype.addChild = function (control, position, onComponentAdded) {
        if (control instanceof xrTableCell_1.XRTableCellViewModel) {
            if (this.cells().indexOf(control) === -1) {
                control.parentModel(this);
                if (position != null) {
                    this.cells.splice(position, 0, control);
                }
                else {
                    this.cells.push(control);
                }
                if ($.isFunction(onComponentAdded))
                    onComponentAdded({ parent: this, model: control });
            }
        }
        else {
            throw new Error('Trying to add non a cell to the table row.');
        }
    };
    XRTableRowViewModel.prototype.insertCellCopy = function (selectedCell, isRight, onComponentAdded) {
        var newCellWeight = selectedCell.weight() / 2, newCell = new xrTableCell_1.XRTableCellViewModel({ '@ControlType': 'XRTableCell', '@Weight': newCellWeight, '@Padding': selectedCell.padding(), '@Multiline': 'true' }, this), indexSelectedCell = this.cells.indexOf(selectedCell);
        this.addChild(newCell, indexSelectedCell + (isRight ? 1 : 0), onComponentAdded);
        if (newCell['text']) {
            newCell['text'](newCell.name());
        }
        selectedCell.weight(newCellWeight);
    };
    XRTableRowViewModel.prototype.removeChild = function (selectedCell) {
        if (this.cells().length > 0 && this.cells().indexOf(selectedCell) !== -1) {
            var index = this.cells().indexOf(selectedCell), selectedCellWeight = selectedCell.weight();
            this.cells.splice(index, 1);
            if (this.cells()[index]) {
                this.cells()[index].weight(this.cells()[index].weight() + selectedCellWeight);
            }
            else if (this.cells()[index - 1]) {
                this.cells()[index - 1].weight(this.cells()[index - 1].weight() + selectedCellWeight);
            }
            if (this.cells().length === 0) {
                this.parentModel().removeChild(this);
            }
        }
    };
    XRTableRowViewModel.unitProperties = [];
    return XRTableRowViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRTableRowViewModel = XRTableRowViewModel;
var XRTableRowSurface = (function (_super) {
    __extends(XRTableRowSurface, _super);
    function XRTableRowSurface(control, context) {
        var _this = _super.call(this, control, context, XRTableRowSurface._unitProperties) || this;
        _this.direction = _tableComponentSurface_1.TableActionDirection.vertical;
        _this._disposables.push(_this.css = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.backGroundCss());
        }));
        _this._disposables.push(_this.contentCss = ko.pureComputed(function () {
            return {};
        }));
        return _this;
    }
    XRTableRowSurface.prototype._getChildrenHolderName = function () { return 'cells'; };
    XRTableRowSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.cells);
        this.resetObservableArray(this.cells);
    };
    XRTableRowSurface.prototype.getAdornTemplate = function () {
        var result = XRTableRowSurface._appendValue('', 'dxrd-image-surface-bounded', this.hasBindings);
        result = XRTableRowSurface._appendValue(result, 'dxrd-uiselected', this.selected());
        return result;
    };
    XRTableRowSurface._unitProperties = {
        _height: function (o) {
            return o.height;
        },
        _width: function (o) {
            return o.width;
        },
        _y: function (o) {
            return o.top;
        }
    };
    return XRTableRowSurface;
}(_tableComponentSurface_1.TableComponentSurface));
exports.XRTableRowSurface = XRTableRowSurface;
