﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_utils.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports._masterDetailWizardHeight = '600';
exports._masterDetailWizardWidth = '840';
exports._masterDetailScrollViewHeight = '100%';
function overrideFullscreenDataSourceWizardPageMetadata(factory, pageId, create) {
    var meta = factory.getMetadata(pageId);
    meta.canNext = function (page) { return page.canFinish() || page.canNext(); };
    meta.canFinish = function (page) { return page.canFinish(); };
    meta.create = create;
    var oldSetState = meta.setState;
    meta.setState = function (data, state) {
        oldSetState(data, state);
        state.newDataSource = data.newDataSource;
    };
    var oldResetState = meta.resetState;
    meta.resetState = function (state, defaultState) {
        oldResetState(state, defaultState);
        state.newDataSource = defaultState.newDataSource;
    };
}
exports.overrideFullscreenDataSourceWizardPageMetadata = overrideFullscreenDataSourceWizardPageMetadata;
var FieldInfo = (function (_super) {
    __extends(FieldInfo, _super);
    function FieldInfo(data) {
        var _this = _super.call(this) || this;
        _this.field = ko.observable(null);
        _this.selectedItems = ko.observableArray([]);
        _this.functionValue = ko.observable();
        _this.visible = ko.observable(true);
        _this.value = {
            value: _this.functionValue,
            dataSource: data,
            showDropDownButton: true,
            selectedItems: _this.selectedItems,
            displayExpr: function (value) {
                if (!value)
                    return value;
                return analytics_internal_1.getLocalization(value.displayValue, value.localizationId);
            }
        };
        return _this;
    }
    FieldInfo.prototype.getOptions = function (options) { return options; };
    return FieldInfo;
}(analytics_utils_1.Disposable));
exports.FieldInfo = FieldInfo;
