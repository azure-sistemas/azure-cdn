﻿/**
* DevExpress HTML/JS Reporting (designer\actions\crossTabActions.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var settings_1 = require("../utils/settings");
var _defaultCrossTabControl_1 = require("../internal/_defaultCrossTabControl");
var xrCrossTab_1 = require("../controls/xrCrossTab");
var _crossTabConverter_1 = require("../internal/_crossTabConverter");
var CrossTabActions = (function (_super) {
    __extends(CrossTabActions, _super);
    function CrossTabActions(_converters, isDisabled) {
        if (isDisabled === void 0) { isDisabled = function () { return false; }; }
        var _this = _super.call(this) || this;
        _this._converters = _converters;
        _super.prototype.initActions.call(_this, settings_1.DefaultCrossTabControl() == _defaultCrossTabControl_1.DefaultCrossTabControlEnum.XRCrossTab ? [
            {
                text: 'Revert to Original Pivot Grid',
                group: function () { return analytics_utils_1.getLocalization('Cross Tab', 'ReportStringId.RibbonXRDesign_PageGroup_CrossTab'); },
                displayText: function () { return analytics_utils_1.getLocalization('Revert to Original Pivot Grid', 'ReportStringId.Verb_RevertCrossTabToPivotGrid'); },
                imageClassName: 'dxrd-image-actions-convertation',
                imageTemplateName: 'dxrd-svg-actions-convertation',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function (model) {
                    var converter = _this._converter;
                    converter && converter.convert(model);
                }
            }
        ] : []);
        return _this;
    }
    Object.defineProperty(CrossTabActions.prototype, "_converter", {
        get: function () {
            return this._converters.filter(function (x) { return x instanceof _crossTabConverter_1.PivotGridConverter; })[0];
        },
        enumerable: true,
        configurable: true
    });
    CrossTabActions.prototype.condition = function (context) {
        return context instanceof xrCrossTab_1.XRCrossTabViewModel && !!context.originalPivotGridLayout();
    };
    return CrossTabActions;
}(analytics_internal_1.BaseActionsProvider));
exports.CrossTabActions = CrossTabActions;
