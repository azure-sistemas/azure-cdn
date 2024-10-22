﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsPage.js)
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
var reportWizardState_1 = require("../reportWizardState");
var _pageSetupUtils_1 = require("../internal/_pageSetupUtils");
var xrReport_1 = require("../../controls/metadata/xrReport");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var PreviewPageHelper = (function (_super) {
    __extends(PreviewPageHelper, _super);
    function PreviewPageHelper(settings) {
        var _this = _super.call(this) || this;
        _this.width = ko.observable(0);
        _this.height = ko.observable(0);
        _this.marginLeft = ko.observable(0);
        _this.marginRight = ko.observable(0);
        _this.marginTop = ko.observable(0);
        _this.marginBottom = ko.observable(0);
        _this.pagePreviewElement = ko.observable(null);
        if (settings) {
            _this.width = settings.width;
            _this.height = settings.height;
            _this.marginLeft = settings.marginLeft;
            _this.marginRight = settings.marginRight;
            _this.marginTop = settings.marginTop;
            _this.marginBottom = settings.marginBottom;
        }
        var elementWidth = ko.computed(function () { return _this.pagePreviewElement() && _this.pagePreviewElement().width() || 200; }).extend({ throttle: 100 });
        var elementHeight = ko.computed(function () { return _this.pagePreviewElement() && _this.pagePreviewElement().height() || 292; }).extend({ throttle: 100 });
        var previewRatio = ko.computed(function () { return Math.min(elementWidth() / _this.width(), elementHeight() / _this.height()); });
        var resizeHandler = function () {
            _this.pagePreviewElement.valueHasMutated();
        };
        window.addEventListener('resize', resizeHandler);
        _this._disposables.push({
            dispose: function () {
                _this.pagePreviewElement(null);
                window.removeEventListener('resize', resizeHandler);
            }
        }, elementWidth, elementHeight, previewRatio, _this.previewPageHeight = ko.pureComputed(function () { return _this.height() * previewRatio(); }), _this.previewPageWidth = ko.pureComputed(function () { return Math.round(_this.width() * previewRatio()); }), _this.previewTopMargin = ko.pureComputed(function () { return Math.round(_this.marginTop() * previewRatio()); }), _this.previewRightMargin = ko.pureComputed(function () { return Math.round(_this.marginRight() * previewRatio()); }), _this.previewBottomMargin = ko.pureComputed(function () { return Math.round(_this.marginBottom() * previewRatio()); }), _this.previewLeftMargin = ko.pureComputed(function () { return Math.round(_this.marginLeft() * previewRatio()); }));
        return _this;
    }
    PreviewPageHelper.prototype.cachePagePreviewElement = function ($element) {
        var _this = this;
        setTimeout(function () {
            _this.pagePreviewElement($element);
        }, 100);
    };
    PreviewPageHelper.prototype.updatePageSettings = function (pageSetup) {
        this.width(pageSetup.width);
        this.height(pageSetup.height);
        this.marginTop(pageSetup.marginTop);
        this.marginRight(pageSetup.marginRight);
        this.marginBottom(pageSetup.marginBottom);
        this.marginLeft(pageSetup.marginLeft);
    };
    return PreviewPageHelper;
}(analytics_utils_1.Disposable));
exports.PreviewPageHelper = PreviewPageHelper;
var ConfigureReportPageSettingsPage = (function (_super) {
    __extends(ConfigureReportPageSettingsPage, _super);
    function ConfigureReportPageSettingsPage() {
        var _a;
        var _this = _super.call(this) || this;
        _this.lookupData = {
            paperKind: xrReport_1.paperKind.valuesArray
                .map(function (x) { return { value: x.value, displayName: analytics_utils_1.getLocalization(x.displayValue, x.localizationId) }; })
                .sort(function (a, b) { return a.value === 'Custom' ? 1 : b.value === 'Custom' ? -1 : a.displayName.localeCompare(b.displayName); }),
            unit: [
                { value: reportWizardState_1.GraphicsUnit.Inch, displayName: analytics_utils_1.getLocalization('Inch', 'AnalyticsCoreStringId.Wizard_Inch') },
                { value: reportWizardState_1.GraphicsUnit.Millimeter, displayName: analytics_utils_1.getLocalization('Millimeter', 'AnalyticsCoreStringId.Wizard_Millimeter') },
                { value: reportWizardState_1.GraphicsUnit.Pixel, displayName: analytics_utils_1.getLocalization('Pixel', 'ASPxReportsStringId.ReportDesigner_Wizard_Pixel') }
            ]
        };
        _this.paperKind = ko.observable(reportWizardState_1.defaultPageSetupState.paperKind);
        _this.landscape = ko.observable(reportWizardState_1.defaultPageSetupState.landscape);
        _this.width = ko.observable(reportWizardState_1.defaultPageSetupState.width);
        _this.height = ko.observable(reportWizardState_1.defaultPageSetupState.height);
        _this._disposables.push(_this.fixedSize = ko.computed(function () { return _this.paperKind() !== 'Custom'; }));
        _this.marginTop = ko.observable(reportWizardState_1.defaultPageSetupState.marginTop);
        _this.marginRight = ko.observable(reportWizardState_1.defaultPageSetupState.marginRight);
        _this.marginBottom = ko.observable(reportWizardState_1.defaultPageSetupState.marginBottom);
        _this.marginLeft = ko.observable(reportWizardState_1.defaultPageSetupState.marginLeft);
        _this._disposables.push(_this.previewPageHelper = new PreviewPageHelper({
            height: _this.height,
            width: _this.width,
            marginTop: _this.marginTop,
            marginRight: _this.marginRight,
            marginBottom: _this.marginBottom,
            marginLeft: _this.marginLeft
        }));
        _this._unit = ko.observable(reportWizardState_1.defaultPageSetupState.unit);
        _this._disposables.push(_this.unit = ko.computed({
            read: function () { return _this._unit(); },
            write: function (newVal) {
                var converter = _pageSetupUtils_1.PageSetupHelper.getConverter(_this._unit(), newVal);
                [_this.width, _this.height, _this.marginTop, _this.marginRight, _this.marginBottom, _this.marginLeft].forEach(function (x) { x(converter(x())); });
                _this._unit(newVal);
            }
        }));
        _this._disposables.push(_this.paperKind.subscribe(function (newVal) {
            var _a;
            if (newVal !== 'Custom') {
                var convert = _pageSetupUtils_1.PageSetupHelper.getConverter(reportWizardState_1.GraphicsUnit.Inch, _this._unit());
                var width = convert(analytics_internal_1.papperKindMapper[newVal].width / 100);
                var height = convert(analytics_internal_1.papperKindMapper[newVal].height / 100);
                if (_this.landscape())
                    _a = [height, width], width = _a[0], height = _a[1];
                _this.width(width);
                _this.height(height);
            }
        }));
        _this._disposables.push(_this.landscape.subscribe(function (newVal) {
            var _a;
            var width = _this.height();
            var height = _this.width();
            _this.width(width);
            _this.height(height);
            var t = _this.marginTop(), r = _this.marginRight(), b = _this.marginBottom(), l = _this.marginLeft();
            _a = newVal
                ? [l, t, r, b]
                : [r, b, l, t], t = _a[0], r = _a[1], b = _a[2], l = _a[3];
            _this.marginTop(t);
            _this.marginRight(r);
            _this.marginBottom(b);
            _this.marginLeft(l);
        }));
        _this._disposables.push(_this.valueFormat = ko.pureComputed(function () {
            switch (_this._unit()) {
                case reportWizardState_1.GraphicsUnit.Inch:
                    return '#0.00 "';
                case reportWizardState_1.GraphicsUnit.Millimeter:
                    return '#0.0 mm';
                case reportWizardState_1.GraphicsUnit.Pixel:
                    return '#0 px';
            }
        }));
        (_a = _this._disposables).push.apply(_a, analytics_wizard_internal_1.subscribeProperties([
            _this.paperKind,
            _this.landscape,
            _this.width,
            _this.height,
            _this.marginTop,
            _this.marginLeft,
            _this.marginRight,
            _this.marginBottom,
            _this.unit
        ], function () { return _this._onChange(); }));
        return _this;
    }
    ConfigureReportPageSettingsPage.prototype.canFinish = function () {
        return true;
    };
    ConfigureReportPageSettingsPage.prototype.initialize = function (state) {
        this.paperKind(state.paperKind);
        this.landscape(state.landscape);
        this.unit(state.unit);
        if (state.paperKind === 'Custom') {
            this.width(state.width);
            this.height(state.height);
        }
        this.marginLeft(state.marginLeft);
        this.marginRight(state.marginRight);
        this.marginTop(state.marginTop);
        this.marginBottom(state.marginBottom);
        return $.Deferred().resolve().promise();
    };
    ConfigureReportPageSettingsPage.prototype.commit = function () {
        return $.Deferred().resolve({
            paperKind: this.paperKind(),
            unit: this.unit(),
            width: this.width(),
            height: this.height(),
            marginLeft: this.marginLeft(),
            marginRight: this.marginRight(),
            marginTop: this.marginTop(),
            marginBottom: this.marginBottom(),
            landscape: this.landscape()
        }).promise();
    };
    return ConfigureReportPageSettingsPage;
}(analytics_wizard_1.WizardPageBase));
exports.ConfigureReportPageSettingsPage = ConfigureReportPageSettingsPage;
function _applyPageSetting(data, state) {
    state.height = data.height;
    state.landscape = data.landscape;
    state.marginBottom = data.marginBottom;
    state.marginLeft = data.marginLeft;
    state.marginRight = data.marginRight;
    state.marginTop = data.marginTop;
    state.paperKind = data.paperKind;
    state.unit = data.unit;
    state.width = data.width;
}
exports._applyPageSetting = _applyPageSetting;
function _registerConfigureReportPageSettingsPage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.ConfigureReportPageSettingsPage, {
        create: function () { return new ConfigureReportPageSettingsPage(); },
        getState: function (state) { return state.pageSetup; },
        setState: function (data, state) {
            _applyPageSetting(data, state);
        },
        resetState: function (state, defaultState) {
            _applyPageSetting(defaultState, state);
        },
        template: 'dxrd-page-pageSetup',
        description: analytics_utils_1.getLocalization('Specify report page settings.', 'ASPxReportsStringId.ReportDesigner_Wizard_PageSetup_Description')
    });
}
exports._registerConfigureReportPageSettingsPage = _registerConfigureReportPageSettingsPage;
