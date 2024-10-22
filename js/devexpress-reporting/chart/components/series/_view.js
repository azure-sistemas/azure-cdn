﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_view.js)
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
var SeriesViewViewModel = (function (_super) {
    __extends(SeriesViewViewModel, _super);
    function SeriesViewViewModel(model, serializer) {
        var _this = this;
        model['@TypeNameSerializable'] = model['@TypeNameSerializable'] || 'SideBySideBarSeriesView';
        _this = _super.call(this, model, serializer) || this;
        if (_this['titles'])
            _title_1.assignTitleActions(_this['titles']);
        if (_this['indicators'])
            _indicator_1.assignIndicatorActions(_this['indicators']);
        _this._createMarkerDependences();
        _this._createLinkOptionsDependences();
        _this['isPropertyDisabled'] = function (propertyName) {
            return _this._createPropertyDisabledDependence(propertyName, 'heightToWidthRatio', _this['heightToWidthRatioAuto'], [true]) ||
                _this._createPropertyDisabledDependence(propertyName, 'minSize', _this['autoSize'], [true]) ||
                _this._createPropertyDisabledDependence(propertyName, 'maxSize', _this['autoSize'], [true]) ||
                _this._createPropertyDisabledDependence(propertyName, 'barDepth', _this['barDepthAuto'], [true]) ||
                _this._createPropertyDisabledDependence(propertyName, 'showFacet', _this['model'], ['Cone', 'Pyramid']);
        };
        return _this;
    }
    SeriesViewViewModel.from = function (model, serializer) {
        return ko.observable(new SeriesViewViewModel(model || {}, serializer));
    };
    SeriesViewViewModel.prototype.dispose = function () {
        this._disposables.forEach(function (x) { return x.dispose(); });
    };
    SeriesViewViewModel.toJson = function (value, serializer, refs) {
        value = ko.unwrap(value);
        return serializer.serialize(value, value.getInfo(), refs);
    };
    SeriesViewViewModel.prototype._getInfo = function (typeName) {
        return [_series_1.typeNameSerializable].concat(_view_1.viewMapper[typeName]);
    };
    SeriesViewViewModel.prototype._createPropertyDisabledDependence = function (propertyName, depLeftPropertyName, depRightProperty, depValues, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (propertyName !== depLeftPropertyName || !depRightProperty)
            return false;
        var isDisabled = false;
        for (var i = 0; i < depValues.length; i++) {
            if (depRightProperty() === depValues[i]) {
                isDisabled = true;
                break;
            }
        }
        return reverse ? !isDisabled : isDisabled;
    };
    SeriesViewViewModel.prototype._createMarkerDependences = function () {
        var _this = this;
        ['minValueMarker', 'maxValueMarker', 'marker1', 'marker2', 'markerOptions', 'lineMarkerOptions', 'bubbleMarkerOptions', 'pointMarkerOptions'].forEach(function (propertyName) {
            if (_this[propertyName]) {
                _this[propertyName].isPropertyDisabled = function (innerName) {
                    return _this._createPropertyDisabledDependence(innerName, 'starPointCount', _this[propertyName].kind, ['Star'], true);
                };
            }
        });
    };
    SeriesViewViewModel.prototype._createLinkOptionsDependences = function () {
        var _this = this;
        if (!!this['linkOptions']) {
            this._disposables.push(this['linkOptions'].color.subscribe(function (newVal) {
                _this['linkOptions'].colorSource('OwnColor');
            }));
        }
    };
    SeriesViewViewModel.prototype.preInitProperties = function (model) {
        var _this = this;
        this.getInfo = function () { return _this._getInfo(model['@TypeNameSerializable']); };
    };
    return SeriesViewViewModel;
}(analytics_elements_1.SerializableModel));
exports.SeriesViewViewModel = SeriesViewViewModel;
var _title_1 = require("../models/_title");
var _series_1 = require("../../internal/meta/_series");
var _view_1 = require("../../internal/meta/_view");
var _indicator_1 = require("./_indicator");
