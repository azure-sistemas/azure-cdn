﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookupSettings.js)
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
var objectStorageItem_1 = require("../objectStorageItem");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var lookUpValue_1 = require("./lookUpValue");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var _parameterUtils_1 = require("../metadata/_parameterUtils");
var lookUpSettings_1 = require("../metadata/parameters/lookUpSettings");
var LookUpSettings = (function (_super) {
    __extends(LookUpSettings, _super);
    function LookUpSettings(model, dsHelperProvider, serializer) {
        return _super.call(this, model, dsHelperProvider, serializer) || this;
    }
    LookUpSettings.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat([metadata_1.filterString, metadata_1.filterStringEditable]);
    };
    LookUpSettings.prototype.updateFilter = function (parameter, report) {
        this.filterString.helper.parameters = ko.pureComputed({
            read: function () {
                var currentIndex = report.parameters().indexOf(parameter);
                var filteredParameters = currentIndex > 0 ? report.parameters().filter(function (_, index) { return index < currentIndex; }) : report.parameters();
                return _parameterUtils_1.collectAvailableParameters(filteredParameters);
            },
            deferEvaluation: true
        });
        this._disposables.push(this.filterString.helper.parameters);
    };
    return LookUpSettings;
}(objectStorageItem_1.ObjectItem));
exports.LookUpSettings = LookUpSettings;
var StaticListLookUpSettings = (function (_super) {
    __extends(StaticListLookUpSettings, _super);
    function StaticListLookUpSettings(model, dsHelperProvider, serializer) {
        var _this = _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings' }, model), dsHelperProvider, serializer) || this;
        _this.filterString = new analytics_widgets_1.FilterStringOptions(_this._filterString);
        _this.filterString.helper.canChoiceParameters = true;
        _this.filterString.itemsProvider = ko.observable(null);
        return _this;
    }
    StaticListLookUpSettings.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat(this._isEditing() ? lookUpSettings_1.editedStaticListLookUpSettingsInfo : lookUpSettings_1.readonlyStaticListLookUpSettingsInfo);
    };
    StaticListLookUpSettings.prototype.preInitProperties = function (model, helper, serializer) {
        _super.prototype.preInitProperties.call(this, model, helper, serializer);
        this._isEditing = ko.observable(false);
    };
    StaticListLookUpSettings.prototype.afterDeserialization = function (model, serializer) {
        this.lookUpValues = analytics_utils_1.deserializeArray(model.LookUpValues || [], function (item) { return new lookUpValue_1.LookUpValue(item, serializer); });
        _super.prototype.afterDeserialization.call(this, model, serializer);
    };
    StaticListLookUpSettings.prototype.updateFilter = function (parameter, report) {
        this.filterString.itemsProvider({
            getItems: function (pathRequest) {
                var result = $.Deferred();
                result.resolve([
                    {
                        displayName: 'Description',
                        isList: false,
                        name: 'Description',
                        specifics: 'String'
                    },
                    {
                        displayName: 'Value',
                        isList: false,
                        name: 'Value',
                        specifics: parameter.specifics
                    }
                ]);
                return result.promise();
            }
        });
        _super.prototype.updateFilter.call(this, parameter, report);
    };
    return StaticListLookUpSettings;
}(LookUpSettings));
exports.StaticListLookUpSettings = StaticListLookUpSettings;
var DynamicListLookUpSettings = (function (_super) {
    __extends(DynamicListLookUpSettings, _super);
    function DynamicListLookUpSettings(model, dsHelperProvider, serializer) {
        var _this = _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings' }, model), dsHelperProvider, serializer) || this;
        _this.dsHelperProvider = dsHelperProvider;
        _this.filterString = new analytics_widgets_1.FilterStringOptions(_this._filterString, ko.pureComputed(function () { return _this.getPath('valueMember'); }), ko.pureComputed(function () { return !_this.dataSource(); }));
        return _this;
    }
    DynamicListLookUpSettings.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat(lookUpSettings_1.dynamicListLookUpSettingsInfoBase);
    };
    DynamicListLookUpSettings.prototype.getPath = function (propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this.dataSource());
        }
        else if (propertyName === 'displayMember' || propertyName === 'valueMember' || propertyName === 'sortMember') {
            return analytics_internal_1.getFullPath(this.getPath('dataMember'), this.dataMember());
        }
        return '';
    };
    DynamicListLookUpSettings.prototype.isPropertyDisabled = function (name) {
        if (name != 'dataSource')
            return this.dataSource() === null;
    };
    return DynamicListLookUpSettings;
}(LookUpSettings));
exports.DynamicListLookUpSettings = DynamicListLookUpSettings;
