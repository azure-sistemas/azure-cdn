﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCharactercomb.js)
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
var xrReportelement_1 = require("./xrReportelement");
var _textElementSizeHelper_1 = require("../helpers/_textElementSizeHelper");
var _charactercombHelper_1 = require("./utils/_charactercombHelper");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var XRCharacterComb = (function (_super) {
    __extends(XRCharacterComb, _super);
    function XRCharacterComb(control, parent, serializer) {
        var _this = _super.call(this, control, parent, serializer) || this;
        var _originalCellWidth = _this.cellWidth;
        var _originalCellHeight = _this.cellHeight;
        _this._disposables.push(_this.cellWidth = _this._createCellSideFromOriginalSide(_originalCellWidth, false));
        _this._disposables.push(_this.cellHeight = _this._createCellSideFromOriginalSide(_originalCellHeight, true));
        var fontModel = new analytics_widgets_internal_1.FontModel(_this.font);
        var borderWidth = ko.computed(function () {
            if (_this['borders']() && _this['borders']() !== 'None') {
                return _this['borderWidth']();
            }
            else {
                return 0;
            }
        });
        _this._disposables.push(borderWidth);
        var textSizeHelper = new _textElementSizeHelper_1.TextElementSizeHelper();
        _this.autoCellSide = ko.observable(_this.cellHeight());
        _this._disposables.push(ko.computed(function () {
            if (_this.sizeMode() !== 'Custom') {
                var characterHeight = textSizeHelper.getTextContainerSize('a', {
                    'font-size': fontModel.size() + fontModel.unit(),
                    'font-family': fontModel.family(),
                    'height': 'auto',
                    'width': 'auto'
                }, 0).height;
                var side = characterHeight * 1.5 + 2 * borderWidth();
                if (_this.parentModel()) {
                    side = analytics_internal_1.pixelToUnits(side, _this.parentModel().root['measureUnit'](), 1);
                }
                _this.autoCellSide(side);
            }
        }));
        return _this;
    }
    XRCharacterComb.prototype.isPropertyDisabled = function (name) {
        if (name === 'cellWidth') {
            return this.sizeMode() === 'AutoSize' || this.sizeMode() === 'AutoWidth';
        }
        if (name === 'cellHeight') {
            return this.sizeMode() === 'AutoSize' || this.sizeMode() === 'AutoHeight';
        }
        return _super.prototype.isPropertyDisabled.call(this, name);
    };
    XRCharacterComb.prototype._createCellSideFromOriginalSide = function (originalCellSide, isHeight) {
        var _this = this;
        return ko.pureComputed({
            read: function () {
                switch (_this.sizeMode()) {
                    case 'AutoSize':
                        return null;
                    case 'AutoWidth':
                        return isHeight ? originalCellSide() : null;
                    case 'AutoHeight':
                        return !isHeight ? originalCellSide() : null;
                    case 'Custom':
                        return originalCellSide();
                }
            },
            write: function (val) { originalCellSide(val); }
        });
    };
    XRCharacterComb.prototype.roundSize = function () {
        this.size.width(Math.ceil(this.size.width()));
        this.size.height(Math.ceil(this.size.height()));
    };
    XRCharacterComb.unitProperties = [].concat(['cellWidth', 'cellHeight', 'verticalSpacing', 'horizontalSpacing'], xrReportelement_1.XRReportElementViewModel.unitProperties);
    return XRCharacterComb;
}(xrControl_1.XRControlViewModel));
exports.XRCharacterComb = XRCharacterComb;
var XRCharacterCombSurface = (function (_super) {
    __extends(XRCharacterCombSurface, _super);
    function XRCharacterCombSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.cells = ko.observableArray([]);
        _this._disposables.push(_this.borderWidth = ko.computed(function () {
            return control['borderWidth']() === undefined ? 1 : control['borderWidth']();
        }));
        _this.rtl = function () { return control.rtl(); };
        _this.borders = control['borders'];
        _this.template = 'dxrd-charactercomb';
        _this.contenttemplate = 'dxrd-charactercomb-content';
        _this._disposables.push(control.textAlignment.subscribe(function (newVal) {
            _this._updateCellsText(newVal);
        }));
        _this._disposables.push(_this.verticalSpacing = ko.computed(function () {
            return analytics_internal_1.unitsToPixel(control.verticalSpacing(), context.measureUnit(), 1);
        }));
        _this._disposables.push(_this.horizontalSpacing = ko.computed(function () {
            return analytics_internal_1.unitsToPixel(control.horizontalSpacing(), context.measureUnit(), 1);
        }));
        _this.cellSize = {
            width: ko.computed(function () {
                return analytics_internal_1.unitsToPixel(control.cellWidth() || control.autoCellSide(), context.measureUnit(), 1);
            }),
            height: ko.computed(function () {
                return analytics_internal_1.unitsToPixel(control.cellHeight() || control.autoCellSide(), context.measureUnit(), 1);
            }),
            isPropertyDisabled: function (name) { return false; }
        };
        _this._disposables.push(_this.cellSize.width);
        _this._disposables.push(_this.cellSize.height);
        _this._disposables.push(_this.fullCellHeight = ko.computed(function () {
            var _verticalSpacing = _this.verticalSpacing();
            var fullCellHeight = _this.cellSize.height();
            if (!!_this.verticalSpacing()) {
                fullCellHeight += _this.verticalSpacing();
            }
            return fullCellHeight - _this._getBorderWidthBySpacing(_verticalSpacing);
        }));
        _this._disposables.push(_this.fullCellWidth = ko.computed(function () {
            var _horizontalSpacing = _this.horizontalSpacing.peek();
            var fullCellWidth = _this.cellSize.width();
            if (!!_this.horizontalSpacing()) {
                fullCellWidth += _this.horizontalSpacing();
            }
            return fullCellWidth - _this._getBorderWidthBySpacing(_horizontalSpacing);
        }));
        _this._disposables.push(_this.vertical = ko.computed(function () {
            var _borderWidth = _this._getBorderWidthBySpacing(_this.verticalSpacing()) * context.zoom();
            var fullCellHeight = _this.fullCellHeight() * context.zoom();
            var vertical = Math.floor(analytics_internal_1.roundingXDecimals((_this.rect().height - _borderWidth) / fullCellHeight));
            if (analytics_internal_1.roundingXDecimals(_this.rect().height - (vertical * fullCellHeight + _borderWidth)) >= analytics_internal_1.roundingXDecimals(_this.cellSize.height() * context.zoom() - _borderWidth)) {
                vertical += 1;
            }
            return vertical;
        }));
        _this._disposables.push(_this.horizontal = ko.computed(function () {
            var _borderWidth = _this._getBorderWidthBySpacing(_this.horizontalSpacing()) * context.zoom();
            var fullCellWidth = _this.fullCellWidth() * context.zoom();
            var horizontal = Math.floor(analytics_internal_1.roundingXDecimals((_this.rect().width - _borderWidth) / fullCellWidth));
            if (analytics_internal_1.roundingXDecimals(_this.rect().width - (horizontal * fullCellWidth + _borderWidth)) >= analytics_internal_1.roundingXDecimals(_this.cellSize.width() * context.zoom() - _borderWidth)) {
                horizontal += 1;
            }
            return horizontal;
        }));
        _this._disposables.push(_this.topEmptySpace = ko.computed(function () {
            var _verticalSpacing = _this.verticalSpacing();
            var _borderWidth = _this._getBorderWidthBySpacing(_verticalSpacing);
            var _emptySpace = _this.rect().height / context.zoom() - (_this.fullCellHeight() * _this.vertical() - _verticalSpacing + _borderWidth);
            return _charactercombHelper_1.CharacterCombHelper.distributionEmptySpace(_emptySpace, true, _this.getControlModel().textAlignment());
        }));
        _this._disposables.push(_this.leftEmptySpace = ko.computed(function () {
            var _horizontalSpacing = _this.horizontalSpacing();
            var _borderWidth = _this._getBorderWidthBySpacing(_horizontalSpacing);
            var _emptySpace = _this.rect().width / context.zoom() - (_this.fullCellWidth() * _this.horizontal() - _horizontalSpacing + _borderWidth);
            return _charactercombHelper_1.CharacterCombHelper.distributionEmptySpace(_emptySpace, false, _this.getControlModel().textAlignment());
        }));
        _this._disposables.push(_this.css = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.foreColorCss(), _this.cssCalculator.backGroundCss());
        }));
        _this._disposables.push(_this.borderCss = ko.pureComputed(function () {
            return _this.cssCalculator.borderCss();
        }));
        _this._disposables.push(ko.computed(function () {
            _this.updateArray(_this.vertical() * _this.horizontal());
            _this._updateCellsText(control.textAlignment.peek());
        }));
        _this._disposables.push(control.text.subscribe(function (newVal) {
            _this._updateCellsText(control.textAlignment.peek());
        }));
        return _this;
    }
    XRCharacterCombSurface.prototype._createCell = function (text, position) {
        var _this = this;
        return {
            text: ko.observable(text),
            left: ko.computed(function () {
                var _horizontalSpacing = _this.horizontalSpacing();
                var borderWidth = _this._getBorderWidthBySpacing(_horizontalSpacing);
                var line = Math.floor((position) / _this.horizontal());
                var column = position - (_this.horizontal() * line);
                if (_this.rtl()) {
                    column = (_this.horizontal() * (line + 1)) - (position + 1);
                }
                return column * (_this.cellSize.width() + _horizontalSpacing - borderWidth) + _this.leftEmptySpace();
            }),
            top: ko.computed(function () {
                var _verticalSpacing = _this.verticalSpacing();
                var borderWidth = _this._getBorderWidthBySpacing(_verticalSpacing);
                var line = Math.floor((position) / _this.horizontal());
                return line * (_this.cellSize.height() + _verticalSpacing - borderWidth) + _this.topEmptySpace();
            }),
            size: this.cellSize,
            isEmpty: false
        };
    };
    XRCharacterCombSurface.prototype._updateCellsText = function (textAlignment) {
        var _this = this;
        var alignments = _charactercombHelper_1.CharacterCombHelper.getAlignments(textAlignment);
        var texts = _charactercombHelper_1.CharacterCombHelper.getLines(this.displayText(), this.horizontal.peek(), this._control.multiline(), this._control['wordWrap'] && this._control['wordWrap']());
        _charactercombHelper_1.CharacterCombHelper.setText(texts, this.cells.peek(), function (texts, position) {
            return _charactercombHelper_1.CharacterCombHelper.getTextOffset(texts, position, alignments.vertical, alignments.horizontal, _this.vertical.peek(), _this.horizontal.peek());
        });
    };
    XRCharacterCombSurface.prototype._getBorderWidthBySpacing = function (spacing) {
        return (!spacing && this.borders() && this.borders() !== 'None') ? this.borderWidth() : 0;
    };
    XRCharacterCombSurface.prototype._applyBounds = function (newRect, newHorizontal, newVertical, multiline, wordwrap) {
        if (newVertical <= this.vertical()) {
            var notEmptyCells = this.cells().filter(function (cell) { return !cell.isEmpty; });
            var cellLefts = notEmptyCells.map(function (cell) { return cell.left(); });
            newRect.top += notEmptyCells[0].top();
            if (newHorizontal <= this.horizontal())
                newRect.left += Math.min.apply(Math, cellLefts);
        }
        else if (newHorizontal <= this.horizontal()) {
            var newCells = [];
            this.updateArray(newVertical * newHorizontal, newCells);
            var alignments = _charactercombHelper_1.CharacterCombHelper.getAlignments(this.getControlModel()['textAlignment']());
            var texts = _charactercombHelper_1.CharacterCombHelper.getLines(this.displayText(), newHorizontal, multiline, wordwrap);
            _charactercombHelper_1.CharacterCombHelper.setText(texts, newCells, function (texts, position) {
                return _charactercombHelper_1.CharacterCombHelper.getTextOffset(texts, position, alignments.vertical, alignments.horizontal, newVertical, newHorizontal);
            });
            var newCellsLefts = newCells.filter(function (cell) { return !cell.isEmpty; }).map(function (cell) { return cell.left(); });
            newRect.left += Math.min.apply(Math, newCellsLefts);
        }
        newRect.height = (this.cellSize.height() + this.verticalSpacing()) * newVertical - this.verticalSpacing() - analytics_internal_1.unitsToPixel(this._getBorderWidthBySpacing(this.verticalSpacing()) * (newVertical - 1), this._context.measureUnit(), 1);
        newRect.width = (this.cellSize.width() + this.horizontalSpacing()) * newHorizontal - this.horizontalSpacing() - analytics_internal_1.unitsToPixel(this._getBorderWidthBySpacing(this.horizontalSpacing()) * (newHorizontal - 1), this._context.measureUnit(), 1);
    };
    XRCharacterCombSurface.prototype.updateArray = function (cellsCount, array) {
        var cells = array || this.cells.peek();
        if (cells.length > cellsCount) {
            cells.splice(cellsCount, cells.length - cellsCount);
        }
        else if (cells.length < cellsCount) {
            for (var i = cells.length; i < cellsCount; i++) {
                cells.push(this._createCell('', i));
            }
        }
        if (!array)
            this.cells.valueHasMutated();
    };
    XRCharacterCombSurface.prototype.fitBoundsToText = function () {
        var _multiline = this._control['multiline'] && this._control['multiline']();
        var _wordwrap = this._control['wordWrap'] && this._control['wordWrap']();
        var zoom = this._context.zoom();
        var oldRect = this.rect();
        var newRect = {};
        Object.keys(oldRect).forEach(function (propertyName) {
            newRect[propertyName] = oldRect[propertyName] / zoom;
        });
        var newHorizVert = _charactercombHelper_1.CharacterCombHelper.getHorizontalVerticalByText(_multiline, _wordwrap, this.displayText(), this.horizontal() || 1, this.vertical() || 1);
        this._applyBounds(newRect, newHorizVert.horizontal, newHorizVert.vertical, _multiline, _wordwrap);
        if (newRect.top !== oldRect.top || newRect.height !== oldRect.height || newRect.left !== oldRect.left || newRect.width !== oldRect.width) {
            this.rect({ top: Math.round(newRect.top * zoom), height: newRect.height * zoom, left: Math.round(newRect.left * zoom), width: newRect.width * zoom });
            this.getControlModel().roundSize();
        }
    };
    XRCharacterCombSurface.prototype.getText = function () {
        return this.displayText();
    };
    return XRCharacterCombSurface;
}(xrControl_1.XRControlSurface));
exports.XRCharacterCombSurface = XRCharacterCombSurface;
