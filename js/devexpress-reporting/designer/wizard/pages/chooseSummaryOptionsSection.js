﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsSection.js)
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
var chooseSummaryOptionsPage_1 = require("./chooseSummaryOptionsPage");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var AddSummaryFieldsPage = (function (_super) {
    __extends(AddSummaryFieldsPage, _super);
    function AddSummaryFieldsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._toggleIgnoreNullValues = function () {
            _this.ignoreNullValues(!_this.ignoreNullValues());
            _this._onChange();
        };
        _this._fieldListProvider = ko.observable(null);
        _this.ignoreNullValues = ko.observable(false);
        _this._template = 'dxrd-page-masterdetail-summary-section';
        _this._reportTree = ko.observableArray([]);
        _this._availableFieldsCount = ko.observable(0);
        _this._summaryInfos = ko.observableArray([]);
        _this._selectFieldToSummaryCaption = analytics_utils_1.getLocalization('Select fields and assign summary functions to them', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SelectFieldsAndSummaries');
        _this._fieldsCaption = analytics_utils_1.getLocalization('Field', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryFields_Text');
        _this._summaryFunctionCaption = analytics_utils_1.getLocalization('Summary Functions', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SummaryOptions_SummaryFunctions');
        _this._ignoreNullValuesCaption = analytics_utils_1.getLocalization('Ignore null values', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_IgnoreNullValues');
        return _this;
    }
    AddSummaryFieldsPage.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this._summaryInfos);
    };
    AddSummaryFieldsPage.prototype._fillTreeQueries = function (tree, queries, availableQueries) {
        addGroupingLevelPage_1._fillTreeQueries([], queries, 0).forEach(function (value) {
            if (availableQueries[value.path]) {
                var fields = value.fields.filter(function (x) { return availableQueries[value.path].some(function (field) { return field.name === x.name; }); });
                var treeItem = $.extend(true, {}, value);
                treeItem.fields = fields;
                tree.push(treeItem);
            }
        });
        return tree;
    };
    AddSummaryFieldsPage.prototype._createSummaryInfo = function () {
        var _this = this;
        var newItem = new _masterDetailWizardUtils_1.SummaryInfoFieldlist();
        newItem._disposables.push(newItem.selectedPath.subscribe(function (newVal) {
            if (!newVal)
                newItem.field(null);
            else {
                _this._fieldListProvider().getItemByPath({
                    fullPath: newVal,
                    path: newVal
                }).done(function (item) {
                    newItem.field(item);
                    _this._createNewItemIfNeed();
                });
            }
            _this._onChange();
        }));
        newItem._disposables.push(newItem.functionValue.subscribe(function (newVal) {
            _this._onChange();
        }));
        return newItem;
    };
    AddSummaryFieldsPage.prototype._createNewItemIfNeed = function () {
        var _summaryInfos = this._summaryInfos.peek();
        if (_summaryInfos.filter(function (item) { return !item.field(); }).length === 0 && _summaryInfos.length < this._availableFieldsCount())
            this._summaryInfos.push(this._createSummaryInfo());
    };
    AddSummaryFieldsPage.prototype._getParentName = function (parent) {
        if (parent.parent) {
            return [this._getParentName(parent.parent), parent.displayName].join('.');
        }
        return parent.displayName;
    };
    AddSummaryFieldsPage.prototype._flat = function (fields, parent) {
        var _this = this;
        var flatList = fields.map(function (x) {
            if (x.path) {
                x.name = x.path;
            }
            else {
                x.path = [parent.path, x.name].join('.');
            }
            if (parent) {
                x.parent = {
                    path: parent.path,
                    displayName: _this._getParentName(parent)
                };
            }
            return x;
        });
        fields.forEach(function (x) {
            if (x.fields) {
                flatList = flatList.concat(_this._flat(x.fields, x));
            }
        });
        return flatList;
    };
    AddSummaryFieldsPage.prototype._removeSummaryInfo = function (info) {
        var index = this._summaryInfos.indexOf(info);
        if (index === -1)
            return;
        info.dispose();
        this._summaryInfos.splice(index, 1);
        if (this._summaryInfos.length === 0) {
            this._createNewItemIfNeed();
        }
        this._onChange();
    };
    AddSummaryFieldsPage.prototype.canFinish = function () {
        return true;
    };
    AddSummaryFieldsPage.prototype._updateSummaries = function (flatlist) {
        var _this = this;
        this._summaryInfos().filter(function (x) { return x.field() && flatlist.every(function (item) { return item.path !== x.field().path; }); }).forEach(function (item) {
            _this._summaryInfos().splice(_this._summaryInfos().indexOf(item), 1);
        });
        this._summaryInfos.valueHasMutated();
    };
    AddSummaryFieldsPage.prototype.initialize = function (state) {
        var _this = this;
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        this._reportTree(this._fillTreeQueries([], state.masterDetailInfoCollection, state.masterDetailSummaryOptionsColumns));
        var flatList = this._flat(this._reportTree());
        this._updateSummaries(flatList);
        this._availableFieldsCount(this._reportTree().reduce(function (count, item) {
            count += item.fields.length;
            return count;
        }, 0));
        this._fieldListProvider({
            getItemByPath: function (path) {
                return $.Deferred().resolve(flatList.filter(function (x) { return x.path === path.fullPath; })[0]).promise();
            },
            getItems: function (path) {
                var deferred = $.Deferred();
                if (path.fullPath === '') {
                    deferred.resolve(_this._reportTree().filter(function (root) { return root.fields.some(function (field) { return _this._summaryInfos().every(function (summaryInfo) {
                        return summaryInfo.field() !== field;
                    }); }); }));
                }
                else {
                    var item = _this._reportTree().filter(function (x) { return x.path === path.fullPath; })[0];
                    if (item) {
                        deferred.resolve(item.fields.filter(function (field) {
                            return _this._summaryInfos().every(function (summaryInfo) { return summaryInfo.field() !== field; });
                        }));
                    }
                    else
                        deferred.resolve([]);
                }
                return deferred.promise();
            }
        });
        this._createNewItemIfNeed();
        return $.Deferred().resolve().promise();
    };
    AddSummaryFieldsPage.prototype.commit = function () {
        var masterDetailSummariesInfo = {};
        this._summaryInfos().forEach(function (summaryOption) {
            var field = summaryOption.field();
            if (!field)
                return;
            if (!masterDetailSummariesInfo[field['parent'].path]) {
                masterDetailSummariesInfo[field['parent'].path] = [];
            }
            masterDetailSummariesInfo[field['parent'].path].push({
                column: summaryOption.field(),
                summaryFunctions: summaryOption.value.value().map(function (item) {
                    return summaryOption.value.dataSource.map(function (option) { return option.value; }).indexOf(item);
                })
            });
        });
        var ignoreNullValuesForSummary = this.ignoreNullValues();
        return $.Deferred().resolve({
            masterDetailSummariesInfo: masterDetailSummariesInfo,
            ignoreNullValuesForSummary: ignoreNullValuesForSummary
        }).promise();
    };
    return AddSummaryFieldsPage;
}(analytics_wizard_1.WizardPageBase));
exports.AddSummaryFieldsPage = AddSummaryFieldsPage;
function _registerAddSummaryFieldsPage(factory) {
    chooseSummaryOptionsPage_1._registerChooseSummaryOptionsPage(factory);
    var meta = factory.getMetadata(pageId_1.ReportWizardPageId.ChooseSummaryOptionsPage);
    meta.create = function () {
        return new AddSummaryFieldsPage();
    };
    meta['disabledText'] = analytics_utils_1.getLocalization('To add a summary field to the report, select a data field (numeric, date-time or boolean) and ensure that it is not used in groups.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddSummaryFields_Placeholder');
    meta.template = 'dxrd-page-masterdetail-summary-section';
}
exports._registerAddSummaryFieldsPage = _registerAddSummaryFieldsPage;
