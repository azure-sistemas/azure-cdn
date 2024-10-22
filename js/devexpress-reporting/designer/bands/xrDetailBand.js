﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailBand.js)
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
var xrBand_1 = require("./xrBand");
var multiColumn_1 = require("./multiColumn");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var DetailBand = (function (_super) {
    __extends(DetailBand, _super);
    function DetailBand(band, parent, serializer) {
        var _this = _super.call(this, band, parent, serializer) || this;
        _this.hierarchyPrintOptions.isPropertyDisabled = function (propertyName) {
            if (propertyName === 'keyFieldName' || propertyName === 'parentFieldName')
                return !!this.childListFieldName();
            else if (propertyName === 'childListFieldName') {
                return !!this.keyFieldName() || !!this.parentFieldName();
            }
        };
        _this.hierarchyPrintOptions.getPath = function () {
            return _this.getPath('groupFields');
        };
        return _this;
    }
    DetailBand.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.sortFields);
        this.resetObservableArray(this.sortFields);
    };
    DetailBand.prototype.preInit = function (band, parent, serializer) {
        this.multiColumn = new multiColumn_1.MultiColumn(band['MultiColumn'], this.root['pageWidth'] || ko.observable(0), this.root['margins'] || analytics_elements_1.Margins.fromString());
        this._disposables.push(this.multiColumn);
        this.sortFields = analytics_utils_1.deserializeArray(band.SortFields, function (field) { return new groupfield_1.GroupFieldModel(field, serializer); });
    };
    DetailBand.prototype.hasHierarchyPrintOptions = function () {
        return !(analytics_internal_1.isNullOrEmptyString(this.hierarchyPrintOptions.childListFieldName()) &&
            (analytics_internal_1.isNullOrEmptyString(this.hierarchyPrintOptions.keyFieldName()) ||
                analytics_internal_1.isNullOrEmptyString(this.hierarchyPrintOptions.parentFieldName())));
    };
    DetailBand.prototype.isPropertyDisabled = function (name) {
        if (name === xrDetailBandMetaData_1.fillEmptySpace.propertyName) {
            return !this.parentModel()['bands']()
                .filter(function (band) { return band.controlType === 'GroupFooterBand' || band.controlType === 'ReportFooterBand'; })
                .every(function (band) {
                return band[bandsMetadata_1.printAtBottom.propertyName] && band[bandsMetadata_1.printAtBottom.propertyName]() ||
                    band[bandsMetadata_1.pageBreak.propertyName] && (band[bandsMetadata_1.pageBreak.propertyName]() === 'BeforeBand' || band[bandsMetadata_1.pageBreak.propertyName]() === 'BeforeBandExceptFirstEntry');
            });
        }
        else {
            return _super.prototype.isPropertyDisabled.call(this, name);
        }
    };
    DetailBand.unitProperties = [].concat([], xrBand_1.BandViewModel.unitProperties, 'multiColumn');
    return DetailBand;
}(xrBand_1.BandViewModel));
exports.DetailBand = DetailBand;
var DetailBandSurface = (function (_super) {
    __extends(DetailBandSurface, _super);
    function DetailBandSurface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetailBandSurface.prototype._initMultiColumn = function () {
        var _this = this;
        var multiColumn = new multiColumn_1.MultiColumnSurface(this._control.multiColumn, this._context);
        this._disposables.push(multiColumn);
        this._disposables.push(this.multiColumn = ko.computed(function () {
            var parentMultiColumn = _this.parent['multiColumn'] && _this.parent['multiColumn']();
            if (parentMultiColumn)
                return parentMultiColumn;
            return multiColumn;
        }));
    };
    return DetailBandSurface;
}(xrBand_1.BandSurface));
exports.DetailBandSurface = DetailBandSurface;
var groupfield_1 = require("./groupfield");
var xrDetailBandMetaData_1 = require("./metadata/xrDetailBandMetaData");
var bandsMetadata_1 = require("./metadata/bandsMetadata");
