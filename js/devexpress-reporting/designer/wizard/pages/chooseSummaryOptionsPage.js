﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsPage.js)
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
var _masterDetailWizardUtils_1 = require("../internal/_masterDetailWizardUtils");
var addGroupingLevelPage_1 = require("./addGroupingLevelPage");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var ChooseSummaryOptionsPage = (function (_super) {
    __extends(ChooseSummaryOptionsPage, _super);
    function ChooseSummaryOptionsPage() {
        var _this = _super.call(this) || this;
        _this._allColumns = {};
        _this._masterDetailColumns = {};
        _this._toggleIgnoreNullValues = function () {
            _this.ignoreNullValues(!_this.ignoreNullValues());
            _this._onChange();
        };
        _this._summaryOptions = ko.observableArray([]);
        _this.ignoreNullValues = ko.observable(false);
        _this._template = 'dxrd-page-masterdetail-summary';
        _this._reportTree = ko.observableArray([]);
        _this._currentPath = ko.observable('');
        _this._availableFields = ko.observableArray([]);
        _this._summaryInfos = ko.observableArray([]);
        _this._selectFieldToSummaryCaption = analytics_utils_1.getLocalization('Select fields and assign summary functions to them', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SelectFieldsAndSummaries');
        _this._fieldsCaption = analytics_utils_1.getLocalization('Fields', 'DevExpress.XtraReports.UI.XRPivotGrid.Fields');
        _this._summaryFunctionCaption = analytics_utils_1.getLocalization('Summary Functions', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SummaryFunctions');
        _this._ignoreNullValuesCaption = analytics_utils_1.getLocalization('Ignore null values', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_IgnoreNullValues');
        _this._disposables.push(_this._currentPath.subscribe(function (newPath) {
            _this._changeQuery(newPath);
        }));
        return _this;
    }
    ChooseSummaryOptionsPage.prototype._createSummaryInfo = function () {
        var _this = this;
        var newItem = new _masterDetailWizardUtils_1.SummaryInfo(metadata_1.getSummaryFunctionValues());
        this._disposables.push(newItem.field.subscribe(function (newValue) {
            _this._createNewItemIfNeed();
        }));
        return newItem;
    };
    ChooseSummaryOptionsPage.prototype._createNewItemIfNeed = function () {
        var _summaryInfos = this._summaryInfos.peek();
        if (_summaryInfos.filter(function (item) { return !item.field(); }).length === 0 && _summaryInfos.length < this._availableFields.peek().length)
            this._summaryInfos.push(this._createSummaryInfo());
        var fieldNames = this._summaryInfos.peek().filter(function (item) { return !!item.field(); }).map(function (item) { return item.field().name; });
        this._displayedFields[this._currentPath()] && this._displayedFields[this._currentPath()]().forEach(function (item) { return item.visible(fieldNames.indexOf(item.name) === -1); });
        this._onChange();
    };
    ChooseSummaryOptionsPage.prototype._changeQuery = function (path) {
        this._currentPath(path);
        this._summaryInfoMapByDataMember[this._currentDataMember] = this._summaryInfos();
        this._currentDataMember = path;
        this._availableFields(this._masterDetailColumns[path] || []);
        this._summaryInfos(this._summaryInfoMapByDataMember[path] || []);
        this._createNewItemIfNeed();
    };
    ChooseSummaryOptionsPage.prototype._removeSummaryInfo = function (info) {
        var index = this._summaryInfos.indexOf(info);
        if (index === -1)
            return;
        this._summaryInfos.splice(index, 1);
        this._createNewItemIfNeed();
        this._onChange();
    };
    ChooseSummaryOptionsPage.prototype.canFinish = function () {
        return true;
    };
    ChooseSummaryOptionsPage.prototype.initialize = function (state) {
        var _this = this;
        this._masterDetailColumns = $.extend(true, {}, state.masterDetailSummaryOptionsColumns);
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        this._reportTree(addGroupingLevelPage_1._fillTreeQueries([], state.masterDetailInfoCollection, 0));
        this._currentDataMember = this._reportTree()[0].path;
        var allColumnsTest = {};
        this._reportTree().forEach(function (query) {
            allColumnsTest[query.path] = state.masterDetailSummaryOptionsColumns[query.path] && state.masterDetailSummaryOptionsColumns[query.path].map(function (field) { return field.name; });
        });
        var changes = [];
        $.each(allColumnsTest, function (key, value) {
            changes = changes.concat(ko.utils.compareArrays(_this._allColumns[key], value));
        });
        var isColumnsChanged = changes.some(function (change, index, array) { return change.status != 'retained'; });
        if (isColumnsChanged) {
            this._allColumns = allColumnsTest;
            this._summaryInfos([]);
            this._summaryInfoMapByDataMember = {};
            this._displayedFields = {};
            $.each(this._masterDetailColumns, function (key, value) {
                _this._displayedFields[key] = ko.observableArray([]);
                _this._displayedFields[key](value.map(function (item) {
                    return { name: item.name, displayName: item.displayName, visible: ko.observable(true) };
                }));
            });
        }
        else {
            this._summaryInfos(this._summaryInfoMapByDataMember[this._currentDataMember]);
        }
        this._changeQuery(this._currentDataMember);
        return $.Deferred().resolve().promise();
    };
    ChooseSummaryOptionsPage.prototype.commit = function () {
        this._summaryInfoMapByDataMember[this._currentDataMember] = this._summaryInfos();
        var masterDetailSummaryOptionsColumns = this._masterDetailColumns;
        var masterDetailSummariesInfo = {};
        $.each(this._summaryInfoMapByDataMember, function (key, value) {
            masterDetailSummariesInfo[key] = value.filter(function (item) { return !!item.field(); }).map(function (summaryOption) { return ({ column: summaryOption.field(), summaryFunctions: summaryOption.value.value().map(function (item) { return summaryOption.value.dataSource.map(function (option) { return option.value; }).indexOf(item); }) }); });
        });
        var ignoreNullValuesForSummary = this.ignoreNullValues();
        return $.Deferred().resolve({
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns,
            masterDetailSummariesInfo: masterDetailSummariesInfo,
            ignoreNullValuesForSummary: ignoreNullValuesForSummary
        }).promise();
    };
    return ChooseSummaryOptionsPage;
}(analytics_wizard_1.WizardPageBase));
exports.ChooseSummaryOptionsPage = ChooseSummaryOptionsPage;
function _registerChooseSummaryOptionsPage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.ChooseSummaryOptionsPage, {
        create: function () {
            return new ChooseSummaryOptionsPage();
        },
        description: analytics_utils_1.getLocalization('Choose summary functions to calculate in reports.', 'ReportBoxDesignerStringId.Wizard_MasterDetailChooseSummaryOptions_Description'),
        template: 'dxrd-page-masterdetail-summary',
        getState: function (state) { return state; },
        setState: function (data, state) {
            state.masterDetailSummariesInfo = data.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        resetState: function (state, defaultState) {
            state.masterDetailSummariesInfo = defaultState.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        }
    });
}
exports._registerChooseSummaryOptionsPage = _registerChooseSummaryOptionsPage;
