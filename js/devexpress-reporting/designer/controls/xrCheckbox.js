﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCheckbox.js)
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
var _locker_1 = require("../../common/utils/_locker");
var xrTextControl_1 = require("./xrTextControl");
var checkEditingField_1 = require("../../viewer/editing/models/checkEditingField");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var XRCheckBoxViewModel = (function (_super) {
    __extends(XRCheckBoxViewModel, _super);
    function XRCheckBoxViewModel(control, parent, serializer) {
        var _this = _super.call(this, XRCheckBoxViewModel._patchModel(control), parent, serializer) || this;
        var lock = new _locker_1.Locker().lock;
        _this._disposables.push(_this.checkBoxState.subscribe(function (val) {
            lock(function () {
                _this.checked(val === 'Checked' || val === 'Indeterminate');
            });
        }));
        _this._disposables.push(_this.checked.subscribe(function (val) {
            lock(function () {
                _this.checkBoxState(val ? 'Checked' : 'Unchecked');
            });
        }));
        if (_this.checkBoxState() !== 'Unchecked') {
            _this.checkBoxState.valueHasMutated();
        }
        else if (_this.checked() !== false) {
            _this.checked.valueHasMutated();
        }
        if (_this.glyphOptions && ko.isObservable(_this.glyphOptions.alignment))
            _this.glyphAlignment = _this.glyphOptions.alignment;
        return _this;
    }
    XRCheckBoxViewModel._patchModel = function (model) {
        if (model['@CheckState']) {
            model['@CheckBoxState'] = model['@CheckState'];
            delete model['@CheckState'];
        }
        return model;
    };
    XRCheckBoxViewModel.unitProperties = [].concat(['glyphOptions'], xrReportelement_1.XRReportElementViewModel.unitProperties);
    return XRCheckBoxViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRCheckBoxViewModel = XRCheckBoxViewModel;
var XRCheckBoxSurface = (function (_super) {
    __extends(XRCheckBoxSurface, _super);
    function XRCheckBoxSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.checkStateWidthContainer = ko.observable();
        _this.visibleText = ko.observable(true);
        _this.contenttemplate = 'dxrd-checkbox-content';
        _this._disposables.push(_this.checkStateWidth = ko.computed(function () {
            return analytics_internal_1.unitsToPixel(control.glyphOptions.size.width(), context.measureUnit(), 1);
        }));
        _this._disposables.push(_this.checkStateHeight = ko.computed(function () {
            return analytics_internal_1.unitsToPixel(control.glyphOptions.size.height(), context.measureUnit(), 1);
        }));
        _this._disposables.push(_this.checkStateClass = ko.pureComputed(function () {
            return 'dxrd-checkbox-checkstate-' + control['checkBoxState']().toLowerCase();
        }));
        _this._disposables.push(_this.customGlyphStyleCss = ko.pureComputed(function () {
            return checkEditingField_1.createCustomGlyphStyleCss(control.glyphOptions.customGlyphs[control['checkBoxState']()]());
        }));
        _this._disposables.push(_this.checkStateStyleIcon = ko.pureComputed(function () {
            return checkEditingField_1.getCheckBoxTemplate(control.glyphOptions.style(), control['checkBoxState'](), _this.customGlyphStyleCss());
        }));
        _this.leftPadding = function () {
            var padding = ko.unwrap(control['paddingObj']) || analytics_elements_1.PaddingModel.from(analytics_elements_1.PaddingModel.defaultVal);
            return analytics_internal_1.unitsToPixel(padding.left(), context.measureUnit());
        };
        _this._disposables.push(_this.textWidth = ko.pureComputed(function () {
            return _this.contentWidthWithoutZoom() - _this.checkStateWidth() - _this.leftPadding();
        }));
        _this._disposables.push(_this.visibleText = ko.pureComputed(function () {
            return control['glyphAlignment']() !== 'Center';
        }));
        _this._disposables.push(_this.checkStateWidthContainer = ko.pureComputed(function () {
            return _this.visibleText() ? _this.checkStateWidth() + 'px' : '100%';
        }));
        _this.isGlyphAlignmentNear = ko.pureComputed(function () {
            return _this._control.rtl() ? control['glyphAlignment']() === 'Far' : control['glyphAlignment']() === 'Near';
        });
        _this._disposables.push(_this.css = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.backGroundCss(), _this.cssCalculator.foreColorCss(), _this.cssCalculator.textAlignmentCss(), _this.cssCalculator.paddingsCss());
        }));
        return _this;
    }
    return XRCheckBoxSurface;
}(xrTextControl_1.XRTextControlSurfaceBase));
exports.XRCheckBoxSurface = XRCheckBoxSurface;
