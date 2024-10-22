﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectColumnsPage.js)
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
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var _utils_1 = require("../../_utils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var $ = require("jquery");
var LegacySelectColumnsPage = (function (_super) {
    __extends(LegacySelectColumnsPage, _super);
    function LegacySelectColumnsPage(getFieldListItems) {
        var _this = _super.call(this) || this;
        _this._selectedPath = null;
        _this._fields = [];
        _this.select = function () {
            _this.selectedFields.add(_this.availableFields.activeItem);
            _this.availableFields.removeActiveItem();
        };
        _this.selectAll = function () {
            _this.selectedFields.setItems(_this._fields.slice(0));
            _this.availableFields.removeAll();
        };
        _this.unselect = function () {
            _this.availableFields.add(_this.selectedFields.activeItem);
            _this.selectedFields.removeActiveItem();
        };
        _this.unselectAll = function () {
            _this.availableFields.setItems(_this._fields.slice(0));
            _this.selectedFields.removeAll();
        };
        _this.availableFieldDblClick = function (field) {
            _this.availableFields.activeItem = field;
            _this.select();
        };
        _this.availableFieldClick = function (e) {
            _this.availableFields.activeItem = e.itemData;
        };
        _this.selectedFieldDblClick = function (field) {
            _this.selectedFields.activeItem = field;
            _this.unselect();
        };
        _this.selectedFieldClick = function (e) {
            _this.selectedFields.activeItem = e.itemData;
        };
        _this.availableFields = new _utils_1.ListViewModel(analytics_utils_1.getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields'));
        _this.selectedFields = new _utils_1.ListViewModel(analytics_utils_1.getLocalization('Selected fields', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectedFields'));
        _this._fieldListsCallback = getFieldListItems;
        return _this;
    }
    LegacySelectColumnsPage.prototype.canFinish = function () {
        return true;
    };
    LegacySelectColumnsPage.prototype.canNext = function () {
        return !this.selectedFields.isEmpty;
    };
    LegacySelectColumnsPage.prototype.selectedPath = function () {
        return this._selectedPath;
    };
    LegacySelectColumnsPage.prototype.reset = function () {
        this._selectedPath = null;
    };
    LegacySelectColumnsPage.prototype.initialize = function (state) {
        var _this = this;
        this.selectedFields.setItems(state.fields || []);
        if (this._selectedPath != state.dataMemberPath) {
            return this._fieldListsCallback(new analytics_utils_1.PathRequest(state.dataMemberPath), chooseAvailableDataSourcePage_1._restoreDataSourceFromState(state.newDataSource || state.dataSource))
                .done(function (fields) {
                _this._fields = fields.filter(function (item) {
                    return (item.specifics !== 'List' && item.specifics !== 'ListSource' && item.isList !== true);
                });
                _this._selectedPath = state.dataMemberPath;
                _this.availableFields.setItems(_this._fields.filter(function (value) {
                    return _this.selectedFields.items.indexOf(value) === -1;
                }));
            });
        }
        else {
            this.availableFields.setItems(this._fields.filter(function (value) {
                return _this.selectedFields.items.indexOf(value) === -1;
            }));
            return $.Deferred().resolve().promise();
        }
    };
    LegacySelectColumnsPage.prototype.commit = function () {
        return $.Deferred().resolve({
            fields: this.selectedFields.items
        }).promise();
    };
    LegacySelectColumnsPage.prototype.isSelectEnable = function () {
        return !!this.availableFields.activeItem;
    };
    LegacySelectColumnsPage.prototype.isUnselectEnable = function () {
        return !!this.selectedFields.activeItem;
    };
    return LegacySelectColumnsPage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacySelectColumnsPage = LegacySelectColumnsPage;
function _registerLegacySelectColumnsPage(factory, fieldListItemsCallback) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.SelectColumnsPage, {
        setState: function (data, state) {
            state.fields = data.fields;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.fields = defaultState.fields;
        },
        create: function () {
            return new LegacySelectColumnsPage(fieldListItemsCallback);
        },
        template: 'dxrd-page-columns',
        description: analytics_utils_1.getLocalization('Select the columns you want to display within your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseColumns')
    });
}
exports._registerLegacySelectColumnsPage = _registerLegacySelectColumnsPage;
