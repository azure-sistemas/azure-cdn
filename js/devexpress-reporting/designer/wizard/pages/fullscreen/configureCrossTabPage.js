﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\configureCrossTabPage.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var $ = require("jquery");
var ko = require("knockout");
var _crossTabDragUtils_1 = require("../../internal/_crossTabDragUtils");
var _utils_1 = require("../../internal/_utils");
var selectDataMembersPage_1 = require("../selectDataMembersPage");
var SelectCrossTabDataMember = (function (_super) {
    __extends(SelectCrossTabDataMember, _super);
    function SelectCrossTabDataMember(_fieldListCallBack, _hideDataMemberSubItems) {
        if (_hideDataMemberSubItems === void 0) { _hideDataMemberSubItems = false; }
        var _this = _super.call(this, _fieldListCallBack, _hideDataMemberSubItems) || this;
        _this._pageRendered = false;
        _this._createCrossTabLeafTreeNode = function (item, isChecked, path) {
            var field = new analytics_wizard_internal_1.FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
            _this._disposables.push(field);
            clearTimeout(_this._timeout);
            _this._timeout = setTimeout(function () {
                if (!_this._pageRendered && _this._firstRenderNode.initialized()) {
                    _this._afteCheck(_this._firstRenderNode);
                    _this._pageRendered = true;
                }
            }, 1);
            field.disabled(!field.checked());
            _this._disposables.push(field.checked.subscribe(function (val) {
                field.disabled(!val);
            }));
            return field;
        };
        _this._createCrossTabTreeNode = function (item, isChecked, path) {
            var node = new analytics_wizard_internal_1.SingleCheckedDataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path, _this._afteCheck);
            _this._disposables.push(node);
            if (!_this._firstRenderNode) {
                _this._firstRenderNode = node;
            }
            return node;
        };
        _this._afteCheck = function (node) {
            var rootItems = _this._signleFieldMemberFieldListModel.itemsProvider.getRootItems();
            rootItems.forEach(function (item) {
                item.setChecked(false);
            });
            node._checked(true);
            node.children().forEach(function (item) {
                item.setChecked(item.isList ? false : true);
            });
            _this._onChange();
        };
        _this._title = 'Avalible Fields';
        _this._icon = 'dxrd-svg-wizard-crosstab-fields';
        var fieldListProvider = new analytics_internal_1.FieldListProvider(_this._wrapFieldListCallback(_fieldListCallBack), ko.observableArray([]));
        _this._disposables.push(_this._itemsProvider = new analytics_wizard_internal_1.TreeNodeItemsProvider(fieldListProvider, _this._rootItems, _this._createCrossTabTreeNode, _this._createCrossTabLeafTreeNode));
        _this._disposables.push(_this._controller = new _crossTabDragUtils_1.CrossTabWizardFieldListController());
        _this._dragHelperContent = new analytics_internal_1.DragHelperContent(null);
        _this._disposables.push(_this._controller.dragDropHandler = new _crossTabDragUtils_1.CrossTabWizardDragDropHandler(_this._dragHelperContent, function (dropTarget, name) {
            if (dropTarget && dropTarget instanceof ConfigureCrossTabPage)
                dropTarget.addInfo(name);
        }));
        _this._signleFieldMemberFieldListModel = {
            itemsProvider: _this._itemsProvider,
            selectedPath: ko.observable(null),
            treeListController: _this._controller,
            templateName: 'dxrd-treelist-with-checkbox'
        };
        return _this;
    }
    SelectCrossTabDataMember.prototype._findFirstCheckedField = function (dataMembers) {
        var result = null;
        for (var i = 0; i < dataMembers.length; i++) {
            var element = dataMembers[i];
            if (element.checked()) {
                result = element;
                break;
            }
            if (element.children && element.children().length) {
                result = this._findFirstCheckedField(element.children().filter(function (x) { return x.isList; }));
                if (result)
                    break;
            }
        }
        return result;
    };
    SelectCrossTabDataMember.prototype.commit = function () {
        var dataMember = this._findFirstCheckedField(this._itemsProvider.getRootItems());
        var result = dataMember ? {
            crossTabFields: dataMember && dataMember.children().filter(function (x) { return !x.isList; }) || [],
            dataMemberPath: analytics_internal_1.getFullPath(this.dataSourcePath, dataMember.path),
            dataMemberInfo: dataMember
        } : {};
        return $.Deferred().resolve(result).promise();
    };
    return SelectCrossTabDataMember;
}(selectDataMembersPage_1.SelectDataMembersPage));
exports.SelectCrossTabDataMember = SelectCrossTabDataMember;
var ConfigureCrossTabPage = (function (_super) {
    __extends(ConfigureCrossTabPage, _super);
    function ConfigureCrossTabPage(stateName, itemInfo, title, localizationId) {
        var _this = _super.call(this) || this;
        _this.stateName = stateName;
        _this.itemInfo = itemInfo;
        _this.changeAlways = true;
        _this.underCursor = ko.observable(new analytics_internal_1.HoverInfo());
        _this._crossTabFields = ko.observableArray([]);
        _this._template = 'dxrd-page-crosstab-setlayout';
        _this.fieldInfos = ko.observableArray([]);
        _this._title = analytics_utils_1.getLocalization(title, localizationId);
        _this._icon = 'dxrd-svg-wizard-crosstab-' + title.toLowerCase();
        _this._fieldName = analytics_utils_1.getLocalization('Field Name', 'ASPxReportsStringId.ReportDesigner_Wizard_PageCrossTab_FieldName_Caption');
        _this._valueName = analytics_utils_1.getLocalization(itemInfo.displayName, itemInfo.localizationId);
        _this._disposables.push(_this.isDroppable = ko.computed(function () {
            if (analytics_internal_1.DragDropHandler.started())
                return _this.underCursor().isOver;
            else
                return false;
        }));
        return _this;
    }
    ConfigureCrossTabPage.prototype._removeInfo = function (item) {
        this.fieldInfos.splice(this.fieldInfos.indexOf(item), 1);
        this.addInfo();
    };
    ConfigureCrossTabPage.prototype.addInfo = function (fieldName) {
        var _this = this;
        var newField = analytics_internal_1.findFirstItemMatchesCondition(this.fieldInfos(), function (item) { return item.field() === null; });
        if (!newField) {
            newField = new _utils_1.FieldInfo(this.itemInfo.valuesArray);
            this.fieldInfos.push(newField);
            this._disposables.push(newField.field.subscribe(function (newValue) {
                if (!newField.functionValue())
                    _this.setFieldDefaultValue(_this.itemInfo.defaultVal, newField);
                _this.addInfo();
                _this._onChange();
            }));
        }
        if (fieldName) {
            var field = analytics_internal_1.findFirstItemMatchesCondition(this._crossTabFields(), function (item) { return item.name === fieldName; });
            newField.field(field);
        }
    };
    ConfigureCrossTabPage.prototype.setFieldDefaultValue = function (defaultVal, fieldInfo) {
        fieldInfo.functionValue(analytics_internal_1.findFirstItemMatchesCondition(fieldInfo.value.dataSource, function (item) { return item.value === defaultVal; }));
    };
    ConfigureCrossTabPage.prototype.initialize = function (state, stateChanged) {
        if (stateChanged === void 0) { stateChanged = false; }
        if (stateChanged) {
            state[this.stateName] = [];
            this.fieldInfos([]);
        }
        this._crossTabFields(state.crossTabFields);
        this.addInfo();
        return $.Deferred().resolve().promise();
    };
    ConfigureCrossTabPage.prototype.canFinish = function () {
        return true;
    };
    return ConfigureCrossTabPage;
}(analytics_wizard_1.WizardPageBase));
exports.ConfigureCrossTabPage = ConfigureCrossTabPage;
function _registerConfigureCrossTabPage(factory, pageId, title, localizationId, info) {
    var stateName = 'crossTab' + title + 'FieldInfo';
    factory.registerMetadata(pageId, {
        setState: function (data, state) { },
        getState: function (state) { return state; },
        resetState: function (state, defaultState) { },
        create: function () {
            return new ConfigureCrossTabPage(stateName, info, title, localizationId);
        },
        template: 'dxrd-page-crosstab-setlayout',
    });
}
exports._registerConfigureCrossTabPage = _registerConfigureCrossTabPage;
