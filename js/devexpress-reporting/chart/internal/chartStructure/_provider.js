﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_provider.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ChartStructureObjectProvider = (function (_super) {
    __extends(ChartStructureObjectProvider, _super);
    function ChartStructureObjectProvider(target, displayName, localizationId) {
        return _super.call(this, target, displayName, localizationId) || this;
    }
    ChartStructureObjectProvider.prototype.getClassName = function (instance) {
        if (instance instanceof _series_1.SeriesViewModel) {
            return 'SeriesViewModel';
        }
        else if (instance instanceof _secondaryAxisViewModel_1.SecondaryAxisViewModel) {
            return 'SecondaryAxisViewModel';
        }
        else {
            return _super.prototype.getClassName.call(this, instance);
        }
    };
    ChartStructureObjectProvider.prototype.createArrayItem = function (currentTarget, result, propertyName) {
        _super.prototype.createArrayItem.call(this, currentTarget, result, propertyName);
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            if (item.specifics === 'SeriesViewModel') {
                var unwrapArrayValue = ko.unwrap(currentTarget[i]);
                result[i].dragData = { noDragable: false };
                result[i]['data'] = unwrapArrayValue;
            }
        }
    };
    return ChartStructureObjectProvider;
}(analytics_internal_1.ObjectStructureProvider));
exports.ChartStructureObjectProvider = ChartStructureObjectProvider;
var _series_1 = require("../../components/series/_series");
var _secondaryAxisViewModel_1 = require("../../components/axis/_secondaryAxisViewModel");
