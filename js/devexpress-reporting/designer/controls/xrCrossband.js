﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossband.js)
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
var xrReportelement_1 = require("./xrReportelement");
var xrControl_1 = require("./xrControl");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
function findBandByPositionY(bandsHolder, position) {
    var result = null;
    bandsHolder.bands().forEach(function (band) {
        if (band.absolutePosition.y.peek() <= position) {
            if (band) {
                result = findBandByPositionY(band.bandsHolder, position) || band;
                return false;
            }
        }
    });
    return result;
}
var XRCrossBandControlViewModel = (function (_super) {
    __extends(XRCrossBandControlViewModel, _super);
    function XRCrossBandControlViewModel(control, parent, serializer) {
        var _this = _super.call(this, control, parent, serializer) || this;
        _this.isCrossbandShow = ko.computed(function () {
            return !!(_this.startBand() && _this.endBand());
        });
        var originalEndBand = _this.endBand;
        _this._disposables.push(_this.endPoint.x = ko.pureComputed({
            read: function () {
                return _this.startPoint.x();
            },
            write: function (val) {
                if (analytics_internal_1.checkModelReady(_this.root)) {
                    _this.startPoint.x(val);
                }
            }
        }));
        _this._disposables.push(_this.locationF.x = ko.pureComputed({
            read: function () {
                return _this.startPoint.x();
            },
            write: function (val) {
                if (analytics_internal_1.checkModelReady(_this.root)) {
                    _this.startPoint.x(val);
                }
            }
        }));
        _this._disposables.push(_this.locationF.y = ko.pureComputed({
            read: function () {
                return _this.startPoint.y();
            },
            write: function (val) {
                if (analytics_internal_1.checkModelReady(_this.root)) {
                    _this.startPoint.y(val);
                }
            }
        }));
        if (_this.parentModel()) {
            _this._subscribeBands(_this.parentModel());
        }
        else {
            _this._disposables.push(_this.parentModel.subscribe(function (report) {
                if (report)
                    _this._subscribeBands(report);
            }));
        }
        _this._disposables.push(_this.isCrossbandShow);
        return _this;
    }
    XRCrossBandControlViewModel.prototype._subscribeBands = function (report) {
        var _this = this;
        this._disposables.push(report.bands.subscribe(function (changes) {
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                if (change.status === 'deleted') {
                    if (change.value === _this.startBand() && change.value === _this.endBand()) {
                        report.crossBandControls.remove(_this);
                    }
                    else if (change.value === _this.endBand()) {
                        _this.endBand(report.bands()[change.index - 1]);
                        _this.endPoint.y(report.bands()[change.index - 1].height());
                    }
                    else if (change.value === _this.startBand()) {
                        var saveEndBand = _this.endBand(), saveEndPointY = _this.endPoint.y();
                        _this.startBand(report.bands()[change.index]);
                        _this.startPoint.y(0);
                        _this.endBand(saveEndBand);
                        _this.endPoint.y(saveEndPointY);
                    }
                }
            }
        }, null, 'arrayChange'));
    };
    XRCrossBandControlViewModel.prototype.getNearestParent = function (target) {
        var result = target;
        while (result.parentModel()) {
            result = result.parentModel();
        }
        return result;
    };
    XRCrossBandControlViewModel.prototype.isResettableProperty = function (propertyName) {
        return _super.prototype.isResettableProperty.call(this, propertyName) && ['startPoint', 'endPoint', 'startBand', 'endBand'].indexOf(propertyName) === -1;
    };
    XRCrossBandControlViewModel.prototype.isPropertyVisible = function (name) {
        if (name === 'size')
            return false;
        return _super.prototype.isPropertyVisible.call(this, name);
    };
    XRCrossBandControlViewModel.prototype.getControlContainerName = function () { return 'crossBandControls'; };
    XRCrossBandControlViewModel.unitProperties = ['width', 'locationF', 'startPoint', 'endPoint'];
    return XRCrossBandControlViewModel;
}(xrReportelement_1.XRReportElementViewModel));
exports.XRCrossBandControlViewModel = XRCrossBandControlViewModel;
var XRCrossBandSurface = (function (_super) {
    __extends(XRCrossBandSurface, _super);
    function XRCrossBandSurface(control, context) {
        var _this = _super.call(this, control, context, XRCrossBandSurface._unitProperties) || this;
        _this.edgeUnderCursor = ko.observable({ isOver: false, x: 0, y: 0, isNotDropTarget: true });
        _this.underCursor = ko.observable({ isOver: false, x: 0, y: 0, isNotDropTarget: true });
        _this._disposables.push(_this['_x'].subscribe(function (newVal) {
            _this['_endX'](newVal);
        }));
        _this.visible = control.isCrossbandShow;
        var currentAbsoluteStartY = _this['_startY']();
        var currentAbsoluteEndY = _this['_endY']();
        _this._disposables.push(ko.computed(function () {
            if (control.startBand()) {
                var startBandSurface = analytics_internal_1.findSurface(control.startBand.peek());
                currentAbsoluteStartY = _this._isBandCollapsed(startBandSurface) ? startBandSurface.absolutePosition.y() : _this['_startY']() + startBandSurface.absolutePosition.y();
            }
            _this['_y'](currentAbsoluteStartY);
        }));
        _this._disposables.push(ko.computed(function () {
            if (control.endBand()) {
                var endBandSurface = analytics_internal_1.findSurface(control.endBand.peek());
                currentAbsoluteEndY = _this._isBandCollapsed(endBandSurface) ? endBandSurface.absolutePosition.y() : _this['_endY']() + endBandSurface.absolutePosition.y();
            }
            _this['_height'](currentAbsoluteEndY - currentAbsoluteStartY);
        }));
        _this._disposables.push(ko.computed(function () {
            var absoluteStartY = _this['_y']();
            if (absoluteStartY < 0) {
                _this['_y'](0);
                return;
            }
            if (absoluteStartY !== currentAbsoluteStartY) {
                var startBandSurface = findBandByPositionY(_this.parent.bandsHolder, absoluteStartY);
                control.startBand(startBandSurface.getControlModel());
                currentAbsoluteStartY = absoluteStartY;
                _this['_startY'](currentAbsoluteStartY - startBandSurface.absolutePosition.y());
                _this._updateEndPoint(_this['_height'](), currentAbsoluteEndY, currentAbsoluteStartY);
            }
        }));
        _this._disposables.push(ko.computed(function () {
            var height = _this['_height']();
            if (height !== currentAbsoluteEndY - currentAbsoluteStartY) {
                _this._updateEndPoint(height, currentAbsoluteEndY, currentAbsoluteStartY);
            }
        }));
        _this.template = control.controlType === 'XRCrossBandLine' ? 'dxrd-crossband-line' : 'dxrd-crossband';
        if (_this.getControlModel().controlType === 'XRCrossBandLine') {
            _this._disposables.push(_this.lineCss = ko.pureComputed(function () {
                return $.extend({}, _this.cssCalculator.stroke(), _this.cssCalculator.strokeWidthWithWidth(), _this.cssCalculator.strokeDashArrayWithWidth());
            }));
            _this._disposables.push(_this.lineWidthCss = ko.pureComputed(function () {
                return $.extend({}, _this.cssCalculator.strokeWidthWithWidth());
            }));
        }
        else {
            _this._disposables.push(_this.leftCss = ko.pureComputed(function () { return _this.cssCalculator.crossBandBorder('Left'); }));
            _this._disposables.push(_this.rightCss = ko.pureComputed(function () { return _this.cssCalculator.crossBandBorder('Right'); }));
            _this._disposables.push(_this.topCss = ko.pureComputed(function () { return _this.cssCalculator.crossBandBorder('Top'); }));
            _this._disposables.push(_this.bottomCss = ko.pureComputed(function () { return _this.cssCalculator.crossBandBorder('Bottom'); }));
        }
        _this._disposables.push(control.startBand.subscribe(function (newBand) {
            if (newBand) {
                var bandSurface = analytics_internal_1.findSurface(newBand);
                _this['_y'](bandSurface.absolutePosition.y());
            }
        }));
        _this._disposables.push(control.endBand.subscribe(function (newBand) {
            if (newBand) {
                var bandSurface = analytics_internal_1.findSurface(newBand);
                var newHeight = bandSurface.absolutePosition.y() - _this['_y']();
                if (control.startBand() === newBand) {
                    newHeight += _this['_endY']();
                }
                _this['_height'](newHeight);
            }
        }));
        _this._disposables.push(_this.borderWidth = ko.pureComputed(function () {
            return control['borderWidth'] && Math.floor(control['borderWidth']());
        }));
        return _this;
    }
    XRCrossBandSurface.prototype._isBandCollapsed = function (bandSurface) {
        return bandSurface && (bandSurface.collapsed() || bandSurface.isSomeParentCollapsed());
    };
    XRCrossBandSurface.prototype._updateEndPoint = function (height, currentAbsoluteEndY, currentAbsoluteStartY) {
        currentAbsoluteEndY = currentAbsoluteStartY + height;
        var endBandSurface = findBandByPositionY(this.parent.bandsHolder, currentAbsoluteEndY);
        if (!endBandSurface) {
            return;
        }
        if (endBandSurface.absolutePosition.y.peek() + endBandSurface.height.peek() < currentAbsoluteEndY) {
            endBandSurface['_height'](currentAbsoluteEndY - endBandSurface.absolutePosition.y.peek());
        }
        this._control.endBand(endBandSurface.getControlModel());
        this['_endY'](currentAbsoluteEndY - endBandSurface.absolutePosition.y());
    };
    XRCrossBandSurface.prototype._getAllBands = function (band) {
        var _this = this;
        var bands = band.bandsHolder.bands(), innerBands = [];
        bands.forEach(function (band) {
            innerBands = innerBands.concat(_this._getAllBands(band));
        });
        return [].concat(bands, innerBands);
    };
    XRCrossBandSurface.prototype._getIntersectionBands = function (currentRect, bands) {
        var _this = this;
        var bandSurfaces = bands.filter(function (band) { return _this.isThereIntersection(currentRect, band.absoluteRect()); }), intersectionBands = [].concat(bandSurfaces);
        bandSurfaces.forEach(function (band) {
            intersectionBands = intersectionBands.concat(_this._getAllBands(band));
        });
        intersectionBands = intersectionBands.filter(function (band) {
            return band.controls && band.controls().length > 0;
        });
        return intersectionBands;
    };
    XRCrossBandSurface.prototype._getCrossBandBoxSides = function () {
        var currentRect = this._unitAbsoluteRect, borderWidth = this.getControlModel()['borderWidth']();
        return [{ top: currentRect.top, left: currentRect.left, height: borderWidth, width: currentRect.width },
            { top: currentRect.bottom - borderWidth, left: currentRect.left, height: borderWidth, width: currentRect.width },
            { top: currentRect.top, left: currentRect.left, height: currentRect.height, width: borderWidth },
            { top: currentRect.top, left: currentRect.right - borderWidth, height: currentRect.height, width: borderWidth }];
    };
    Object.defineProperty(XRCrossBandSurface.prototype, "_unitAbsoluteRect", {
        get: function () {
            var startBandSurface = this._control.startBand() && this._control.startBand().surface, endBandSurface = this._control.endBand() && this._control.endBand().surface;
            var startBandTop = startBandSurface ? startBandSurface['_unitAbsoluteRect'].top : 0;
            var endBandTop = endBandSurface ? endBandSurface['_unitAbsoluteRect'].top : 0;
            var top = startBandTop + this._control.startPoint.y(), bottom = endBandTop + this._control.endPoint.y();
            return {
                top: top, left: this._control.startPoint.x(),
                right: this._control.startPoint.x() + this._control.width(), bottom: bottom,
                width: this._control.width(), height: bottom - top
            };
        },
        enumerable: true,
        configurable: true
    });
    XRCrossBandSurface.prototype.canSetRect = function (rect) {
        var report = this._control.root;
        if (report && report.language() !== metadata_1.defaultCulture) {
            var endBand = findBandByPositionY(this.parent.bandsHolder, rect.top + rect.height);
            if (this._control.endBand() !== endBand._control)
                return false;
            var startBand = findBandByPositionY(this.parent.bandsHolder, rect.top);
            if (this._control.startBand() !== startBand._control)
                return false;
        }
        return true;
    };
    XRCrossBandSurface.prototype.isThereIntersectionWithControls = function () {
        var isThereIntersection = false, currentRect = this._unitAbsoluteRect, intersectionBands = this._getIntersectionBands(currentRect, this.parent && this.parent.getChildrenCollection()()), rectangles = this.getControlModel().controlType === 'XRCrossBandBox' ? this._getCrossBandBoxSides() : [currentRect];
        for (var bandIndex = 0; bandIndex < intersectionBands.length; bandIndex++) {
            for (var rectIndex = 0; rectIndex < rectangles.length; rectIndex++) {
                if (this.isThereIntersectionWithNeighborsCollection(rectangles[rectIndex], intersectionBands[bandIndex].controls().filter(function (control) { return !control.isIntersectionDeny; }), '_unitAbsoluteRect')) {
                    isThereIntersection = true;
                    break;
                }
            }
            if (isThereIntersection)
                break;
        }
        return isThereIntersection;
    };
    XRCrossBandSurface.prototype.updateAbsolutePosition = function () {
        this.absolutePosition.x(this['_endX']());
        this.absolutePosition.y(this['_y']());
        this.afterUpdateAbsolutePosition();
    };
    XRCrossBandSurface.prototype.isThereIntersectionWithCrossBandControls = function () {
        if (this.getControlModel().controlType === 'XRCrossBandBox') {
            var isThereIntersection = false;
            var rects = this._getCrossBandBoxSides() || [];
            for (var rectIndex = 0; rectIndex < rects.length; rectIndex++) {
                if (_super.prototype.isThereIntersectionWithCrossBandControls.call(this, rects[rectIndex])) {
                    isThereIntersection = true;
                    break;
                }
            }
            return isThereIntersection;
        }
        else {
            return _super.prototype.isThereIntersectionWithCrossBandControls.call(this);
        }
    };
    XRCrossBandSurface.prototype.container = function () {
        if (this._control.isCrossbandShow()) {
            return analytics_internal_1.findSurface(this.getControlModel().startBand());
        }
        else {
            return null;
        }
    };
    XRCrossBandSurface.prototype._getChildrenHolderName = function () {
        return null;
    };
    XRCrossBandSurface._unitProperties = {
        _x: function (o) {
            return o.startPoint.x;
        },
        _width: function (o) {
            return o.width;
        },
        _startY: function (o) {
            return o.startPoint.y;
        },
        _endX: function (o) {
            return o.endPoint.x;
        },
        _endY: function (o) {
            return o.endPoint.y;
        }
    };
    return XRCrossBandSurface;
}(xrControl_1.XRControlSurfaceBase));
exports.XRCrossBandSurface = XRCrossBandSurface;
var metadata_1 = require("../../common/metadata");
