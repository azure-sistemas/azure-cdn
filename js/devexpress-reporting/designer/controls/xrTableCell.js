﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableCell.js)
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
var _tableComponentSurface_1 = require("./utils/_tableComponentSurface");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var editOptions_1 = require("./properties/editOptions");
var XRTableCellViewModel = (function (_super) {
    __extends(XRTableCellViewModel, _super);
    function XRTableCellViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this._disposables.push(_this.width = ko.pureComputed({
            read: function () {
                var result = parent.width() * _this.weight() / parent.cellsTotalWeight();
                return analytics_internal_1.roundingXDecimals(result, false, 3);
            },
            write: function (newWidth) {
                var currentIndex = parent.cells().indexOf(_this);
                if (parent.hasCalculationNode(currentIndex))
                    return;
                var diff = newWidth - _this.width();
                if (currentIndex < parent.cells().length - 1) {
                    parent.addCellToCalculation(currentIndex, diff);
                    parent.addCellToCalculation(currentIndex + 1, diff * -1);
                }
                else {
                    parent.addColumnToCalculation(diff, true);
                    parent.addTableOffset(diff);
                }
            }
        }).extend({ deferred: true }));
        _this.textEditOptions = new editOptions_1.ContainerEditOptions(model['EditOptions'] || {}, _this, serializer);
        _this.height = parent.height;
        _this.size = new analytics_elements_1.Size(0, 0);
        _this.size.isPropertyDisabled = function (name) { return name === 'height'; };
        _this._disposables.push(_this.size.height = ko.pureComputed({ read: function () { return _this.height(); }, write: function (newVal) { if (analytics_internal_1.checkModelReady(_this.root)) {
                _this.height(newVal);
            } } }));
        _this._disposables.push(_this.size.width = ko.pureComputed({ read: function () { return _this.width(); }, write: function (newVal) { if (analytics_internal_1.checkModelReady(_this.root)) {
                _this.width(newVal);
            } } }));
        _this._disposables.push(_this.controls.subscribe(function (value) { return value.length > 0 && _this.textEditOptions.enabled(false); }));
        _this._disposables.push(_this.left = ko.pureComputed({
            read: function () {
                var index = parent.cells().indexOf(_this);
                if (index > 0) {
                    var previousCell = parent.cells()[index - 1];
                    return previousCell.left() + previousCell.width();
                }
                else {
                    return 0;
                }
            },
            write: function (val) {
                if (val === _this.left())
                    return;
                var index = parent.cells().indexOf(_this);
                var diff = val - _this.left();
                if (index > 0) {
                    parent.addCellToCalculation(index - 1, diff);
                    parent.addCellToCalculation(index, diff * -1);
                }
                else {
                    parent.addColumnToCalculation(diff * -1);
                    parent.addTableOffset(diff * -1, diff);
                }
            }
        }).extend({ deferred: true }));
        return _this;
    }
    XRTableCellViewModel.unitProperties = ['paddingObj'];
    return XRTableCellViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRTableCellViewModel = XRTableCellViewModel;
var XRTableCellSurface = (function (_super) {
    __extends(XRTableCellSurface, _super);
    function XRTableCellSurface(control, context) {
        var _this = _super.call(this, control, context, XRTableCellSurface._unitProperties) || this;
        _this._row = _this.parent.getControlModel();
        _this._table = _this._row.parentModel();
        _this._cellIndex = function () { return _this._row.cells().indexOf(_this.getControlModel()); };
        _this._rowIndex = function () { return _this._table.rows().indexOf(_this._row); };
        _this.direction = _tableComponentSurface_1.TableActionDirection.horizontal;
        _this['multiline'] = control['multiline'];
        _this._disposables.push(_this.contentSizes = ko.pureComputed(function () {
            if (_this._isShowBorder('Left')) {
                return _this.cssCalculator.contentSizeCss(_this.rect().width, _this.heightWithRowSpan(), _this._context.zoom());
            }
            var bordersArray = control.borders().indexOf('All') === -1 ? control.borders().split(/\s*,\s*/g) : ['Left', 'Top', 'Right', 'Bottom'];
            var index = bordersArray.indexOf('Left');
            var width = _this.rect().width;
            if (index !== -1) {
                bordersArray.splice(index, 1);
                width += 1;
            }
            return _this.cssCalculator.contentSizeCss(width, _this.heightWithRowSpan(), _this._context.zoom(), bordersArray.join(','));
        }));
        _this._disposables.push(_this.css = ko.pureComputed(function () {
            var bottom = _this.cssCalculator.cellBorder('Bottom', _this._context.zoom());
            var right = _this.cssCalculator.cellBorder('Right', _this._context.zoom());
            var left = _this._isShowBorder('Left') ? _this.cssCalculator.cellBorder('Left', _this._context.zoom()) : _this.cssCalculator.createControlBorder('', 0, 'transparent', ['Left'], 'Left');
            var top = _this._isShowBorder('Top') ? _this.cssCalculator.cellBorder('Top', _this._context.zoom()) : { borderTop: '' };
            return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.backGroundCss(), right, bottom, top, left, _this.cssCalculator.foreColorCss(), _this.cssCalculator.textAlignmentCss());
        }));
        _this._disposables.push(_this.rowSpan = ko.pureComputed(function () {
            if (_this.controls().length > 0) {
                return 1;
            }
            for (var i = 1; i <= _this._rowIndex() && _this._rowIndex() - i >= 0; i++) {
                var cell = _this._getAdjacentCellByRowIndex(_this._rowIndex() - i);
                if (cell && cell.surface.rowSpan() > i)
                    return 0;
            }
            var rowSpan = control['rowSpan']();
            var lastRowSpan = 1;
            var rowCount = _this._table.rows().length;
            for (var i = 1; i < rowSpan && i + _this._rowIndex() < rowCount; i++, lastRowSpan++) {
                var nextCell = _this._getAdjacentCellByRowIndex(_this._rowIndex() + i);
                if (nextCell && (nextCell.width() != control.width() || nextCell['rowSpan']() > 1 || nextCell.controls().length > 0)) {
                    return lastRowSpan;
                }
            }
            return lastRowSpan;
        }));
        _this._disposables.push(_this.heightWithRowSpan = ko.pureComputed(function () {
            var _height = _this.rect().height;
            if (_this.rowSpan() > 1) {
                for (var i = 1; i < _this.rowSpan(); i++) {
                    var cell = _this._getAdjacentCellByRowIndex(_this._rowIndex() + i);
                    if (cell && cell.surface)
                        _height += cell.surface.rect().height;
                }
            }
            else if (_this.rowSpan() === 0) {
                return 0;
            }
            return _height;
        }));
        _this.offsetZIndex = function () {
            var hasRowSpan = _this.rowSpan() > 1;
            return hasRowSpan && (_this.selected() || _this.focused()) && 2 || hasRowSpan && 1 || null;
        };
        _this.getUsefulRect = function () {
            var borderWidth = ko.unwrap(control['borderWidth']), borderFlags = control.borders();
            var rect = { top: 0, left: 0, width: _this.rect().width, height: _this.rect().height };
            if (borderWidth) {
                var allBorders = borderFlags === 'All';
                if ((allBorders || borderFlags.indexOf('Top') >= 0) && _this._isShowBorder('Top')) {
                    rect.top += borderWidth;
                    rect.height -= borderWidth;
                }
                if (allBorders || borderFlags.indexOf('Right') >= 0)
                    rect.width -= borderWidth;
                if (allBorders || borderFlags.indexOf('Bottom') >= 0)
                    rect.height -= borderWidth;
                if ((allBorders || borderFlags.indexOf('Left') >= 0) && _this._isShowBorder('Left')) {
                    rect.left += borderWidth;
                    rect.width -= borderWidth;
                }
            }
            return rect;
        };
        return _this;
    }
    XRTableCellSurface.prototype._getAdjacentCellByRowIndex = function (rowIndex) {
        var nextRow = this._table.rows()[rowIndex];
        return nextRow && nextRow.cells && nextRow.cells()[this._cellIndex()];
    };
    XRTableCellSurface.prototype._isShowBorder = function (side) {
        if (side === 'Top') {
            var prevCell = this._getAdjacentCellByRowIndex(this._rowIndex() - 1);
            var borders = prevCell && prevCell['borders']();
            return (this._rowIndex() === 0) || (borders && borders !== 'All' && borders.indexOf('Bottom') === -1);
        }
        if (side === 'Left') {
            var prevCell = this._row.cells()[this._cellIndex() - 1], borders = prevCell && prevCell.borders();
            return (this._cellIndex() === 0) || (borders && borders !== 'All' && borders.indexOf('Right') === -1);
        }
    };
    XRTableCellSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    };
    XRTableCellSurface.prototype.selectColumn = function (selection) {
        (this.parent.parent).selectColumn(selection, this);
    };
    XRTableCellSurface.prototype.checkParent = function (surfaceParent) {
        return this.parent.parent === surfaceParent;
    };
    XRTableCellSurface.prototype.isThereIntersectionWithUsefulArea = function () {
        return false;
    };
    XRTableCellSurface.prototype.isThereIntersectionWithCrossBandControls = function () {
        return false;
    };
    XRTableCellSurface.prototype.isThereIntersectionWithNeighborsCollection = function () {
        return false;
    };
    XRTableCellSurface.prototype.isThereIntersectionWithParentCollection = function () {
        return false;
    };
    XRTableCellSurface.prototype.beforeRectUpdated = function (rect) {
        var _rowSpan = this.rowSpan.peek();
        for (var i = 1; i < _rowSpan; i++) {
            var nextCell = this._getAdjacentCellByRowIndex(this._rowIndex() + i);
            nextCell && nextCell.surface.rect(rect);
        }
        return _super.prototype.beforeRectUpdated.call(this, rect);
    };
    XRTableCellSurface.prototype.canDrop = function () {
        return _super.prototype.canDrop.call(this) && this.rowSpan() === 1;
    };
    XRTableCellSurface.prototype.getAdornTemplate = function () {
        var result = _super.prototype.getAdornTemplate.call(this);
        result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']() || (this._control.parentModel() && !this._control.parentModel()['visible']()));
        return result;
    };
    XRTableCellSurface._unitProperties = {
        _height: function (o) {
            return o.height;
        },
        _width: function (o) {
            return o.width;
        },
        _x: function (o) {
            return o.left;
        }
    };
    return XRTableCellSurface;
}(_tableComponentSurface_1.TableComponentSurface));
exports.XRTableCellSurface = XRTableCellSurface;
