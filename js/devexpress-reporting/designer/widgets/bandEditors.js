﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\bandEditors.js)
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
var xrDetailReportBand_1 = require("../bands/xrDetailReportBand");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var BandEditorBase = (function (_super) {
    __extends(BandEditorBase, _super);
    function BandEditorBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generateValue = function (bands) {
            if (!_this.bands) {
                _this.bands = bands(_this.filter, _this.noneNeaded);
            }
            return _this.bands;
        };
        _this.bands = null;
        return _this;
    }
    return BandEditorBase;
}(analytics_widgets_1.Editor));
exports.BandEditorBase = BandEditorBase;
var RunningBandEditor = (function (_super) {
    __extends(RunningBandEditor, _super);
    function RunningBandEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filter = function (item) {
            return item.controlType === 'GroupHeaderBand' || item.controlType === 'DetailReportBand';
        };
        _this.noneNeaded = true;
        return _this;
    }
    return RunningBandEditor;
}(BandEditorBase));
exports.RunningBandEditor = RunningBandEditor;
var BandsEditor = (function (_super) {
    __extends(BandsEditor, _super);
    function BandsEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filter = function (item) {
            return !(item instanceof xrDetailReportBand_1.DetailReportBand);
        };
        _this.noneNeaded = false;
        return _this;
    }
    return BandsEditor;
}(BandEditorBase));
exports.BandsEditor = BandsEditor;
var SortingBandEditor = (function (_super) {
    __extends(SortingBandEditor, _super);
    function SortingBandEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.filter = function (item) {
            return item.controlType === 'GroupHeaderBand' || item.controlType === 'DetailBand';
        };
        _this.noneNeaded = true;
        var value = ko.computed(function () { return _this.value() || {}; });
        _this._disposables.push(value);
        _this.viewmodel = new analytics_widgets_1.ObjectProperties(value, { editors: [groupfieldMetaData_1.sortFields, groupfieldMetaData_1.groupFields] }, level + 1, _this.disabled, textToSearch);
        _this._disposables.push(_this.viewmodel);
        return _this;
    }
    return SortingBandEditor;
}(BandEditorBase));
exports.SortingBandEditor = SortingBandEditor;
var PageBreakBandEditor = (function (_super) {
    __extends(PageBreakBandEditor, _super);
    function PageBreakBandEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this._disposables.push(_this.values = ko.pureComputed(function () {
            if (_this._model() && _this._model()[bandsMetadata_1.printAcrossBands.propertyName] && !!_this._model()[bandsMetadata_1.printAcrossBands.propertyName]())
                return bandsMetadata_1.pageBreakWithoutAfterValues;
            else
                return bandsMetadata_1.pageBreakValues;
        }));
        return _this;
    }
    return PageBreakBandEditor;
}(analytics_widgets_1.Editor));
exports.PageBreakBandEditor = PageBreakBandEditor;
var groupfieldMetaData_1 = require("../bands/metadata/groupfieldMetaData");
var bandsMetadata_1 = require("../bands/metadata/bandsMetadata");
