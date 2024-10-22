﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\addGroupingLevelPage.js)
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
var _utils_1 = require("../../_utils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var LegacyAddGroupingLevelPage = (function (_super) {
    __extends(LegacyAddGroupingLevelPage, _super);
    function LegacyAddGroupingLevelPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = new _utils_1.ListViewModel(analytics_utils_1.getLocalization('Available fields', 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields'));
        _this.groups = new _utils_1.ListViewModel(analytics_utils_1.getLocalization('Groups', 'ASPxReportsStringId.ReportDesigner_Groups'));
        _this.addNewGroup = function () {
            if (_this.isCreateGroupEnabled()) {
                _this.groups.add({ fields: ko.observableArray([_this.fields.activeItem]) });
                _this.fields.removeActiveItem();
            }
        };
        _this.appendFieldsToGroup = function () {
            if (_this.isAppendToGroupEnabled()) {
                _this.groups.activeItem.fields.push(_this.fields.activeItem);
                _this.fields.removeActiveItem();
            }
        };
        _this.removeGroup = function () {
            if (_this.isRemoveGroupEnabled()) {
                _this.fields.addRange(_this.groups.activeItem.fields());
                _this.groups.removeActiveItem();
            }
        };
        _this.moveUp = function () {
            _this.groups.moveUp();
        };
        _this.moveDown = function () {
            _this.groups.moveDown();
        };
        _this.fieldDblClick = function (field) {
            _this.fields.activeItem = field;
            _this.addNewGroup();
        };
        _this.fieldClick = function (e) {
            _this.fields.activeItem = e.itemData;
        };
        _this.groupDblClick = function (group) {
            _this.groups.activeItem = group;
            _this.removeGroup();
        };
        _this.groupClick = function (e) {
            _this.groups.activeItem = e.itemData;
        };
        return _this;
    }
    LegacyAddGroupingLevelPage.prototype.canFinish = function () {
        return true;
    };
    LegacyAddGroupingLevelPage.prototype.isCreateGroupEnabled = function () {
        return !!this.fields.activeItem;
    };
    LegacyAddGroupingLevelPage.prototype.isAppendToGroupEnabled = function () {
        return this.fields.activeItem && this.groups.activeItem && this.groups.activeItem.fields().length > 0;
    };
    LegacyAddGroupingLevelPage.prototype.isRemoveGroupEnabled = function () {
        return this.groups.activeItem && this.groups.activeItem.fields().length > 0;
    };
    LegacyAddGroupingLevelPage.prototype.isMoveUpEnabled = function () {
        return this.groups.isMoveUpEnabled();
    };
    LegacyAddGroupingLevelPage.prototype.isMoveDownEnabled = function () {
        return this.groups.isMoveDownEnabled();
    };
    LegacyAddGroupingLevelPage.prototype.initialize = function (state) {
        this.initialFields = state.fields || [];
        var fields = ko.observableArray((state.fields || []).map(function (value, index, array) { return value.displayName; }));
        this.groups.setItems((state.groups || []).map(function (value) {
            fields.removeAll(value);
            return { fields: ko.observableArray(value) };
        }));
        this.fields.setItems(fields());
        return $.Deferred().resolve().promise();
    };
    LegacyAddGroupingLevelPage.prototype.commit = function () {
        var _this = this;
        var groups = this.groups.items.map(function (item) {
            return item.fields();
        });
        var summaryColumns = [];
        if (!this.groups.isEmpty) {
            this.fields.items.forEach(function (fieldName) {
                var field = analytics_internal_1.getFirstItemByPropertyValue(_this.initialFields, 'displayName', fieldName);
                if (field.specifics && ['integer', 'float', 'date'].indexOf(field.specifics.toLowerCase()) > -1) {
                    summaryColumns.push(field);
                }
            });
            summaryColumns.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
        return $.Deferred().resolve({
            groups: groups,
            summaryOptionsColumns: summaryColumns
        }).promise();
    };
    return LegacyAddGroupingLevelPage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacyAddGroupingLevelPage = LegacyAddGroupingLevelPage;
function _registerLegacyAddGroupingLevelPage(factory) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.AddGroupingLevelPage, {
        setState: function (data, state) {
            state.groups = data.groups;
            state.summaryOptionsColumns = data.summaryOptionsColumns;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.groups = defaultState.groups;
            state.summaryOptionsColumns = defaultState.summaryOptionsColumns;
        },
        create: function () {
            return new LegacyAddGroupingLevelPage();
        },
        template: 'dxrd-page-groups',
        description: analytics_utils_1.getLocalization('Create multiple groups, each with a single field value, or define several fields in the same group.', 'ASPxReportsStringId.ReportDesigner_Wizard_CreateGroups')
    });
}
exports._registerLegacyAddGroupingLevelPage = _registerLegacyAddGroupingLevelPage;
