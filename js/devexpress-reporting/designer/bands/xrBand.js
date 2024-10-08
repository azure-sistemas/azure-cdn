﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrBand.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var xrReportelement_1 = require("../controls/xrReportelement");
var BandViewModel = (function (_super) {
    __extends(BandViewModel, _super);
    function BandViewModel(band, parent, serializer) {
        var _this = _super.call(this, band, parent, serializer) || this;
        _this.preInit(band, parent, serializer);
        _this.createChildsArray(band, serializer);
        _this.initHeight();
        _this.size.height = _this.height;
        if (_this.level) {
            _this._disposables.push(_this.maxLevel = ko.pureComputed(function () { return _this.parentModel().bands().filter(function (x) { return x.controlType === _this.controlType; }).length - 1; }));
            _this._level = ko.observable(_this.level.peek());
            _this._disposables.push(_this.level = ko.pureComputed({
                read: function () { return _this._level(); },
                write: function (newVal) {
                    newVal > _this.maxLevel() && (newVal = _this.maxLevel());
                    var parentModel = _this.parentModel();
                    var parentBands = parentModel.bands;
                    var groupArray = _bandUtils_1.generateArray(parentBands(), _this.controlType, newVal);
                    groupArray.splice(newVal, 0, groupArray.splice(_this._level(), 1)[0]);
                    _this._level(newVal);
                    for (var i = newVal + 1, level = newVal + 1; i < groupArray.length; i++) {
                        groupArray[i] && groupArray[i]._level(level++);
                    }
                    for (var i = newVal - 1, level = newVal - 1; i >= 0; i--) {
                        groupArray[i] && groupArray[i]._level(level--);
                    }
                    parentBands.sort(function (left, right) {
                        if (left.controlType === _this.controlType && right.controlType === _this.controlType) {
                            return _this.controlType === 'GroupHeaderBand' ? right.level() - left.level() : left.level() - right.level();
                        }
                        return 0;
                    });
                }
            }));
        }
        var stylesObject = _createObjectFromInfo_1.createObjectFromInfo(_this, style_1.stylesInfo);
        if (stylesObject) {
            _this[style_1.stylesObj.propertyName] = stylesObject;
        }
        return _this;
    }
    BandViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.bands);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.bands);
        this.resetObservableArray(this.controls);
    };
    BandViewModel.prototype.createChildsArray = function (band, serializer) {
        var _this = this;
        var subBands = [];
        if (band.SubBands) {
            Object.keys(band.SubBands).forEach(function (key) {
                subBands.push(new xrSubband_1.SubBandViewModel(band.SubBands[key], _this, serializer));
            });
        }
        if (subBands) {
            _bandUtils_1.initLevels(subBands);
            subBands.sort(_bandUtils_1.sortBands);
        }
        this.bands = ko.observableArray(subBands);
        this.controls = analytics_internal_1.deserializeChildArray(band.Controls, this, function (control) { return _this.createControl(control, serializer); });
    };
    BandViewModel.prototype.initHeight = function () {
        var _this = this;
        var _heightFromControls = 0;
        this._disposables.push(this.heightFromControls = ko.pureComputed(function () {
            _heightFromControls = 0;
            if (analytics_internal_1.checkModelReady(_this.root)) {
                for (var i = 0; i < _this.controls().length; i++) {
                    if (!_this.controls()[i].update()) {
                        var controlY = _this.controls()[i].anchorVertical && _this.controls()[i].anchorVertical() === 'Bottom' && _this.controls()[i].vertAnchoring.state !== anchoring_1.Anchoring.states.fromControls ? 0 : _this.controls()[i].location.y(), controlHeight = _this.controls()[i].anchorVertical && _this.controls()[i].anchorVertical() === 'Both' && _this.controls()[i].vertAnchoring.state !== anchoring_1.Anchoring.states.fromControls ? 1 : _this.controls()[i].size.height(), controlBottom = controlY + controlHeight;
                        if (controlBottom > _heightFromControls) {
                            _heightFromControls = controlBottom;
                        }
                    }
                }
                _heightFromControls = analytics_internal_1.roundingXDecimals(_heightFromControls);
                _this.height(Math.max(_heightFromControls, _this.height()));
                _heightFromControls = _heightFromControls > 0 ? _heightFromControls : 0;
            }
            return _heightFromControls;
        }));
    };
    BandViewModel.prototype.preInit = function (band, parent, serializer) {
    };
    BandViewModel.prototype.addChild = function (control) {
        if (control instanceof BandViewModel && control.isAllowedParent(this)) {
            _bandUtils_1.insertBand(this.bands, control);
            return;
        }
        if (control.controlType === 'XRTableOfContents' && _tocUtils_1.isHeaderOrFooterBandType(this)) {
            var tocAlreadyExists = !!_tocUtils_1.getExistTableOfContents(this);
            if (tocAlreadyExists) {
                throw new Error('Only one TOC can be added!!!');
            }
        }
        _super.prototype.addChild.call(this, control);
    };
    BandViewModel.prototype.getPath = function (propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this['dataSource']());
        }
        else if (propertyName === 'groupFields') {
            return analytics_internal_1.getFullPath(this.parentModel().getPath('dataMember'), this.parentModel()['dataMember']());
        }
        return _super.prototype.getPath.call(this, propertyName);
    };
    BandViewModel.prototype.initSize = function () {
        var _this = this;
        this.size.height = this.height;
        this._disposables.push(this.size.width = ko.computed({
            read: function () {
                return _this.root.size.width() - (_this.root['margins'] ? ((_this.root['margins'].left && _this.root['margins'].left()) + (_this.root['margins'].right && _this.root['margins'].right())) : 0);
            }, write: function (newVal) { return void 0; }
        }));
        this.size.isPropertyDisabled = function (name) { return name === 'width' || name === 'height' && ko.unwrap(settings_1.controlsFactory().getPropertyInfo('DetailBand', 'height').disabled); };
        this.size.isPropertyVisible = function (name) { return name !== 'height' || ko.unwrap(settings_1.controlsFactory().getPropertyInfo('DetailBand', 'height').visible) !== false; };
    };
    BandViewModel.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initSize();
    };
    BandViewModel.prototype.removeChild = function (control) {
        if (control instanceof BandViewModel) {
            if (this.bands().indexOf(control) !== -1) {
                this.bands.splice(this.bands().indexOf(control), 1);
            }
        }
        else {
            _super.prototype.removeChild.call(this, control);
        }
    };
    BandViewModel.isReorderingBand = function (control) {
        return ['GroupHeaderBand', 'GroupFooterBand', 'DetailReportBand', 'SubBand'].indexOf(control.controlType) > -1;
    };
    BandViewModel.prototype.isAllowedParent = function (target) {
        return false;
    };
    BandViewModel.prototype._isHeaderBandTypeOrThemSubBands = function (band) {
        var _isHeader = function (band) { return band.controlType === 'PageHeaderBand' || band.controlType === 'GroupHeaderBand'; };
        return _isHeader(band) || (this.controlType === 'SubBand' && _isHeader(band.parentModel()));
    };
    BandViewModel.prototype.isPropertyVisible = function (name) {
        if (name === bandsMetadata_1.printAcrossBands.propertyName) {
            return this._isHeaderBandTypeOrThemSubBands(this);
        }
        else if (name === bandsMetadata_1.pageBreak.propertyName) {
            return this.controlType === 'SubBand' || !this._isHeaderBandTypeOrThemSubBands(this) || this[bandsMetadata_1.printAcrossBands.propertyName];
        }
        else {
            return _super.prototype.isPropertyVisible.call(this, name);
        }
    };
    BandViewModel.prototype.isPropertyDisabled = function (name) {
        if (name === 'dataMember' && this['dataSource']) {
            return this['dataSource']() === null;
        }
        else if (name === bandsMetadata_1.repeatEveryPage.propertyName) {
            return this[bandsMetadata_1.printAcrossBands.propertyName] && this[bandsMetadata_1.printAcrossBands.propertyName]();
        }
        else if (name === bandsMetadata_1.printAcrossBands.propertyName) {
            return !!this[bandsMetadata_1.repeatEveryPage.propertyName] && this[bandsMetadata_1.repeatEveryPage.propertyName]() ||
                !!this.parentModel().bands().filter(function (x) { return x instanceof xrVerticalBand_1.VerticalBandViewModel; }).length ||
                (!!this[bandsMetadata_1.pageBreak.propertyName] && (this[bandsMetadata_1.pageBreak.propertyName]() === 'AfterBand' || this[bandsMetadata_1.pageBreak.propertyName]() === 'AfterBandExceptLastEntry'));
        }
        else {
            return _super.prototype.isPropertyDisabled.call(this, name);
        }
    };
    BandViewModel.unitProperties = ['height'];
    return BandViewModel;
}(xrReportelement_1.XRReportElementViewModel));
exports.BandViewModel = BandViewModel;
var BandSurface = (function (_super) {
    __extends(BandSurface, _super);
    function BandSurface(band, context, unitProperties) {
        if (unitProperties === void 0) { unitProperties = BandSurface._unitProperties; }
        var _this = _super.call(this, band, context, unitProperties) || this;
        _this.isSomeParentCollapsed = ko.observable(false);
        _this._resize = function (delta, oldDelta) {
            _this._height(_this._height() + delta - oldDelta);
            return delta;
        };
        _this.showMarker = true;
        _this.templateName = 'dxrd-band';
        _this.selectionTemplate = 'dxrd-band-selection';
        _this.vrulerTemplate = 'dxrd-band-vruler';
        _this.contentSelectionTemplate = 'dxrd-bandselection-content';
        _this.leftMarginTemplate = 'dxrd-band-coordinate-grid';
        _this.leftMarginSelectionTemplate = 'dxrd-band-coordinate-grid-selection';
        _this.allowMultiselect = false;
        _this.markerWidth = ko.observable(bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight);
        _this.collapsed = ko.observable(false);
        _this._disposables.push(ko.computed(function () {
            _this._width(context.pageWidth() - context.margins.left());
        }));
        _this._disposables.push(_this.collapsed = ko.pureComputed({
            read: function () {
                return !band.expanded();
            },
            write: function (newVal) {
                band.expanded(!newVal);
            }
        }));
        _this._disposables.push(_this._totalHeight = ko.pureComputed(function () { return _this.getTotalHeight(); }));
        _this.name = band.name;
        var subBandsHeight = 0;
        _this._disposables.push(_this.subBandsHeight = ko.pureComputed(function () { return _this.bandsHolder.getHeight(); }));
        _this._disposables.push(_this.heightWithoutSubBands = ko.pureComputed(function () {
            return _this.height() - _this.subBandsHeight();
        }));
        _this._disposables.push(_this.height = ko.pureComputed(function () { return _this.getHeight(); }));
        _this._initMultiColumn();
        _this.createChildCollection(band);
        _this.createUnderCursor();
        _this._disposables.push(_this.hasOwnRuler = ko.pureComputed(function () { return _this.getHasOwnRuler(); }));
        _this._disposables.push(_this.rulerHeight = ko.pureComputed(function () {
            return _this.collapsed() ? bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight : (_this.heightWithoutSubBands());
        }));
        var root = _this.getControlModel().root;
        var nearMarginWidth = function () { return root.margins.right() + root.margins.left(); };
        _this.coordinateGridOptions = {
            left: ko.pureComputed(function () {
                return _this.rtlLayout() ? _this._context.margins.right() : 0;
            }),
            height: _this.getControlModel().height,
            snapGridSize: root.snapGridSize,
            zoom: context.zoom,
            measureUnit: context.measureUnit,
            width: ko.pureComputed(function () {
                return root.pageWidth() - nearMarginWidth();
            }),
            flip: context.rtl
        };
        var oldDelta = 0;
        _this['resize'] = function (params) {
            oldDelta = _this._resize(params.delta.dh, oldDelta);
        };
        _this['resizeTheBand'] = function (params) {
            oldDelta = _this._resize(params.delta.dh, oldDelta);
        };
        _this['stopResize'] = function () {
            oldDelta = 0;
        };
        _this._disposables.push(_this['markerClass'] = ko.pureComputed(function () {
            var cssClass = 'dxrd-band-marker-body';
            if (band.controlType.toLowerCase().indexOf('header') !== -1 || band.controlType === 'TopMarginBand') {
                cssClass = 'dxrd-band-marker-header';
            }
            else if (band.controlType.toLowerCase().indexOf('footer') !== -1 || band.controlType === 'BottomMarginBand') {
                cssClass = 'dxrd-band-marker-footer';
            }
            if (_this.focused()) {
                return cssClass += '-focused';
            }
            return cssClass;
        }));
        _this._disposables.push(_this['leftMargin'] = ko.pureComputed(function () {
            return 0 - (context['margins'] && context.margins.left() || 0) + 10;
        }));
        _this._disposables.push(_this.canResize = ko.computed(function () {
            return _this.selected() && !_this.locked && !_this.collapsed() && !analytics_internal_1.DragDropHandler.started();
        }));
        _this._disposables.push(_this.minHeight = ko.computed(function () {
            var minHeight = (_this.heightFromControls && _this.heightFromControls() || 0) + _this.subBandsHeight();
            return minHeight || 1;
        }));
        _this.getUsefulRect = function () {
            var usefulWidth = _this.rect().width;
            var margins = _this.getControlModel().root['margins'];
            usefulWidth -= _this._getMarginWidth(margins, _this._context.rtl());
            if (_this.multiColumn && _this.multiColumn()) {
                usefulWidth -= _this.multiColumn().grayAreaWidth() + (_this.multiColumn().columnSpacing() || 0);
            }
            if (_this.rtlLayout()) {
                var nearMarginWidth = _this._getMarginWidth(margins, _this._context.rtl(), false);
                var left = _this.container().rect().width - usefulWidth - nearMarginWidth;
                return { top: 0, left: left, right: usefulWidth + nearMarginWidth, bottom: _this.height(), width: usefulWidth, height: _this.height() };
            }
            else {
                return { top: 0, left: 0, right: usefulWidth, bottom: _this.height(), width: usefulWidth, height: _this.height() };
            }
        };
        _this._disposables.push(_this.backgroundRect = ko.pureComputed(function () { return _this.getBackgroundRect(); }));
        if (_this._isHeaderBandTypeOrThemSubBands()) {
            _this.printAcrossBands = band['printAcrossBands'];
            _this._disposables.push(_this.printAcrossBandsPlaceHolder = new _printAcrossBandsPlaceHolder_1.PrintAcrossBandsPlaceHolder(_this));
        }
        return _this;
    }
    BandSurface.prototype._getMarginWidth = function (margins, rtl, isFarMargin) {
        if (isFarMargin === void 0) { isFarMargin = true; }
        var marginWidht = margins ? (isFarMargin && this._context.rtl() ? margins.left && margins.left() : margins.right && margins.right()) || 0 : 0;
        return analytics_internal_1.unitsToPixel(marginWidht, this._context.measureUnit(), this._context.zoom());
    };
    BandSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    };
    BandSurface.prototype._isHeaderBandTypeOrThemSubBands = function () {
        var band = this.getControlModel();
        var _isHeader = function (band) { return band.controlType === 'PageHeaderBand' || band.controlType === 'GroupHeaderBand'; };
        return _isHeader(band) || (band.controlType === 'SubBand' && _isHeader(band.parentModel()));
    };
    BandSurface.prototype._getUnitPositionInParent = function () {
        var isVerticalBandTakenIntoAccount = false;
        var neighbors = this._control.parentModel().bands();
        var absoluteY = neighbors
            .slice(0, neighbors.indexOf(this._control))
            .reduce(function (sum, currentBandModel) {
            if (currentBandModel instanceof xrVerticalBand_1.VerticalBandViewModel && isVerticalBandTakenIntoAccount)
                return sum;
            else if (currentBandModel instanceof xrVerticalBand_1.VerticalBandViewModel)
                isVerticalBandTakenIntoAccount = true;
            return sum + currentBandModel.size.height();
        }, 0);
        return new analytics_elements_1.Point(0, absoluteY);
    };
    Object.defineProperty(BandSurface.prototype, "_unitAbsoluteRect", {
        get: function () {
            var _this = this;
            return _bandUtils_1._getUnitAbsoluteRect(this, function () { return _this._getUnitPositionInParent(); });
        },
        enumerable: true,
        configurable: true
    });
    BandSurface.prototype.createChildCollection = function (band) {
        this._disposables.push(this.bandsHolder = new _bandHolder_1.BandsHolder(this));
        this.bandsHolder.initialize(band.bands);
    };
    BandSurface.prototype.createUnderCursor = function () {
        this.underCursor = ko.observable(new analytics_internal_1.HoverInfo());
    };
    BandSurface.prototype.getTotalHeight = function () {
        return this._height() + this.bandsHolder.getTotalHeight();
    };
    BandSurface.prototype.getHeight = function () {
        if (this.collapsed())
            return bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight;
        else
            return this._height() + this.subBandsHeight();
    };
    BandSurface.prototype.getHasOwnRuler = function () {
        return true;
    };
    BandSurface.prototype.getBackgroundRect = function () {
        var top = 0, bottom, height = this._height();
        var parent = this.parent;
        if (!parent) {
            return { top: top, bottom: bottom, height: height };
        }
        var parentBands = ko.unwrap(parent.bandsHolder.bands);
        var parentBackgroundRect = ko.unwrap(parent.backgroundRect);
        if (parentBackgroundRect) {
            top += parentBackgroundRect.top;
            bottom = parentBackgroundRect.bottom;
        }
        else {
            var pageHeight = parent.pageHeight();
            var bottomMargin = parent.margins.bottom();
            var footer = parentBands.filter(function (x) { return x._control.controlType === 'PageFooterBand'; })[0];
            bottom = pageHeight - bottomMargin;
            if (footer)
                bottom -= footer._totalHeight();
        }
        var bandIndex = parentBands.indexOf(this);
        if (parent.bandsHolder.verticalBandsContainer.visible && parent.bandsHolder.verticalBandsContainer.bandPosition() <= bandIndex) {
            top += parent.bandsHolder.verticalBandsContainer._height();
        }
        for (var i = 0; i < bandIndex; i++) {
            top += parentBands[i]._totalHeight();
        }
        if (top > bottom)
            height = 0;
        else if (top + height > bottom)
            height = bottom - top;
        return { top: top, bottom: bottom, height: height };
    };
    BandSurface.prototype._initMultiColumn = function () {
        var _this = this;
        this._disposables.push(this.multiColumn = ko.computed(function () {
            var currentMultiColumn = _this.parent && _this.parent.bandsHolder.multiColumn();
            var parentMultiColumn = _this.parent && !(_this.parent instanceof xrReport_1.ReportSurface) && _this.parent.parent.bandsHolder.multiColumn();
            if (parentMultiColumn && parentMultiColumn.haveColumns())
                return parentMultiColumn;
            else if (currentMultiColumn && currentMultiColumn.haveColumns()
                && (_this.getControlModel().controlType === 'GroupHeaderBand' ||
                    _this.getControlModel().controlType === 'GroupFooterBand' ||
                    _this.getControlModel().controlType === 'DetailReportBand')) {
                return currentMultiColumn;
            }
        }));
    };
    BandSurface.prototype.getAbsolutePositionY = function () {
        return this.parent.bandsHolder.getBandAbsolutePositionY(this);
    };
    BandSurface.prototype.updateAbsolutePosition = function () {
        if (!this.parent)
            return;
        var parent = this.parent;
        this.absolutePosition.x(0);
        if (ko.unwrap(parent['collapsed'])) {
            this.absolutePosition.y(parent['absolutePosition'].y());
            return;
        }
        this.absolutePosition.y(this.getAbsolutePositionY());
    };
    BandSurface.prototype.markerClick = function (selection) {
        if (selection.expectClick) {
            selection.expectClick = false;
            return;
        }
        if (!this.focused() && !selection.disabled()) {
            selection.initialize(this);
        }
        else {
            this.collapsed(!this.collapsed());
        }
    };
    BandSurface.prototype.canDrop = function () { return _super.prototype.canDrop.call(this) && !this.collapsed(); };
    Object.defineProperty(BandSurface.prototype, "zoom", {
        get: function () { return this.getRoot().zoom; },
        enumerable: true,
        configurable: true
    });
    BandSurface.prototype.checkParent = function (surfaceParent) {
        return false;
    };
    BandSurface._unitProperties = {
        _height: function (o) { return o.height; },
        heightFromControls: function (o) { return o.heightFromControls; }
    };
    return BandSurface;
}(analytics_elements_1.SurfaceElementBase));
exports.BandSurface = BandSurface;
var xrVerticalBand_1 = require("./xrVerticalBand");
var xrSubband_1 = require("./xrSubband");
var _createObjectFromInfo_1 = require("../internal/_createObjectFromInfo");
var xrReport_1 = require("../controls/xrReport");
var _bandHolder_1 = require("./_bandHolder");
var bandsMetadata_1 = require("./metadata/bandsMetadata");
var _printAcrossBandsPlaceHolder_1 = require("./_printAcrossBandsPlaceHolder");
var anchoring_1 = require("../controls/properties/anchoring");
var style_1 = require("../controls/metadata/properties/style");
var settings_1 = require("../utils/settings");
var bandSurfaceCollapsedHeight_1 = require("./bandSurfaceCollapsedHeight");
var _bandUtils_1 = require("./_bandUtils");
var _tocUtils_1 = require("../controls/utils/_tocUtils");
