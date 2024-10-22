﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailReportBand.js)
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
var xrBand_1 = require("./xrBand");
var xrVerticalBand_1 = require("./xrVerticalBand");
var _bandUtils_1 = require("./_bandUtils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var bandSurfaceCollapsedHeight_1 = require("./bandSurfaceCollapsedHeight");
var xrSubband_1 = require("./xrSubband");
var _parameterUtils_1 = require("../dataObjects/metadata/_parameterUtils");
var _bandContainerUtils_1 = require("./_bandContainerUtils");
var DetailReportBand = (function (_super) {
    __extends(DetailReportBand, _super);
    function DetailReportBand(band, parent, serializer) {
        var _this = _super.call(this, band, parent, serializer) || this;
        _this._disposables.push(_this.dataSource.subscribe(function (newVal) {
            if (!newVal) {
                _this.dataMember(null);
            }
        }));
        var dataMember = ko.pureComputed(function () {
            return analytics_internal_1.getFullPath(_this.getPath('dataMember'), _this.dataMember());
        });
        var disabled = ko.pureComputed(function () { return !_this.dataSource(); });
        _this.filterString = new analytics_widgets_1.FilterStringOptions(_this._filterString, dataMember, disabled);
        _this._disposables.push(dataMember);
        _this._disposables.push(disabled);
        _this.filterString.helper.parameters = ko.computed(function () {
            return _parameterUtils_1.collectAvailableParameters(_this.root['parameters']());
        });
        _this._disposables.push(_this.filterString.helper.parameters);
        return _this;
    }
    DetailReportBand.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.bands);
        this.resetObservableArray(this.bands);
    };
    DetailReportBand.prototype.initHeight = function () {
        var _this = this;
        var oldHeight = 0;
        this._disposables.push(this.height = ko.pureComputed({
            read: function () {
                if (analytics_internal_1.checkModelReady(_this.root)) {
                    var verticalBand = _this.bands().filter(function (x) { return x instanceof xrVerticalBand_1.VerticalBandViewModel; })[0];
                    var height = 0;
                    if (verticalBand)
                        height = verticalBand.height();
                    oldHeight = _this.bands().filter(function (x) { return !(x instanceof xrVerticalBand_1.VerticalBandViewModel); }).reduce(function (sum, b) { return sum + b.height(); }, height);
                }
                return oldHeight;
            },
            write: function (newHeight) {
                if (analytics_internal_1.checkModelReady(_this.root)) {
                    var deltaHeight = newHeight - _this.height.peek(), oldHeight = _this.bands()[_this.bands().length - 1].height.peek();
                    _this.bands()[_this.bands().length - 1].height(oldHeight + deltaHeight);
                }
            }
        }));
    };
    DetailReportBand.prototype.createChildsArray = function (band, serializer) {
        var _this = this;
        var factory = this.getControlFactory();
        this.bands = analytics_internal_1.deserializeChildArray(band.Bands, this, function (item) {
            return new (factory.controlsMap[item['@ControlType']].type || xrBand_1.BandViewModel)(item, _this, serializer);
        });
        var bands = this.bands.peek();
        if (bands) {
            _bandUtils_1.initLevels(bands);
            bands.sort(_bandUtils_1.sortBands);
        }
        if (this.bands().length === 0)
            this.createChild({ '@ControlType': 'DetailBand', '@HeightF': this.height() });
    };
    DetailReportBand.prototype.addChild = function (control) {
        if (control instanceof xrBand_1.BandViewModel && !(control instanceof xrSubband_1.SubBandViewModel)) {
            _bandContainerUtils_1.addBandToContainer(this, control);
        }
    };
    return DetailReportBand;
}(xrBand_1.BandViewModel));
exports.DetailReportBand = DetailReportBand;
var DetailReportBandSurface = (function (_super) {
    __extends(DetailReportBandSurface, _super);
    function DetailReportBandSurface(band, context) {
        var _this = _super.call(this, band, context, {
            _height: function (o) { return o.height; }
        }) || this;
        _this.templateName = 'dxrd-detailreportband';
        _this.selectionTemplate = 'dxrd-detailreportband-selection';
        _this.leftMarginTemplate = 'dxrd-detail-report-band-coordinate-grid';
        _this._disposables.push(ko.computed(function () {
            var isSomeParentCollapsed = _this.collapsed() || _this.isSomeParentCollapsed();
            _this.bandsHolder.bands().forEach(function (band) {
                band.isSomeParentCollapsed(isSomeParentCollapsed);
            });
        }));
        return _this;
    }
    DetailReportBandSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    DetailReportBandSurface.prototype.getChildrenCollection = function () {
        return this.bandsHolder.bands;
    };
    DetailReportBandSurface.prototype.createUnderCursor = function () {
        var _this = this;
        var _underCursor = ko.observable(new analytics_internal_1.HoverInfo());
        this._disposables.push(this.underCursor = ko.pureComputed({
            read: function () {
                _underCursor().isOver = _this.bandsHolder.checkUnderCursor();
                return _underCursor();
            },
            write: function (val) { _underCursor(val); }
        }));
    };
    DetailReportBandSurface.prototype.getTotalHeight = function () {
        return this.bandsHolder.getTotalHeight();
    };
    DetailReportBandSurface.prototype.getHeight = function () {
        if (this.collapsed()) {
            return bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight;
        }
        else {
            return this.bandsHolder.getHeight();
        }
    };
    DetailReportBandSurface.prototype.getHasOwnRuler = function () {
        return this.collapsed();
    };
    return DetailReportBandSurface;
}(xrBand_1.BandSurface));
exports.DetailReportBandSurface = DetailReportBandSurface;
