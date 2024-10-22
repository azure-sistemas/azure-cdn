﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_reportDesignerControlsHelper.js)
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
var ko = require("knockout");
var ReportDesignerControlsHelper = (function (_super) {
    __extends(ReportDesignerControlsHelper, _super);
    function ReportDesignerControlsHelper(helper) {
        var _this = _super.call(this) || this;
        _this.getControls = function (context) { return helper() && helper().getControls(context); };
        _this.getControlByName = function (name) { return helper() && helper().getControlByName(name); };
        _this._disposables.push(_this.allControls = ko.computed(function () { return helper() && helper().allControls() || []; }));
        return _this;
    }
    return ReportDesignerControlsHelper;
}(analytics_utils_1.Disposable));
exports.ReportDesignerControlsHelper = ReportDesignerControlsHelper;
