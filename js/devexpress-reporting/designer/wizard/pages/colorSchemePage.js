﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\colorSchemePage.js)
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
var colorSchemaPageUtils_1 = require("../internal/colorSchemaPageUtils");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ChooseReportColorSchemePage = (function (_super) {
    __extends(ChooseReportColorSchemePage, _super);
    function ChooseReportColorSchemePage() {
        var _this = _super.call(this) || this;
        _this._scheme = ko.observable(null);
        _this._customColorScheme = new colorSchemaPageUtils_1.CustomColorScheme('Custom', 'ReportStringId.Wizard_ReportColorScheme_Custom', '255, 183, 227, 228');
        _this._lookupData = {
            scheme: [
                new colorSchemaPageUtils_1.ColorScheme('Grey', 'ReportStringId.Wizard_ReportColorScheme_Grey', '255, 75,75,75'),
                new colorSchemaPageUtils_1.ColorScheme('ColdGrey', 'ReportStringId.Wizard_ReportColorScheme_ColdGrey', '255, 93,98,110'),
                new colorSchemaPageUtils_1.ColorScheme('Cream', 'ReportStringId.Wizard_ReportColorScheme_Cream', '255, 227,202,166'),
                new colorSchemaPageUtils_1.ColorScheme('JeansBlue', 'ReportStringId.Wizard_ReportColorScheme_JeansBlue', '255, 69,94,178'),
                new colorSchemaPageUtils_1.ColorScheme('Blue', 'ReportStringId.Wizard_ReportColorScheme_Blue', '255, 23,104,196'),
                new colorSchemaPageUtils_1.ColorScheme('Yellow', 'ReportStringId.Wizard_ReportColorScheme_Yellow', '255, 255,209,107'),
                new colorSchemaPageUtils_1.ColorScheme('LightGreen', 'ReportStringId.Wizard_ReportColorScheme_LightGreen', '255, 181,211,142'),
                new colorSchemaPageUtils_1.ColorScheme('Mint', 'ReportStringId.Wizard_ReportColorScheme_Mint', '255, 46,148,130'),
                new colorSchemaPageUtils_1.ColorScheme('LightBlue', 'ReportStringId.Wizard_ReportColorScheme_LightBlue', '255, 153,212,246'),
                new colorSchemaPageUtils_1.ColorScheme('Azure', 'ReportStringId.Wizard_ReportColorScheme_Azure', '255, 57,159,228'),
                new colorSchemaPageUtils_1.ColorScheme('Coral', 'ReportStringId.Wizard_ReportColorScheme_Coral', '255, 250,128,114'),
                new colorSchemaPageUtils_1.ColorScheme('Red', 'ReportStringId.Wizard_ReportColorScheme_Red', '255, 196,66,79'),
                new colorSchemaPageUtils_1.ColorScheme('Raspberry', 'ReportStringId.Wizard_ReportColorScheme_Raspberry', '255, 152,51,91'),
                new colorSchemaPageUtils_1.ColorScheme('Violet', 'ReportStringId.Wizard_ReportColorScheme_Violet', '255, 113,69,168'),
                _this._customColorScheme
            ]
        };
        var customSubscription = null;
        _this._scheme(_this._lookupData.scheme[0]);
        _this._disposables.push(_this._scheme.subscribe(function (newVal) {
            if (newVal === _this._customColorScheme) {
                _this._disposables.push(customSubscription = _this._customColorScheme.color.subscribe(function () {
                    _this._onChange();
                }));
            }
            else {
                customSubscription && customSubscription.dispose();
            }
            _this._onChange();
        }));
        return _this;
    }
    ChooseReportColorSchemePage.prototype.addColorScheme = function (name, color, position) {
        if (position === void 0) { position = this._lookupData.scheme.length; }
        var scheme = new colorSchemaPageUtils_1.ColorScheme(name, undefined, color);
        scheme._isCustom = true;
        this._lookupData.scheme.splice(position, 0, scheme);
    };
    ChooseReportColorSchemePage.prototype.removeColorScheme = function () {
        var _this = this;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        names.forEach(function (name) {
            var scheme = _this._lookupData.scheme.filter(function (x) { return x.name == name || x.displayName == name; })[0];
            if (scheme) {
                _this._lookupData.scheme.splice(_this._lookupData.scheme.indexOf(scheme), 1);
            }
        });
    };
    ChooseReportColorSchemePage.prototype.removeAllColorSchemes = function () {
        this._lookupData.scheme = [];
    };
    ChooseReportColorSchemePage.prototype.setCustomColor = function (color) {
        this._customColorScheme.editorColor(color.indexOf('rgb') === 0 ?
            color :
            analytics_utils_1.colorFromString(color)());
        this._customColorScheme.applyColor();
    };
    ChooseReportColorSchemePage.prototype._applyScheme = function (data) {
        this._scheme() && this._scheme().selected(false);
        data.selected(true);
        this._scheme(data);
    };
    ChooseReportColorSchemePage.prototype.canFinish = function () {
        return true;
    };
    ChooseReportColorSchemePage.prototype.initialize = function (state) {
        if (state.name === 'Custom') {
            this._customColorScheme.editorColor(state.baseColor);
            this._customColorScheme.applyColor();
        }
        var currentScheme = this._lookupData.scheme.filter(function (x) { return x.name === state.name; })[0];
        if (!currentScheme) {
            currentScheme = this._lookupData.scheme[0];
        }
        this._scheme(currentScheme);
        if (currentScheme)
            currentScheme.selected(true);
        return $.Deferred().resolve().promise();
    };
    ChooseReportColorSchemePage.prototype.commit = function () {
        var scheme = this._scheme();
        var result = scheme ? {
            name: scheme._isCustom ? 'Custom' : scheme.name,
            baseColor: scheme.baseColor,
            _color: ko.unwrap(scheme.color)
        } : {};
        return $.Deferred().resolve(result).promise();
    };
    return ChooseReportColorSchemePage;
}(analytics_wizard_1.WizardPageBase));
exports.ChooseReportColorSchemePage = ChooseReportColorSchemePage;
function _applyColorSchemeState(data, state) {
    state.baseColor = data.baseColor;
    state.name = data.name;
    state['_color'] = data['_color'];
}
exports._applyColorSchemeState = _applyColorSchemeState;
function _registerChooseReportColorSchemePage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.ChooseReportColorSchemePage, {
        create: function () { return new ChooseReportColorSchemePage(); },
        getState: function (state) { return state.colorScheme; },
        setState: function (data, state) {
            _applyColorSchemeState(data, state);
        },
        resetState: function (state, defaultState) {
            _applyColorSchemeState(defaultState, state);
        },
        template: 'dxrd-page-colorScheme',
        description: analytics_utils_1.getLocalization('Choose a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_ColorScheme_Description')
    });
}
exports._registerChooseReportColorSchemePage = _registerChooseReportColorSchemePage;
