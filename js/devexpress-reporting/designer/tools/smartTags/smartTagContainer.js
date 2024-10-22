﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\smartTagContainer.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrBand_1 = require("../../bands/xrBand");
var xrReport_1 = require("../../controls/xrReport");
var settings_1 = require("../../utils/settings");
var SmartTagModel = (function (_super) {
    __extends(SmartTagModel, _super);
    function SmartTagModel(selection, reportSurface, offset) {
        var _this = _super.call(this) || this;
        _this.margin = ko.observable('');
        _this.smartTags = ko.observableArray();
        _this.visible = ko.observable(true);
        _this.position = new analytics_elements_1.Point(0, 0);
        _this._disposables.push(selection.focused.subscribe(function (selectedSurface) {
            var visible = false;
            var selectedItem = selectedSurface && selectedSurface['_control'];
            var factory = settings_1.smartTagFactory();
            if (selectedItem) {
                var reportElement = selectedItem;
                visible = true;
                _this.smartTags().forEach(function (x) { return x.dispose(); });
                _this.smartTags(factory[reportElement.controlType] ? factory[reportElement.controlType](reportElement) :
                    factory['default'] && factory['default'](reportElement));
            }
            _this.visible(visible);
        }));
        _this._disposables.push(ko.computed(function () {
            if (!reportSurface())
                return;
            var selectedSurface = selection.focused();
            var selectedItem = selectedSurface && selectedSurface['_control'];
            if (selectedItem) {
                var position = selectedSurface['absoluteRect'] && selectedSurface['absoluteRect']();
                if (position) {
                    _this.position.x(position.right + reportSurface().margins.left());
                    _this.position.y(position.top);
                }
                else {
                    _this.position.x(reportSurface()['_width']() + offset());
                    _this.position.y(0);
                }
                _this.margin(_this.getMargin(selectedItem));
            }
        }).extend(({ rateLimit: { timeout: 1, method: 'notifyWhenChangesStop' } })));
        return _this;
    }
    SmartTagModel.prototype.getMargin = function (reportElement) {
        if (reportElement instanceof xrReport_1.ReportViewModel)
            return '3px';
        var margin = reportElement instanceof xrBand_1.BandViewModel ? -22 : 9;
        return margin + 'px';
    };
    return SmartTagModel;
}(analytics_utils_1.Disposable));
exports.SmartTagModel = SmartTagModel;
