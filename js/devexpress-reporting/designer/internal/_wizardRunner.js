﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_wizardRunner.js)
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
var WizardRunner = (function (_super) {
    __extends(WizardRunner, _super);
    function WizardRunner(_menuOptions) {
        var _this = _super.call(this) || this;
        _this._menuOptions = _menuOptions;
        _this._currentWizard = null;
        _this._wizards = {};
        _this._disposables.push(_this._menuOptions.collapsed.subscribe(function (newVal) {
            if (!newVal) {
                _this._currentWizard.close();
                _this._currentWizard = null;
            }
        }));
        return _this;
    }
    WizardRunner.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._currentWizard = null;
        this._wizards = {};
    };
    WizardRunner.prototype.registerCommand = function (wizardType, start, close) {
        this._wizards[wizardType] = { start: start, close: close };
    };
    WizardRunner.prototype.run = function (command) {
        this._currentWizard && this._currentWizard.close();
        this._currentWizard = this._wizards[command];
        this._currentWizard && this._currentWizard.start();
    };
    WizardRunner.prototype.closeWizard = function () {
        this._currentWizard && this._currentWizard.close();
    };
    return WizardRunner;
}(analytics_utils_1.Disposable));
exports.WizardRunner = WizardRunner;
