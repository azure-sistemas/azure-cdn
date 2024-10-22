﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_coordinateGrid.js)
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
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var CoordinateGridViewModel = (function (_super) {
    __extends(CoordinateGridViewModel, _super);
    function CoordinateGridViewModel(options) {
        var _this = _super.call(this) || this;
        _this.width = ko.observable(0);
        _this.height = ko.observable(0);
        _this.verticalGridLines = ko.observableArray().extend({ deferred: true });
        _this.horizontalGridLines = ko.observableArray().extend({ deferred: true });
        _this.majorVerticalGridLines = ko.observableArray().extend({ deferred: true });
        _this.majorHorizontalGridLines = ko.observableArray().extend({ deferred: true });
        _this._disposables.push(ko.computed(function () {
            var flip = !!ko.unwrap(options.flip);
            var gridSize = analytics_internal_1.unitsToPixel(options.snapGridSize(), options.measureUnit(), options.zoom());
            var width = analytics_internal_1.unitsToPixel(options.width(), options.measureUnit(), options.zoom());
            _this.width(width + 0.5);
            _this._initGrid(width, gridSize, _this.verticalGridLines, flip);
            _this._initGrid(width, 4 * gridSize, _this.majorVerticalGridLines, flip);
        }));
        _this._disposables.push(ko.computed(function () {
            var gridSize = analytics_internal_1.unitsToPixel(options.snapGridSize(), options.measureUnit(), options.zoom());
            var height = analytics_internal_1.unitsToPixel(options.height(), options.measureUnit(), options.zoom());
            _this.height(height + 0.5);
            _this._initGrid(height, gridSize, _this.horizontalGridLines);
            _this._initGrid(height, 4 * gridSize, _this.majorHorizontalGridLines);
        }));
        return _this;
    }
    CoordinateGridViewModel.prototype._initGrid = function (length, gridSize, gridLines, flip) {
        if (flip === void 0) { flip = false; }
        var lines = gridLines.peek();
        var arrayLength = Math.ceil(length / gridSize), currentLength = lines.length, diff = arrayLength - currentLength;
        if (diff > 0) {
            for (var index = currentLength; index < arrayLength; index++) {
                gridLines.push({ coordVal: ko.observable((index + 1) * gridSize + 0.5), visible: ko.observable(true) });
            }
        }
        if (flip) {
            for (var index = 0, coordVal = length; index < gridLines.peek().length; index++, coordVal -= gridSize) {
                gridLines.peek()[index].coordVal(coordVal - 0.5);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
        else {
            for (var index = 0, coordVal = 0; index < gridLines.peek().length; coordVal += gridSize, index++) {
                gridLines.peek()[index].coordVal(coordVal + 0.5);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
    };
    ;
    CoordinateGridViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.horizontalGridLines([]);
        this.verticalGridLines([]);
        this.majorHorizontalGridLines([]);
        this.majorVerticalGridLines([]);
    };
    return CoordinateGridViewModel;
}(analytics_utils_1.Disposable));
exports.CoordinateGridViewModel = CoordinateGridViewModel;
ko.bindingHandlers['coordinateGrid'] = {
    init: function (element, valueAccessor) {
        $(element).children().remove();
        var values = valueAccessor(), gridViewModel = new CoordinateGridViewModel(values), templateHtml = analytics_widgets_1.getTemplate('dxrd-coordinategrid'), $element = $(element).append(templateHtml);
        ko.applyBindings(gridViewModel, $element.children()[0]);
        analytics_internal_1.addDisposeCallback($element.children()[0], function () {
            gridViewModel.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
