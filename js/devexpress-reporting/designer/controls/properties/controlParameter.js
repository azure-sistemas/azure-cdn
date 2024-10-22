﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\controlParameter.js)
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
var dataBinding_1 = require("../../dataObjects/dataBinding");
var controlParameter_1 = require("../metadata/properties/controlParameter");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var ControlParameter = (function (_super) {
    __extends(ControlParameter, _super);
    function ControlParameter(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.visible = ko.observable(true);
        _this.dataMemberInfo = ko.observable();
        _this.fakeBinding = _this;
        return _this;
    }
    ControlParameter.createNew = function () {
        return new ControlParameter({}, null);
    };
    ControlParameter.prototype.getInfo = function () {
        return controlParameter_1.controlParameterInfos;
    };
    ControlParameter.prototype.isEmpty = function () {
        return false;
    };
    ControlParameter.prototype.setDataMemberInfo = function (dataMemberInfo) {
        this.dataMemberInfo(dataMemberInfo);
    };
    Object.defineProperty(ControlParameter.prototype, "specifics", {
        get: function () {
            if (this.parameter())
                return this.parameter().specifics;
            return this.dataMemberInfo() && this.dataMemberInfo().specifics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlParameter.prototype, "name", {
        get: function () {
            return this.parameterName();
        },
        enumerable: true,
        configurable: true
    });
    ControlParameter.prototype.generateValue = function (undoEngine, dataSourceHelper, dataSources, dataBindingsProvider) {
        var _this = this;
        var value = _super.prototype.generateValue.call(this, undoEngine, dataSourceHelper, dataSources);
        if (dataBindingsProvider && this.dataSource() && !this.dataMemberInfo()) {
            var dataSourcePath = dataSourceHelper.getDataSourcePath(this.dataSource());
            var dataMemberParts = (this.dataMember() || '').split('.');
            var valueMember = dataMemberParts.pop();
            var dataMember = dataMemberParts.join('.');
            var request = new analytics_utils_1.PathRequest(dataSourcePath + (dataMember ? '.' + dataMember : ''));
            dataBindingsProvider.getItems(request).done(function (result) {
                _this.dataMemberInfo(result.filter(function (x) { return x.name === valueMember; })[0]);
            });
        }
        return value;
    };
    return ControlParameter;
}(dataBinding_1.DataBindingBase));
exports.ControlParameter = ControlParameter;
