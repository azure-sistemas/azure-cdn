﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelSection.js)
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
var $ = require("jquery");
var ko = require("knockout");
var addGroupingLevelPage_1 = require("./addGroupingLevelPage");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _GroupsFieldStore = (function (_super) {
    __extends(_GroupsFieldStore, _super);
    function _GroupsFieldStore(query, _onChange) {
        var _this = _super.call(this) || this;
        _this._onChange = _onChange;
        _this.groups = ko.observableArray();
        _this.addGroupText = function () { return analytics_utils_1.getLocalization('Add Group', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroup_Text'); };
        _this.path = query.path;
        _this.displayName = query.displayName;
        _this.dataSource = ko.observableArray(query.fields.map(function (x) {
            return $.extend(true, {}, x, { visible: ko.observable(true) });
        }));
        return _this;
    }
    _GroupsFieldStore.prototype.dispose = function () {
        this.disposeObservableArray(this.groups);
    };
    _GroupsFieldStore.prototype.getSelectedFieldsFlat = function () {
        return [].concat.apply([], [[]].concat(this.getSelectedFields()));
    };
    _GroupsFieldStore.prototype.getSelectedFields = function () {
        return this.groups().filter(function (x) { return x.fields().length > 0; }).map(function (x) { return x.fields(); });
    };
    _GroupsFieldStore.prototype.isCreateGroupEnabled = function () {
        var groupsWithoutFields = this.groups().filter(function (x) { return x.fields().length === 0; }).length;
        var newAvailableGroupsCount = this.dataSource().length - this.getSelectedFieldsFlat().length;
        return newAvailableGroupsCount - groupsWithoutFields > 0;
    };
    _GroupsFieldStore.prototype.add = function () {
        this.groups.push(new _GroupField(this, this._onChange));
        this._onChange();
    };
    _GroupsFieldStore.prototype.remove = function (index) {
        this.groups()[index].dispose();
        this.groups.splice(index, 1);
        this._onChange();
    };
    _GroupsFieldStore.prototype.moveUpDisabled = function (index) {
        return index === 0;
    };
    _GroupsFieldStore.prototype.moveDownDisabled = function (index) {
        return index === this.groups().length - 1;
    };
    _GroupsFieldStore.prototype.moveup = function (index) {
        var groups = this.groups();
        groups.splice(index - 1, 2, groups[index], groups[index - 1]);
        this.groups.valueHasMutated();
        this._onChange();
    };
    _GroupsFieldStore.prototype.movedown = function (index) {
        var groups = this.groups();
        groups.splice(index, 2, groups[index + 1], groups[index]);
        this.groups.valueHasMutated();
        this._onChange();
    };
    return _GroupsFieldStore;
}(analytics_utils_1.Disposable));
exports._GroupsFieldStore = _GroupsFieldStore;
var _GroupField = (function (_super) {
    __extends(_GroupField, _super);
    function _GroupField(_store, _onChange) {
        var _this = _super.call(this) || this;
        _this._store = _store;
        _this._onChange = _onChange;
        _this.fields = ko.observableArray();
        _this._disposables.push(_this.fields.subscribe(function () { return _this._onChange(); }));
        var needRefresh = true;
        _this.value = {
            dataSource: _this._store.dataSource,
            showDropDownButton: true,
            searchEnabled: true,
            value: _this.fields,
            multiline: false,
            showSelectionControls: true,
            valueExpr: 'name',
            displayExpr: 'displayName',
            searchExpr: ['displayName'],
            onOpened: function (e) {
                _this._updateDataSource();
                if (e.component._popup) {
                    var _$content = $(e.component.content());
                    var _selectAll = _$content.find('.dx-list-select-all');
                    var _popupHeight = _$content.height();
                    _selectAll.css('display', 'none');
                    _$content.height(_popupHeight - _selectAll.outerHeight());
                    e.component._popup.refreshPosition();
                }
                if (needRefresh) {
                    e.component._refresh();
                    needRefresh = false;
                }
            },
            onClosed: function (e) {
                _this._store.dataSource().forEach(function (x) { return x.visible(true); });
                needRefresh = true;
            },
        };
        return _this;
    }
    _GroupField.prototype._updateDataSource = function () {
        var _this = this;
        this._store.dataSource().forEach(function (item) {
            item.visible(!_this._store.groups.peek().some(function (group) {
                return group !== _this && group.fields().indexOf(item.name) !== -1;
            }));
        });
    };
    _GroupField.prototype.getOptions = function (options) {
        return analytics_internal_1.extend(this.value, { dropDownOptions: options.dropDownOptions });
    };
    return _GroupField;
}(analytics_utils_1.Disposable));
exports._GroupField = _GroupField;
var AddGroupFieldsPage = (function (_super) {
    __extends(AddGroupFieldsPage, _super);
    function AddGroupFieldsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._reportTree = [];
        _this._groupInfos = ko.observableArray();
        return _this;
    }
    AddGroupFieldsPage.prototype.dispose = function () {
        this.disposeObservableArray(this._groupInfos);
    };
    AddGroupFieldsPage.prototype.canFinish = function () {
        return true;
    };
    AddGroupFieldsPage.prototype._mergeGroups = function (newGroups) {
        var currentGroups = this._groupInfos();
        newGroups.forEach(function (groupInfo) {
            var currentGroup = currentGroups.filter(function (group) { return group.displayName === groupInfo.displayName; })[0];
            if (!currentGroup || currentGroup.groups().length === 0)
                return;
            currentGroup.groups().filter(function (group) { return group.fields().length > 0; }).forEach(function (group) {
                var availabelFields = groupInfo.dataSource().filter(function (field) { return group.fields().some(function (x) { return x === field.name; }); });
                if (availabelFields.length > 0) {
                    groupInfo.add();
                    groupInfo.groups()[groupInfo.groups().length - 1].fields(availabelFields.map(function (x) { return x.name; }));
                }
            });
        });
        this.disposeObservableArray(this._groupInfos);
    };
    AddGroupFieldsPage.prototype.initialize = function (state) {
        var _this = this;
        this._reportTree = addGroupingLevelPage_1._fillTreeQueries([], state.masterDetailInfoCollection, 0).map(function (item) { return $.extend(true, {}, item); });
        var newGroups = this._reportTree.filter(function (x) { return x.fields.length > 0; }).map(function (x) { return new _GroupsFieldStore(x, _this._onChange); });
        this._mergeGroups(newGroups);
        this._groupInfos(newGroups);
        return $.Deferred().resolve().promise();
    };
    AddGroupFieldsPage.prototype.commit = function () {
        var masterDetailGroups = {};
        var masterDetailSummaryOptionsColumns = {};
        this._groupInfos().forEach(function (groupInfo) {
            var selectedFields = groupInfo.getSelectedFields();
            if (selectedFields.length > 0) {
                masterDetailGroups[groupInfo.path] = selectedFields;
            }
        });
        this._reportTree.forEach(function (query) {
            var availableFields = query.fields.filter(function (field) { return field.specifics && ['integer', 'float', 'date', 'bool'].indexOf(field.specifics.toLowerCase()) > -1; });
            if (masterDetailGroups[query.path]) {
                availableFields = availableFields.filter(function (field) { return masterDetailGroups[query.path].some(function (items) { return items.indexOf(field.name) === -1; }); });
            }
            if (availableFields.length > 0) {
                masterDetailSummaryOptionsColumns[query.path] = availableFields;
            }
        });
        return $.Deferred().resolve({
            masterDetailGroups: masterDetailGroups,
            masterDetailSummaryOptionsColumns: masterDetailSummaryOptionsColumns
        }).promise();
    };
    return AddGroupFieldsPage;
}(analytics_wizard_1.WizardPageBase));
exports.AddGroupFieldsPage = AddGroupFieldsPage;
function _registerAddGroupFieldsPage(factory) {
    addGroupingLevelPage_1._registerAddGroupingLevelPage(factory);
    var meta = factory.getMetadata(pageId_1.ReportWizardPageId.AddGroupingLevelPage);
    meta.create = function () {
        return new AddGroupFieldsPage();
    };
    meta['disabledText'] = analytics_utils_1.getLocalization('To add groups to the report, select data fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroupFields_Placeholder');
    meta.template = 'dxrd-page-masterdetail-groups-section';
}
exports._registerAddGroupFieldsPage = _registerAddGroupFieldsPage;
