﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_indicator.js)
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
var _indicators_1 = require("../../internal/meta/_indicators");
var _utils_1 = require("../../internal/_utils");
var _elementCollection_1 = require("../../internal/_elementCollection");
var Indicator = (function (_super) {
    __extends(Indicator, _super);
    function Indicator(model, parent, serializer) {
        return _super.call(this, model, parent, serializer, _indicators_1.indicatorMapper[model['@TypeNameSerializable']]) || this;
    }
    Indicator.prefix = 'indicator';
    return Indicator;
}(_elementCollection_1.ChartElementCollectionItemBase));
exports.Indicator = Indicator;
function assignIndicatorActions(indicators) {
    var addIndicator = function (model, display) {
        model['@Name'] = analytics_internal_1.getUniqueName(indicators().map(function (x) { return x['name'](); }), display);
        indicators()['innerActions'][0].closePopover();
        indicators.push(new Indicator(model, indicators));
    };
    var actions = Object.keys(_indicators_1.indicatorMapper).map(function (x) {
        var display = analytics_internal_1.getLocalization(x, 'ChartStringId.Ind' + x);
        return {
            text: x,
            display: display,
            clickAction: function () { return addIndicator({ '@TypeNameSerializable': x }, display); }
        };
    });
    var id = 'addindicators-action_' + analytics_internal_1.guid();
    indicators()['innerActions'] = _utils_1.createInnerActionsWithPopover(analytics_internal_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'), id, actions, 'dxcd-indicators-list');
}
exports.assignIndicatorActions = assignIndicatorActions;
