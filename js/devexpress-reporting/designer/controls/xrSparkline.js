﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSparkline.js)
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
var _xrTodoControl_1 = require("./_xrTodoControl");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var XRSparklineViewModel = (function (_super) {
    __extends(XRSparklineViewModel, _super);
    function XRSparklineViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.view(_this.createView(_this.view() || {}, serializer));
        _this.sparklineFake = {
            type: ko.pureComputed({
                read: function () {
                    return _this.view().type();
                },
                write: function (val) {
                    _this.view(_this.createView({ '@Type': val }, serializer));
                }
            }),
            content: _this.view
        };
        _this._disposables.push(_this.sparklineFake.type);
        return _this;
    }
    XRSparklineViewModel.prototype.createView = function (model, serializer) {
        if (serializer === void 0) { serializer = null; }
        var type = model && model['@Type'] || 'Line';
        var viewTypeSerialization = xrSparkline_1.sparklineViewMap[type];
        var newView = { 'type': ko.observable(type), 'getInfo': function () { return viewTypeSerialization; } };
        (serializer || new analytics_utils_1.ModelSerializer()).deserialize(newView, model);
        return newView;
    };
    XRSparklineViewModel.prototype.getPath = function (propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
        }
        else if (propertyName === 'valueMember') {
            return analytics_internal_1.getFullPath(this.getPath('dataMember'), this.dataMember());
        }
        return _super.prototype.getPath.call(this, propertyName);
    };
    return XRSparklineViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRSparklineViewModel = XRSparklineViewModel;
var XRSparkLineSurface = (function (_super) {
    __extends(XRSparkLineSurface, _super);
    function XRSparkLineSurface(control, context) {
        return _super.call(this, control, context) || this;
    }
    return XRSparkLineSurface;
}(_xrTodoControl_1.TodoControlSurface));
exports.XRSparkLineSurface = XRSparkLineSurface;
var xrSparkline_1 = require("./metadata/xrSparkline");
