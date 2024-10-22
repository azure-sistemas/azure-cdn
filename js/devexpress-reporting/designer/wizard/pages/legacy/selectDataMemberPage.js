﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectDataMemberPage.js)
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
var _utils_1 = require("../../internal/_utils");
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var DataMemberPageTreeListController = (function (_super) {
    __extends(DataMemberPageTreeListController, _super);
    function DataMemberPageTreeListController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMemberPageTreeListController.prototype.canSelect = function (value) {
        return (this.hasItems(value.data) && !!value.path) || value.data.specifics === 'none';
    };
    return DataMemberPageTreeListController;
}(analytics_widgets_internal_1.DataMemberTreeListController));
var LegacyChooseDataMemberPage = (function (_super) {
    __extends(LegacyChooseDataMemberPage, _super);
    function LegacyChooseDataMemberPage(reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this._rootItems = ko.observableArray([]);
        _this._selectedPath = ko.observable(null);
        _this._fieldListCallBack = reportWizardOptions.callbacks.fieldListsCallback;
        _this._createSqlDataSourceInfo = reportWizardOptions.callbacks.createSqlDataSourceInfo;
        _this._hideDataMemberSubItems = reportWizardOptions.hideDataMemberSubItems;
        _this.scrollViewHeight = _utils_1._masterDetailScrollViewHeight;
        _this.fieldListModel = {
            itemsProvider: new analytics_internal_1.FieldListProvider(_this._wrapFieldListCallback(_this._fieldListCallBack), _this._rootItems),
            selectedPath: _this._selectedPath,
            treeListController: new DataMemberPageTreeListController()
        };
        return _this;
    }
    LegacyChooseDataMemberPage.prototype._wrapFieldListCallback = function (itemsCallback) {
        var _this = this;
        return function (pathRequest) {
            if (_this._hideDataMemberSubItems) {
                var deferred = $.Deferred();
                deferred.resolve([]);
                return deferred.promise();
            }
            else {
                return itemsCallback(new analytics_utils_1.PathRequest(_this.dataSourcePath + '.' + pathRequest.fullPath), _this._dataSource);
            }
        };
    };
    Object.defineProperty(LegacyChooseDataMemberPage.prototype, "dataSourcePath", {
        get: function () {
            return (this._dataSource.id || this._dataSource.ref);
        },
        enumerable: true,
        configurable: true
    });
    LegacyChooseDataMemberPage.prototype._beginInternal = function (state) {
        var _this = this;
        this._dataSource = chooseAvailableDataSourcePage_1._restoreDataSourceFromState(state.newDataSource || state.dataSource);
        if (!state.dataMemberPath) {
            return this._fieldListCallBack(new analytics_utils_1.PathRequest(this.dataSourcePath), this._dataSource).done(function (fields) {
                _this._selectedPath(null);
                _this._rootItems(fields.map(function (value) {
                    return {
                        name: value.displayName,
                        id: value.name,
                        specifics: 'List',
                        dataSerializer: null,
                        data: {}
                    };
                }));
            });
        }
        else {
            this._selectedPath(state.dataMemberPath.replace(this.dataSourcePath + '.', ''));
            return $.Deferred().resolve().promise();
        }
    };
    LegacyChooseDataMemberPage.prototype.canNext = function () {
        return !!this._selectedPath();
    };
    LegacyChooseDataMemberPage.prototype.canFinish = function () {
        return !!this._selectedPath();
    };
    LegacyChooseDataMemberPage.prototype.initialize = function (state) {
        return this._beginInternal(state);
    };
    LegacyChooseDataMemberPage.prototype.commit = function () {
        return $.Deferred().resolve({
            dataMemberPath: analytics_internal_1.getFullPath(this.dataSourcePath, this._selectedPath()),
            dataMemberInfo: this.fieldListModel.treeListController.selectedItem && this.fieldListModel.treeListController.selectedItem.data
        }).promise();
    };
    return LegacyChooseDataMemberPage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacyChooseDataMemberPage = LegacyChooseDataMemberPage;
function _registerLegacyChooseDataMemberPage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.ChooseDataMemberPage, {
        setState: function (data, state) {
            state.dataMemberInfo = data.dataMemberInfo;
            state.dataMemberPath = data.dataMemberPath;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.dataMemberInfo = defaultState.dataMemberInfo;
            state.dataMemberPath = defaultState.dataMemberPath;
        },
        create: function () {
            return new LegacyChooseDataMemberPage(reportWizardOptions);
        },
        template: 'dxrd-page-dataMember',
        description: analytics_utils_1.getLocalization('The table or view you choose determines wich columns will be available in your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataMember')
    });
}
exports._registerLegacyChooseDataMemberPage = _registerLegacyChooseDataMemberPage;
