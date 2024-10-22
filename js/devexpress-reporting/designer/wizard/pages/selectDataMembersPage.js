﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectDataMembersPage.js)
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
var reportWizardState_1 = require("../reportWizardState");
var chooseAvailableDataSourcePage_1 = require("./chooseAvailableDataSourcePage");
var _dataUtils_1 = require("../../internal/_dataUtils");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var SelectDataMembersPage = (function (_super) {
    __extends(SelectDataMembersPage, _super);
    function SelectDataMembersPage(_fieldListCallBack, _hideDataMemberSubItems) {
        if (_hideDataMemberSubItems === void 0) { _hideDataMemberSubItems = false; }
        var _this = _super.call(this) || this;
        _this._fieldListCallBack = _fieldListCallBack;
        _this._hideDataMemberSubItems = _hideDataMemberSubItems;
        _this._rootItems = ko.observableArray([]);
        _this._dataMemberSelectedPath = ko.observable(null);
        _this._fieldSelectedPath = ko.observable(null);
        _this._checkedDataMembers = ko.observableArray([]);
        _this._checkedFields = ko.observableArray([]);
        _this._showDataSource = false;
        _this._afterCheckToggled = function (node) {
            if (!analytics_internal_1.isList(node))
                return;
            if (!node.unChecked()) {
                if (_this._checkedDataMembers.indexOf(node) === -1) {
                    if (!_this._multiSelectMode) {
                        _this._checkedDataMembers()[0] && _this._checkedDataMembers()[0].setChecked(false);
                        _this._checkedDataMembers([node]);
                    }
                    else {
                        _this._checkedDataMembers.push(node);
                    }
                    _this._fieldSelectedPath(node.path);
                }
            }
            else
                _this._checkedDataMembers.remove(node);
            _this._onChange();
        };
        _this._afterCheckToggledFields = function (node) {
            _this._processNode(node);
            _this._onChange();
        };
        _this._createMasterDetailTreeNode = function (item, isChecked, path) {
            var node = new analytics_wizard_internal_1.DataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path, _this._afterCheckToggledFields);
            _this._disposables.push(node);
            return node;
        };
        _this._createMasterDetailFirstTabTreeNode = function (item, isChecked, path) {
            var checked = isChecked || (_this._showDataSource ? [_this.dataSourcePath, _this.initialFullDataMember].join('.') : _this.initialFullDataMember) === path;
            var node = new _masterDetailWizardUtils_1.DataMemberCustomCheckedTreeNode(item.name, item.displayName, item.specifics, checked, path, _this._afterCheckToggled);
            _this._disposables.push(node);
            return node;
        };
        _this._createMasterDetailLeafTreeNode = function (item, isChecked, path) {
            var node = new analytics_wizard_internal_1.FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path, _this._afterCheckToggledFields);
            _this._disposables.push(node);
            return node;
        };
        _this._showFirstLevelDataMembers = ko.observable(false);
        _this._multiSelectMode = true;
        _this._selectDataMembersCaption = analytics_utils_1.getLocalization('Select data members', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_SelectDataMembers');
        _this._selectDataFieldsCaption = analytics_utils_1.getLocalization('Select data fields', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_SelectDataFields');
        var fieldListProvider = new analytics_internal_1.FieldListProvider(_this._wrapFieldListCallback(_this._fieldListCallBack), ko.observableArray([]));
        _this._disposables.push(_this._dataMemberItemsProvider = new analytics_wizard_internal_1.TreeNodeItemsProvider(fieldListProvider, _this._rootItems, _this._createMasterDetailFirstTabTreeNode, _this._createMasterDetailLeafTreeNode));
        _this._disposables.push(_this._fieldMemberItemsProvider = new analytics_wizard_internal_1.TreeNodeItemsProvider(fieldListProvider, _this._rootItems, _this._createMasterDetailTreeNode, _this._createMasterDetailLeafTreeNode));
        _this._availableFieldsController = new _masterDetailWizardUtils_1.AvailableFieldsTreeListController(_this._checkedDataMembers);
        _this._disposables.push(ko.computed(function () {
            var item = _this._availableFieldsController.selectedItem;
            item && item.collapsed.peek() && item.toggleCollapsed();
        }));
        _this._dataMemberFieldListModel = {
            itemsProvider: _this._dataMemberItemsProvider,
            selectedPath: _this._dataMemberSelectedPath,
            treeListController: new _masterDetailWizardUtils_1.MasterDetailTreeListController(_this._showFirstLevelDataMembers),
            templateName: 'dxrd-treelist-with-checkbox'
        };
        _this._fieldMemberFieldListModel = {
            itemsProvider: _this._fieldMemberItemsProvider,
            selectedPath: _this._fieldSelectedPath,
            treeListController: _this._availableFieldsController,
            templateName: 'dxrd-treelist-with-checkbox'
        };
        return _this;
    }
    SelectDataMembersPage.prototype._wrapFieldListCallback = function (itemsCallback) {
        var _this = this;
        return function (pathRequest) {
            if (_this._hideDataMemberSubItems) {
                return $.Deferred().resolve([]).promise();
            }
            else {
                return itemsCallback(new analytics_utils_1.PathRequest(_this._showDataSource ? pathRequest.fullPath : _this.dataSourcePath + '.' + pathRequest.fullPath), _this._dataSource);
            }
        };
    };
    Object.defineProperty(SelectDataMembersPage.prototype, "dataSourcePath", {
        get: function () {
            return (this._dataSource.id || this._dataSource.ref);
        },
        enumerable: true,
        configurable: true
    });
    SelectDataMembersPage.prototype.getDataMemberSelectedPath = function (state) {
        if (state.masterDetailInfoCollection.length > 0)
            return null;
        return state.dataMember;
    };
    SelectDataMembersPage.prototype._beginInternal = function (state) {
        var _this = this;
        if (state.reportType === reportWizardState_1.ReportType.Vertical) {
            this._multiSelectMode = false;
            this._showFirstLevelDataMembers(true);
        }
        this._dataSource = chooseAvailableDataSourcePage_1._restoreDataSourceFromState(state.newDataSource || state.dataSource);
        var dataMember = this.getDataMemberSelectedPath(state);
        this.initialFullDataMember = state.dataMember;
        if (state.masterDetailInfoCollection.length === 0) {
            return this._fieldListCallBack(new analytics_utils_1.PathRequest(this.dataSourcePath), this._dataSource)
                .done(function (fields) {
                _this._fieldSelectedPath(null);
                _this._checkedDataMembers([]);
                _this._showDataSource = false;
                if (_dataUtils_1.includeNonListItem(fields)) {
                    _this._dataMemberSelectedPath([_this.dataSourcePath, dataMember].join('.'));
                    _this._showDataSource = true;
                    _this._rootItems([{
                            name: _this.dataSourcePath,
                            displayName: _this._dataSource.name,
                            specifics: 'List'
                        }]);
                }
                else {
                    _this._dataMemberSelectedPath(dataMember);
                    _this._rootItems(fields.map(function (value) {
                        return {
                            name: value.name,
                            displayName: value.displayName || value.name,
                            specifics: 'List'
                        };
                    }));
                }
            });
        }
        else {
            return $.Deferred().resolve().promise();
        }
    };
    SelectDataMembersPage.prototype._processFields = function (node) {
        if (!node.unChecked()) {
            if (this._checkedFields.indexOf(node) === -1) {
                this._checkedFields.push(node);
            }
        }
        else
            this._checkedFields.remove(node);
        this._onChange();
    };
    SelectDataMembersPage.prototype._processNode = function (node) {
        var _this = this;
        if (analytics_internal_1.isList(node)) {
            node.children().forEach(function (item) {
                if (analytics_internal_1.isList(item)) {
                    _this._processNode(item);
                }
                else {
                    _this._processFields(item);
                }
            });
        }
        else {
            this._processFields(node);
        }
    };
    SelectDataMembersPage.prototype.canNext = function () {
        return this._fieldMemberItemsProvider.hasCheckedItems();
    };
    SelectDataMembersPage.prototype.canFinish = function () {
        return true;
    };
    SelectDataMembersPage.prototype.selectDataMember = function (dataMemberPath) {
        var _this = this;
        this._dataMemberItemsProvider.selectItemByPath(dataMemberPath).always(function () { return _this._onChange(); });
    };
    SelectDataMembersPage.prototype.selectAllDataMembers = function () {
        var _this = this;
        this._dataMemberItemsProvider.selectAllItems(false).always(function () { return _this._onChange(); });
    };
    SelectDataMembersPage.prototype.selectDataField = function (dataFieldPath) {
        var _this = this;
        var pathParts = dataFieldPath.split('.');
        pathParts.pop();
        this._dataMemberItemsProvider.selectItemByPath(pathParts.join('.')).always(function () {
            return _this._fieldMemberItemsProvider.selectItemByPath(dataFieldPath).always(function () { return _this._onChange(); });
        });
    };
    SelectDataMembersPage.prototype.selectDataFields = function (dataMemberPath) {
        var _this = this;
        this._dataMemberItemsProvider.selectItemByPath(dataMemberPath).always(function () {
            _this._fieldMemberItemsProvider.selectItemsByPath(dataMemberPath).always(function () { return _this._onChange(); });
        });
    };
    SelectDataMembersPage.prototype.selectAllDataFields = function () {
        var _this = this;
        this._dataMemberItemsProvider.selectAllItems(false).always(function () {
            return _this._fieldMemberItemsProvider.selectAllItems().always(function () { return _this._onChange(); });
        });
    };
    SelectDataMembersPage.prototype.initialize = function (state) {
        return this._beginInternal(state);
    };
    SelectDataMembersPage.prototype._haveCheckedFields = function () {
        return this._checkedFields().length !== 0;
    };
    SelectDataMembersPage.prototype.commit = function () {
        var _this = this;
        return $.Deferred().resolve({
            masterDetailInfoCollection: (this._fieldMemberItemsProvider.getRootItems().filter(function (item) { return item.isList && !item.isComplex; }).map(function (item) {
                if (_this._showDataSource)
                    item = $.extend({}, item, { name: '' });
                return new _masterDetailWizardUtils_1.MasterDetailQueryInfo(item);
            }))
        }).promise();
    };
    return SelectDataMembersPage;
}(analytics_wizard_1.WizardPageBase));
exports.SelectDataMembersPage = SelectDataMembersPage;
function _registerSelectDataMembersPage(factory, reportWizardOptions, pageId) {
    if (pageId === void 0) { pageId = pageId_1.ReportWizardPageId.SelectDataMembersPage; }
    factory.registerMetadata(pageId, {
        create: function () {
            return new SelectDataMembersPage(reportWizardOptions.callbacks.fieldListsCallback, reportWizardOptions.hideDataMemberSubItems);
        },
        description: analytics_utils_1.getLocalization('Select data members to assign to the report and its detail reports and fields to display in these reports.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_ChooseDataMembers_Description'),
        template: 'dxrd-page-masterdetail-select-reportdata',
        getState: function (state) { return state; },
        setState: function (data, state) { return state.masterDetailInfoCollection = data.masterDetailInfoCollection; },
        resetState: function (state, defaultState) { return state.masterDetailInfoCollection = defaultState.masterDetailInfoCollection; }
    });
}
exports._registerSelectDataMembersPage = _registerSelectDataMembersPage;
