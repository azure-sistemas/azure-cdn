﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_ruler.js)
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
var RulerViewModel = (function (_super) {
    __extends(RulerViewModel, _super);
    function RulerViewModel(options) {
        var _this = _super.call(this) || this;
        _this.height = ko.observable(0);
        _this.width = ko.observable(0);
        _this.gridLines = ko.observableArray();
        _this.majorGridLines = ko.observableArray();
        _this.disable = null;
        _this.defaultGridLinesCoordinate = ko.observable();
        _this._disposables.push(ko.computed(function () {
            var gridSize = analytics_internal_1.unitsToPixel(25, options.units(), options.zoom());
            _this.defaultGridLinesCoordinate({ x: 4, x1: '80%', x2: '100%', majorX1: '70%', majorX2: '100%' });
            var flip = !!ko.unwrap(options.flip);
            if (options.direction === 'vertical') {
                _this.height(options.length() + 0.5);
                _this.width(20);
                if (flip) {
                    flip = false;
                    _this.defaultGridLinesCoordinate({ x: 11, x1: '20%', x2: '0%', majorX1: '30%', majorX2: '0%' });
                }
            }
            else {
                _this.width(options.length() + 0.5);
                _this.height(20);
            }
            _this._initGrid(options.length(), gridSize, _this.gridLines, flip);
            _this._initGrid(options.length(), 4 * gridSize, _this.majorGridLines, flip);
        }));
        _this.disable = options.disable;
        return _this;
    }
    RulerViewModel.prototype._initGrid = function (length, gridSize, gridLines, flip) {
        if (flip === void 0) { flip = false; }
        var arrayLength = Math.round(length / gridSize) + 1, currentLength = gridLines.peek().length, diff = arrayLength - currentLength;
        if (diff > 0) {
            for (var index = 0; index < diff; index++) {
                gridLines.push({ coordVal: ko.observable(0), text: ko.observable(0), visible: ko.observable(false) });
            }
        }
        if (flip) {
            for (var index = 0, coordVal = length; index < gridLines.peek().length; index++, coordVal -= gridSize) {
                gridLines.peek()[index].coordVal(coordVal - 0.5);
                gridLines.peek()[index].text(index);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
        else {
            for (var index = 0, coordVal = 0; index < gridLines.peek().length; coordVal += gridSize, index++) {
                gridLines.peek()[index].coordVal(coordVal + 0.5);
                gridLines.peek()[index].text(index);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
    };
    return RulerViewModel;
}(analytics_utils_1.Disposable));
exports.RulerViewModel = RulerViewModel;
ko.bindingHandlers['ruler'] = {
    init: function (element, valueAccessor) {
        $(element).children().remove();
        var values = valueAccessor(), options_ = $.extend({}, ko.unwrap(values), {}), zoom = options_.zoom, options = {
            length: options_.length,
            units: options_.units,
            direction: options_.direction || '',
            zoom: zoom,
            flip: options_.flip,
            disable: options_.disable
        }, rulerViewModel = new RulerViewModel(options), templateHtml = analytics_widgets_1.getTemplate('dxrd-ruler' + options.direction), $element = $(element).append(templateHtml);
        ko.applyBindings(rulerViewModel, $element.children()[0]);
        analytics_internal_1.addDisposeCallback($element.children()[0], function () {
            rulerViewModel.dispose();
            rulerViewModel.gridLines(null);
            rulerViewModel.majorGridLines(null);
        });
        return { controlsDescendantBindings: true };
    }
};
