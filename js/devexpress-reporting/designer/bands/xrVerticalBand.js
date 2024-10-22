﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalBand.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var xrBand_1 = require("./xrBand");
var VerticalBandViewModel = (function (_super) {
    __extends(VerticalBandViewModel, _super);
    function VerticalBandViewModel(band, parent, serializer) {
        var _this = _super.call(this, band, parent, serializer) || this;
        _this.preInit(band, parent, serializer);
        var _widthFromControls = 0;
        _this._disposables.push(_this.widthFromControls = ko.pureComputed(function () {
            _widthFromControls = 0;
            if (analytics_internal_1.checkModelReady(_this.root)) {
                _widthFromControls = _this.controls().length > 0 ? Math.max.apply(Math, _this.controls().filter(function (x) { return !x.update(); }).map(function (x) { return x.location.x() + x.size.width(); })) : 1;
                _widthFromControls = analytics_internal_1.roundingXDecimals(_widthFromControls);
                _this.width(Math.max(_widthFromControls, _this.width()));
                _widthFromControls = _widthFromControls > 0 ? _widthFromControls : 0;
            }
            return _widthFromControls;
        }));
        _this._disposables.push(_this.height.subscribe(function (newValue) {
            if (_this.update())
                return;
            var verticalBands = _this.parentModel() && (_this.parentModel()['bands']() || []).filter(function (x) { return x instanceof VerticalBandViewModel; });
            var minValue = Math.max.apply(Math, verticalBands.map(function (x) { return x.heightFromControls(); }));
            if (newValue < minValue)
                newValue = minValue;
            verticalBands.forEach(function (x) {
                x.update(true);
                x.height(newValue);
                x.update(false);
            });
        }));
        return _this;
    }
    VerticalBandViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    };
    VerticalBandViewModel.prototype.initSize = function () {
        this.size.height = this.height;
        this.size.width = this.width;
    };
    VerticalBandViewModel.prototype.preInit = function (band, parent, serializer) {
    };
    VerticalBandViewModel.unitProperties = [].concat(['width'], xrBand_1.BandViewModel.unitProperties);
    return VerticalBandViewModel;
}(xrBand_1.BandViewModel));
exports.VerticalBandViewModel = VerticalBandViewModel;
var VerticalBandSurface = (function (_super) {
    __extends(VerticalBandSurface, _super);
    function VerticalBandSurface(band, context, unitProperties) {
        if (unitProperties === void 0) { unitProperties = VerticalBandSurface._unitProperties; }
        var _this = _super.call(this, band, context, unitProperties) || this;
        _this.isSomeParentCollapsed = ko.observable(false);
        _this._resize = function (delta, oldDelta) {
            var width = Math.max(_this._width() + delta - oldDelta, _this.minimumWidth());
            _this._width(width);
            return delta;
        };
        _this.resizeHandles = ko.computed(function () {
            return _this.rtlLayout() ? 'w' : 'e';
        });
        _this.templateName = 'dxrd-vertical-band';
        _this.selectiontemplate = 'dxrd-vertical-band-selection';
        _this.contentSelectionTemplate = 'dxrd-vertical-band-selection-content';
        _this._disposables.push(_this.collapsed = ko.pureComputed({
            read: function () {
                return !band.expanded();
            },
            write: function (newVal) {
                band.expanded(!newVal);
            }
        }));
        _this.coordinateGridOptions = {
            height: band.height,
            snapGridSize: band.root.snapGridSize,
            width: band.width,
            zoom: context.zoom,
            measureUnit: context.measureUnit,
            flip: context.rtl
        };
        _this.name = band.name;
        _this.height = ko.pureComputed(function () {
            if (_this.collapsed())
                return bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight;
            return _this._height() + VerticalBandSurface.markerHeight;
        });
        _this._disposables.push(_this.backgroundRect = ko.pureComputed(function () {
            var top = _this.verticalBandsContainer._getTopOffset();
            return {
                top: top,
                left: _this.absolutePosition.x(),
                height: _this._height(),
                width: _this._width()
            };
        }));
        var oldDelta = 0;
        _this['resize'] = function (params) {
            if (_this.rtlLayout() && params.delta.dx) {
                oldDelta = _this._resize(-1 * params.delta.dx, oldDelta);
            }
            else if (params.delta.dh) {
                oldDelta = _this.verticalBandsContainer['_resize'](params.delta.dh, oldDelta);
            }
            else {
                oldDelta = _this._resize(params.delta.dw, oldDelta);
            }
        };
        _this['stopResize'] = function () {
            oldDelta = 0;
        };
        _this._disposables.push(_this.canResize = ko.computed(function () {
            return _this.selected() && !_this.locked && !analytics_internal_1.DragDropHandler.started();
        }));
        _this.getUsefulRect = function () {
            return {
                top: 0,
                left: 0,
                right: _this._width(),
                bottom: _this._height(),
                width: _this._width(),
                height: _this._height()
            };
        };
        var x = _this.underCursor().x;
        var self = _this;
        var createCursor = function (newCursor) {
            var cursor = $.extend(true, {}, newCursor);
            delete cursor.x;
            Object.defineProperty(cursor, 'x', {
                get: function () {
                    return x;
                },
                set: function (newVal) {
                    x = newVal + self.verticalBandsContainer.scrollOffset();
                },
                configurable: true
            });
            return cursor;
        };
        var underCursor = createCursor(_this.underCursor());
        _this.underCursor = (function (newVal) {
            if (!newVal)
                return underCursor;
            x = newVal.x;
            underCursor = createCursor(newVal);
        });
        _this._disposables.push(_this.resizeHandles);
        return _this;
    }
    VerticalBandSurface.prototype._getRtlAbsolutePositionX = function (bandIndex, bands) {
        var allBandsWidth = this.verticalBandsContainer.getBandsWidth(bands);
        if (bandIndex !== 0) {
            return bands[bandIndex - 1].absolutePosition.x() - bands[bandIndex]._width();
        }
        else if (allBandsWidth > this.verticalBandsContainer.width()) {
            return bands.reduce(function (acc, band, index) { return acc += (index === 0 ? 0 : band._width()); }, 0);
        }
        else {
            return this.verticalBandsContainer.width() - bands[bandIndex]._width();
        }
    };
    VerticalBandSurface.prototype._getUnitPositionInParent = function () {
        var neighbors = this._control.parentModel().bands();
        var position = neighbors
            .slice(0, neighbors.indexOf(this._control))
            .reduce(function (previousValue, currentBand) {
            if (currentBand instanceof VerticalBandViewModel)
                previousValue.x += currentBand.size.width();
            else
                previousValue.y += currentBand.size.height();
            return previousValue;
        }, { x: 0, y: 0 });
        return new analytics_elements_1.Point(position.x, position.y);
    };
    Object.defineProperty(VerticalBandSurface.prototype, "_unitAbsoluteRect", {
        get: function () {
            var _this = this;
            return _bandUtils_1._getUnitAbsoluteRect(this, function () { return _this._getUnitPositionInParent(); });
        },
        enumerable: true,
        configurable: true
    });
    VerticalBandSurface.prototype.getAbsolutePositionX = function () {
        var newX = 0;
        var bandIndex;
        var parentBands = ko.unwrap(this.verticalBandsContainer.verticalBands);
        if (parentBands && parentBands.length !== 0) {
            bandIndex = parentBands.indexOf(this);
            if (bandIndex === -1)
                return 0;
            if (this.rtlLayout()) {
                newX = this._getRtlAbsolutePositionX(bandIndex, parentBands);
            }
            else if (bandIndex > 0 && parentBands[bandIndex - 1])
                newX = parentBands[bandIndex - 1].absolutePosition.x() + parentBands[bandIndex - 1]._width();
        }
        return newX;
    };
    VerticalBandSurface.prototype.updateAbsolutePosition = function () {
        if (!this.parent)
            return;
        this.absolutePosition.x(this.getAbsolutePositionX());
        this.absolutePosition.y(this.verticalBandsContainer.topOffset() + VerticalBandSurface.markerHeight);
    };
    VerticalBandSurface.prototype.minimumHeight = function () {
        return this.verticalBandsContainer.minHeight && this.verticalBandsContainer.minHeight();
    };
    VerticalBandSurface.prototype.minimumWidth = function () {
        return this.widthFromControls && this.widthFromControls();
    };
    Object.defineProperty(VerticalBandSurface.prototype, "verticalBandsContainer", {
        get: function () {
            return this.parent.bandsHolder.verticalBandsContainer;
        },
        enumerable: true,
        configurable: true
    });
    VerticalBandSurface.markerHeight = 29;
    VerticalBandSurface._unitProperties = {
        _width: function (x) { return x.width; },
        _height: function (x) { return x.height; },
        heightFromControls: function (o) { return o.heightFromControls; },
        widthFromControls: function (o) { return o.widthFromControls; }
    };
    return VerticalBandSurface;
}(analytics_elements_1.SurfaceElementBase));
exports.VerticalBandSurface = VerticalBandSurface;
var bandSurfaceCollapsedHeight_1 = require("./bandSurfaceCollapsedHeight");
var _bandUtils_1 = require("./_bandUtils");
