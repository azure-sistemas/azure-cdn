﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelPage.js)
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
var _utils_1 = require("../_utils");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
function _fillTreeQueries(reportTree, queries, level, parentDisplayName) {
    var lvl = level;
    queries.forEach(function (query) {
        if (query.checked !== false) {
            var fields = query.fields.filter(function (field) { return field.checked; }).map((function (value) { return { name: value.name, displayName: value.displayName, specifics: value.specifics }; }));
            var name = query.displayName || query.name;
            var displayName = parentDisplayName ? [parentDisplayName, name].join('.') : name;
            reportTree.push({
                name: name,
                displayName: displayName,
                path: query.path,
                fields: fields,
                isList: true,
                level: level
            });
            if (query.relations.length > 0) {
                var newLvl = lvl + 1;
                _fillTreeQueries(reportTree, query.relations, newLvl, displayName);
            }
        }
    });
    return reportTree;
}
exports._fillTreeQueries = _fillTreeQueries;
var AddGroupingLevelPage = (function (_super) {
    __extends(AddGroupingLevelPage, _super);
    function AddGroupingLevelPage() {
        var _this = _super.call(this) || this;
        _this._availableColumns = {};
        _this._groupingLevels = {};
        _this._masterDetailGroups = {};
        _this._addNewGroup = function () {
            if (_this._isCreateGroupEnabled()) {
                _this._currentGroups().add({ fields: ko.observableArray([_this._currentFields().activeItem]) });
                _this._currentFields().removeActiveItem();
                _this._onChange();
            }
        };
        _this._appendFieldsToGroup = function () {
            if (_this._isAppendToGroupEnabled()) {
                _this._currentGroups().activeItem.fields.push(_this._currentFields().activeItem);
                _this._currentFields().removeActiveItem();
                _this._onChange();
            }
        };
        _this._removeGroup = function () {
            if (_this._isRemoveGroupEnabled()) {
                _this._currentFields().addRange(_this._currentGroups().activeItem.fields());
                _this._currentGroups().removeActiveItem();
                _this._onChange();
            }
        };
        _this._moveUp = function () {
            !!_this._currentGroups() && _this._currentGroups().moveUp();
            _this._onChange();
        };
        _this._moveDown = function () {
            !!_this._currentGroups() && _this._currentGroups().moveDown();
            _this._onChange();
        };
        _this._fieldDblClick = function (field) {
            _this._currentFields().activeItem = field;
            _this._addNewGroup();
        };
        _this._fieldClick = function (e) {
            _this._currentFields().activeItem = e.itemData;
        };
        _this._groupDblClick = function (group) {
            _this._currentGroups().activeItem = group;
            _this._removeGroup();
        };
        _this._groupClick = function (e) {
            _this._currentGroups().activeItem = e.itemData;
        };
        _this._currentPath = ko.observable('');
        _this._currentFields = ko.observable(null);
        _this._currentGroups = ko.observable(null);
        _this._fieldCaption = analytics_utils_1.getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields');
        _this._groupCaption = analytics_utils_1.getLocalization('Groups', 'ASPxReportsStringId.ReportDesigner_Groups');
        _this._reportTree = ko.observableArray([]);
        _this._disposables.push(_this._currentPath.subscribe(function (newPath) {
            _this._currentGroups(_this._groupingLevels[newPath]);
            _this._currentFields(_this._availableColumns[newPath]);
        }));
        return _this;
    }
    AddGroupingLevelPage.prototype._setData = function (queries) {
        var _this = this;
        queries.forEach(function (query) {
            if (!_this._groupingLevels[query.path] || !_this._availableColumns[query.path]) {
                _this._availableColumns[query.path] = new _utils_1.ListViewModel();
                _this._groupingLevels[query.path] = new _utils_1.ListViewModel();
            }
            if (!_this._masterDetailGroups[query.path]) {
                _this._masterDetailGroups[query.path] = [];
            }
            var fields = ko.observableArray(query.fields.map(function (value) { return value.displayName; }));
            _this._groupingLevels[query.path].setItems(_this._masterDetailGroups[query.path].map(function (value) {
                fields.removeAll(value);
                return { fields: ko.observableArray(value) };
            }));
            _this._availableColumns[query.path].setItems(fields());
        });
    };
    AddGroupingLevelPage.prototype.canFinish = function () {
        return true;
    };
    AddGroupingLevelPage.prototype._isCreateGroupEnabled = function () {
        return !!this._currentFields() && !!this._currentFields().activeItem;
    };
    AddGroupingLevelPage.prototype._isAppendToGroupEnabled = function () {
        return !!this._currentFields() && this._currentFields().activeItem && !!this._currentGroups() && this._currentGroups().activeItem && this._currentGroups().activeItem.fields().length > 0;
    };
    AddGroupingLevelPage.prototype._isRemoveGroupEnabled = function () {
        return !!this._currentGroups() && this._currentGroups().activeItem && this._currentGroups().activeItem.fields().length > 0;
    };
    AddGroupingLevelPage.prototype._isMoveUpEnabled = function () {
        return !!this._currentGroups() && this._currentGroups().isMoveUpEnabled();
    };
    AddGroupingLevelPage.prototype._isMoveDownEnabled = function () {
        return !!this._currentGroups() && this._currentGroups().isMoveDownEnabled();
    };
    AddGroupingLevelPage.prototype.initialize = function (state) {
        this._reportTree(_fillTreeQueries([], state.masterDetailInfoCollection, 0).map(function (item) { return $.extend(true, {}, item); }));
        this._masterDetailGroups = $.extend(true, {}, state.masterDetailGroups);
        var firstPath = this._reportTree()[0] && this._reportTree()[0].path;
        if (firstPath) {
            this._setData(this._reportTree());
            this._currentPath(firstPath);
            if (firstPath === this._currentPath.peek())
                this._currentPath.notifySubscribers(firstPath);
        }
        return $.Deferred().resolve().promise();
    };
    AddGroupingLevelPage.prototype.commit = function () {
        var _this = this;
        var masterDetailGroups = {};
        var masterDetailSummaryOptionsColumns = {};
        this._reportTree().forEach(function (query) {
            if (_this._groupingLevels[query.path].items.length > 0) {
                masterDetailGroups[query.path] = _this._groupingLevels[query.path].items.map(function (item) {
                    return item.fields().map(function (displayName) { return analytics_internal_1.getFirstItemByPropertyValue(query.fields, 'displayName', displayName).name; });
                });
            }
            if (_this._availableColumns[query.path]) {
                var summaryColumns = [];
                masterDetailSummaryOptionsColumns[query.path] = [];
                _this._availableColumns[query.path].items.forEach(function (fieldName) {
                    var field = analytics_internal_1.getFirstItemByPropertyValue(query.fields, 'displayName', fieldName);
                    if (field.specifics && ['integer', 'float', 'date'].indexOf(field.specifics.toLowerCase()) > -1) {
                        summaryColumns.push(field);
                    }
                });
                summaryColumns.sort(function (a, b) { return a.name.localeCompare(b.name); });
                if (summaryColumns.length === 0)
                    delete masterDetailSummaryOptionsColumns[query.path];
                else
                    masterDetailSummaryOptionsColumns[query.path] = summaryColumns;
            }
        });
        return $.Deferred().resolve({
            masterDetailGroups: masterDetailGroups,
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns
        }).promise();
    };
    return AddGroupingLevelPage;
}(analytics_wizard_1.WizardPageBase));
exports.AddGroupingLevelPage = AddGroupingLevelPage;
function _registerAddGroupingLevelPage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.AddGroupingLevelPage, {
        create: function () {
            return new AddGroupingLevelPage();
        },
        getState: function (state) { return state; },
        setState: function (data, state) {
            state.masterDetailGroups = data.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = data.masterDetailSummaryOptionsColumns;
        },
        description: analytics_utils_1.getLocalization('Group data in the selected reports. You can specify one or more fields for each group.', 'ReportBoxDesignerStringId.Wizard_MasterDetailAddGroupingLevel_Description'),
        template: 'dxrd-page-masterdetail-groups',
        resetState: function (state, defaultState) {
            state.masterDetailGroups = defaultState.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = defaultState.masterDetailSummaryOptionsColumns;
        }
    });
}
exports._registerAddGroupingLevelPage = _registerAddGroupingLevelPage;
