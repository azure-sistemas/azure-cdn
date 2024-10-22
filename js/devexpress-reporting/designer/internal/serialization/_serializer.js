﻿/**
* DevExpress HTML/JS Reporting (designer\internal\serialization\_serializer.js)
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
var xrReport_1 = require("../../controls/xrReport");
var xrReport_2 = require("../../controls/metadata/xrReport");
var localizationMetadata_1 = require("../../localization/localizationMetadata");
var metadata_1 = require("../../../common/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ReportModelSerializer = (function (_super) {
    __extends(ReportModelSerializer, _super);
    function ReportModelSerializer(reportModel, options) {
        var _this = _super.call(this, options) || this;
        _this.reportModel = reportModel;
        _this.isLocalized = false;
        return _this;
    }
    ReportModelSerializer.prototype.serialize = function (viewModel, serializationsInfo, refs) {
        var isInitialize = !viewModel;
        viewModel = viewModel || this.reportModel;
        refs = refs || { linkObjTable: [], objects: [] };
        var model = _super.prototype.serialize.call(this, viewModel, serializationsInfo, refs);
        if (isInitialize) {
            model['@Ref'] = (refs.objects.push(viewModel) - 1).toString();
            this.setLinks(refs);
        }
        return model;
    };
    ReportModelSerializer.prototype.serializeProperty = function (modelPropertyInfo, viewModel, serializationsInfo, refs, result) {
        if (!modelPropertyInfo.localizable || !this.reportModel.isLocalized()) {
            return _super.prototype.serializeProperty.call(this, modelPropertyInfo, viewModel, serializationsInfo, refs, result);
        }
    };
    ReportModelSerializer.prototype.deserialize = function (viewModel, model, serializationsInfo) {
        if (viewModel instanceof xrReport_1.ReportViewModel) {
            if (!this.reportModel)
                this.reportModel = viewModel;
            var currentLocalizationItems = model[xrReport_2.localizationItems.modelName];
            if (currentLocalizationItems) {
                this.isLocalized = true;
                this.localizationJsonObj = Object.keys(currentLocalizationItems).map(function (key) { return currentLocalizationItems[key]; }).filter(function (a) { return a[localizationMetadata_1.cultureInfo.modelName] === metadata_1.defaultCulture; });
            }
        }
        return _super.prototype.deserialize.call(this, viewModel, model, serializationsInfo);
    };
    return ReportModelSerializer;
}(analytics_utils_1.ModelSerializer));
exports.ReportModelSerializer = ReportModelSerializer;
