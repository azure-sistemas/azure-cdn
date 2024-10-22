﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_vericalBandContainer.js)
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
var xrDetailReportBand_1 = require("./xrDetailReportBand");
var xrVerticalBand_1 = require("./xrVerticalBand");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var bandSurfaceCollapsedHeight_1 = require("./bandSurfaceCollapsedHeight");
var VerticalBandsContainerSurface = (function (_super) {
    __extends(VerticalBandsContainerSurface, _super);
    function VerticalBandsContainerSurface(_parent) {
        var _this = _super.call(this) || this;
        _this._parent = _parent;
        _this.markerWidth = ko.observable(bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight);
        _this.name = 'Vertical Bands';
        _this.bandOffset = 29;
        _this.templateName = 'dxrd-vertical-bands-container';
        _this.selectionTemplate = 'dxrd-vertical-bands-container-selection';
        _this.vrulerTemplate = 'dxrd-vertical-bands-container-vruler';
        _this.leftMarginTemplate = 'dxrd-vertical-bands-leftMargin';
        _this.leftMarginSelectionTemplate = 'dxrd-vertical-bands-leftMargin-selection';
        _this.verticalBands = ko.observableArray();
        _this.scrollOffset = ko.observable(0);
        _this._disposables.push(_this.bandPosition = ko.computed(function () {
            return _this.getBandPosition();
        }), _this.topOffset = ko.computed(function () {
            var offset = 0;
            if (_this.bandPosition() > 0) {
                var prevBand = _this._parent.bandsHolder.bands()[_this.bandPosition() - 1];
                if (prevBand) {
                    return prevBand.absolutePosition.y() + prevBand.height();
                }
            }
            if (_this._parent instanceof xrDetailReportBand_1.DetailReportBandSurface) {
                return _this._parent['absolutePosition'].y();
            }
            else
                return 0;
        }), _this.collapsed = ko.computed({
            read: function () { return _this.verticalBands().some(function (x) { return x.collapsed(); }); },
            write: function (newVal) { return _this.verticalBands().forEach(function (x) { return x.collapsed(newVal); }); }
        }), _this.selected = ko.computed(function () {
            return _this.verticalBands().some(function (x) { return x.selected(); });
        }), _this.canResize = ko.computed(function () {
            return _this.selected() && !_this.isLocked() && !_this.collapsed() && !analytics_internal_1.DragDropHandler.started();
        }), _this.width = ko.computed(function () { return _parent._context.pageWidth() - _parent._context.margins.left() - (!_this.collapsed() ? _parent._context.margins.right() : 0); }), _this.leftMargin = ko.pureComputed(function () { return 0 - (_parent._context.margins && _parent._context.margins.left() || 0) + 10; }), _this.height = ko.computed({
            read: function () {
                return _this.verticalBands()[0] && _this.verticalBands()[0].height() || 0;
            },
            write: function (newVal) { return _this.verticalBands().forEach((function (x) { return x._height(newVal - xrVerticalBand_1.VerticalBandSurface.markerHeight); })); }
        }), _this._height = ko.computed(function () { return _this.verticalBands()[0] && _this.verticalBands()[0]._height() || 0; }), _this.focused = ko.computed(function () {
            return _this.verticalBands().some(function (x) { return x.focused(); });
        }), _this.leftOffset = ko.computed(function () { return _parent.rtlLayout() ? _parent._context.margins.right() : 0; }), _this.grayAreaWidth = ko.computed(function () {
            return Math.max(0, _this.width() - _this.getBandsWidth(_this.verticalBands()));
        }), _this.grayAreaLeft = ko.computed(function () {
            var bands = _this.verticalBands();
            if (!bands.length)
                return 0;
            var band = bands[bands.length - 1];
            return band.absolutePosition.x() + band._width();
        }), _this.minHeight = ko.pureComputed(function () {
            return Math.max.apply(Math, _this.verticalBands().map(function (x) { return (x.heightFromControls && x.heightFromControls()) || 1; })) + xrVerticalBand_1.VerticalBandSurface.markerHeight;
        }), _this.locked = ko.computed(function () { return _this.isLocked(); }));
        var oldDelta = 0;
        _this['_resize'] = function (delta, oldDelta) {
            var firstBand = _this.verticalBands()[0];
            firstBand._height(firstBand._height() + delta - oldDelta);
            return delta;
        };
        _this['resize'] = function (params) {
            oldDelta = _this['_resize'](params.delta.dh, oldDelta);
        };
        _this['stopResize'] = function () {
            oldDelta = 0;
        };
        return _this;
    }
    VerticalBandsContainerSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.verticalBands);
        this.resetObservableArray(this.verticalBands);
    };
    VerticalBandsContainerSurface.prototype.getBandPosition = function () {
        if (this.visible)
            return this._parent.getControlModel().bands().indexOf(this.verticalBands()[0]._control);
        return -1;
    };
    VerticalBandsContainerSurface.prototype.isLocked = function () {
        return this.verticalBands().some(function (x) { return x.locked; });
    };
    VerticalBandsContainerSurface.prototype.createScrollViewOptions = function (target, selection) {
        return {
            direction: 'horizontal',
            showScrollbar: 'always',
            useNative: false,
            scrollByContent: false,
            scrollByThumb: true,
            onStart: function () {
                selection['disabled'](true);
            },
            onScroll: function (e) {
                target.scrollOffset(e.scrollOffset.left);
            },
            onEnd: function () {
                selection['disabled'](false);
            }
        };
    };
    VerticalBandsContainerSurface.prototype.markerClick = function (selection) {
        if (selection.expectClick) {
            selection.expectClick = false;
            return;
        }
        if (!this.focused() && !selection.disabled()) {
            selection.initialize(this.verticalBands()[0]);
        }
        else {
            this.collapsed(!this.collapsed());
        }
    };
    VerticalBandsContainerSurface.prototype.getBandsWidth = function (bands) {
        return bands.reduce(function (acc, band, index) { return acc += band._width(); }, 0);
    };
    VerticalBandsContainerSurface.prototype._getTopOffset = function () {
        var top = 0;
        if (this._parent instanceof xrDetailReportBand_1.DetailReportBandSurface) {
            top = this._parent['backgroundRect']().top;
        }
        if (this.bandPosition() > 0) {
            for (var i = 0; i < this.bandPosition(); i++) {
                top += this._parent.bandsHolder.bands()[i]._totalHeight();
            }
        }
        return top;
    };
    Object.defineProperty(VerticalBandsContainerSurface.prototype, "visible", {
        get: function () {
            return this.verticalBands().length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalBandsContainerSurface.prototype, "zoom", {
        get: function () { return this._parent.zoom; },
        enumerable: true,
        configurable: true
    });
    return VerticalBandsContainerSurface;
}(analytics_utils_1.Disposable));
exports.VerticalBandsContainerSurface = VerticalBandsContainerSurface;
