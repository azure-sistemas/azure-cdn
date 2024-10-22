﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailWizardUtils.js)
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
var _utils_1 = require("../../internal/dragdrop/_utils");
var _fieldListController_1 = require("../../internal/fieldlist/_fieldListController");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var _utils_2 = require("./_utils");
var MasterDetailInfoBase = (function () {
    function MasterDetailInfoBase(name, specifics, displayName) {
        this.name = name;
        this.specifics = specifics;
        this.displayName = displayName;
        if (!this.displayName)
            this.displayName = this.name;
    }
    return MasterDetailInfoBase;
}());
exports.MasterDetailInfoBase = MasterDetailInfoBase;
var MasterDetailFieldInfo = (function (_super) {
    __extends(MasterDetailFieldInfo, _super);
    function MasterDetailFieldInfo(field) {
        var _this = _super.call(this, field.name, field.specifics, field.displayName) || this;
        _this.checked = !field.unChecked();
        return _this;
    }
    return MasterDetailFieldInfo;
}(MasterDetailInfoBase));
exports.MasterDetailFieldInfo = MasterDetailFieldInfo;
var MasterDetailQueryInfo = (function (_super) {
    __extends(MasterDetailQueryInfo, _super);
    function MasterDetailQueryInfo(dataMember) {
        var _this = _super.call(this, dataMember.name, dataMember.specifics, dataMember.displayName) || this;
        _this._complexFields = [];
        _this._complexRelations = [];
        _this.fields = [];
        _this.relations = [];
        _this.path = dataMember.path;
        _this.checked = dataMember.checked();
        dataMember.children().forEach(function (item) {
            if (!item.isList || item.isComplex) {
                if (item.isComplex && item instanceof analytics_wizard_internal_1.DataMemberTreeNode) {
                    _this._expandComplexFieds(item);
                }
                else {
                    _this.fields.push(new MasterDetailFieldInfo(item));
                }
            }
            else {
                _this.relations.push(new MasterDetailQueryInfo(item));
            }
        });
        _this.fields = _this.fields.concat(_this._complexFields);
        _this.relations = _this.relations.concat(_this._complexRelations);
        return _this;
    }
    MasterDetailQueryInfo.prototype._expandComplexFieds = function (complexField) {
        var _this = this;
        complexField.children().forEach(function (child) {
            var newChild = $.extend({}, child, { name: complexField.name + '.' + child.name });
            if (child instanceof analytics_wizard_internal_1.FieldTreeNode) {
                _this._complexFields.push(new MasterDetailFieldInfo(newChild));
            }
            if (!child.isComplex && child instanceof analytics_wizard_internal_1.DataMemberTreeNode) {
                _this._complexRelations.push(new MasterDetailQueryInfo(newChild));
            }
            if (child.isComplex && child instanceof analytics_wizard_internal_1.DataMemberTreeNode) {
                _this._expandComplexFieds(newChild);
            }
        });
    };
    return MasterDetailQueryInfo;
}(MasterDetailInfoBase));
exports.MasterDetailQueryInfo = MasterDetailQueryInfo;
var DataMemberCustomCheckedTreeNode = (function (_super) {
    __extends(DataMemberCustomCheckedTreeNode, _super);
    function DataMemberCustomCheckedTreeNode(name, displayName, specifics, isChecked, path, afterCheckToggled) {
        var _this = _super.call(this, name, displayName, specifics, isChecked, path, afterCheckToggled) || this;
        _this.checked = ko.pureComputed({
            read: function () {
                var lists = _this.children().filter(function (item) { return _utils_1.isList(item); });
                if (lists.length === 0) {
                    return _this._checked();
                }
                else {
                    var checkedChildren = 0;
                    var partiallySelectedItems = 0;
                    lists.forEach(function (item) {
                        if (item.checked() === true) {
                            checkedChildren++;
                        }
                        else if (item.checked() !== false) {
                            partiallySelectedItems++;
                        }
                    });
                    if (checkedChildren > 0)
                        _this._checked(true);
                    if (checkedChildren === lists.length) {
                        return true;
                    }
                    else {
                        return _this._checked() || partiallySelectedItems > 0 ? undefined : false;
                    }
                }
            }
        });
        _this.checked.subscribe(function (item) {
            afterCheckToggled && afterCheckToggled(_this);
        });
        if (isChecked)
            afterCheckToggled && afterCheckToggled(_this);
        return _this;
    }
    DataMemberCustomCheckedTreeNode.prototype.setChecked = function (value) {
        if (!value || (!this.unChecked() && value)) {
            this.children().forEach(function (item) { return _utils_1.isList(item) && item.setChecked(false); });
            this._checked(false);
        }
        else
            this._checked(value);
    };
    return DataMemberCustomCheckedTreeNode;
}(analytics_wizard_internal_1.DataMemberTreeNode));
exports.DataMemberCustomCheckedTreeNode = DataMemberCustomCheckedTreeNode;
var MasterDetailTreeListController = (function (_super) {
    __extends(MasterDetailTreeListController, _super);
    function MasterDetailTreeListController(hideDataMemberSubItems) {
        var _this = _super.call(this) || this;
        _this.hideDataMemberSubItems = hideDataMemberSubItems || ko.observable(false);
        return _this;
    }
    MasterDetailTreeListController.prototype.canSelect = function (value) {
        return (value.hasItems && !!value.path) || value.data.specifics === 'none';
    };
    MasterDetailTreeListController.prototype.hasItems = function (item) {
        if (this.hideDataMemberSubItems()) {
            return false;
        }
        return _super.prototype.hasItems.call(this, item);
    };
    return MasterDetailTreeListController;
}(analytics_widgets_internal_1.DataMemberTreeListController));
exports.MasterDetailTreeListController = MasterDetailTreeListController;
var AvailableFieldsTreeListController = (function (_super) {
    __extends(AvailableFieldsTreeListController, _super);
    function AvailableFieldsTreeListController(rootItems) {
        var _this = _super.call(this, null) || this;
        _this.rootItems = rootItems;
        return _this;
    }
    AvailableFieldsTreeListController.prototype.itemsFilter = function (item) {
        var visible = false;
        if (!!item.path && _utils_1.isList(item)) {
            visible = this.rootItems().map(function (item) { return item['path']; }).indexOf(item.path) > -1;
        }
        else if (item.path) {
            var stringEndIndex = item.path.lastIndexOf(item.name);
            var pathParts = item.path.substring(0, stringEndIndex != -1 ? stringEndIndex : undefined).split('.');
            if (pathParts.length > 0 && !pathParts[pathParts.length - 1])
                pathParts.splice(pathParts.length - 1, 1);
            visible = this.rootItems().map(function (item) { return item['path']; }).indexOf(pathParts.join('.')) > -1;
        }
        if (!visible && !item.unChecked()) {
            item.setChecked(false);
        }
        item.visible(visible);
        return visible;
    };
    AvailableFieldsTreeListController.prototype.isDraggable = function (item) {
        return false;
    };
    return AvailableFieldsTreeListController;
}(_fieldListController_1.FieldListController));
exports.AvailableFieldsTreeListController = AvailableFieldsTreeListController;
var SummaryInfo = (function (_super) {
    __extends(SummaryInfo, _super);
    function SummaryInfo(data) {
        var _this = _super.call(this, data) || this;
        _this.functionValue([]);
        return _this;
    }
    return SummaryInfo;
}(_utils_2.FieldInfo));
exports.SummaryInfo = SummaryInfo;
var SummaryInfoFieldlist = (function (_super) {
    __extends(SummaryInfoFieldlist, _super);
    function SummaryInfoFieldlist() {
        var _this = _super.call(this, metadata_1.getSummaryFunctionValues()) || this;
        _this.selectedPath = ko.observable('');
        _this._disposables.push(_this.displayName = ko.computed(function () {
            if (!_this.field())
                return null;
            return [_this.field().parent.displayName, _this.field().displayName].join(' - ');
        }).extend({ rateLimit: 0 }));
        return _this;
    }
    return SummaryInfoFieldlist;
}(SummaryInfo));
exports.SummaryInfoFieldlist = SummaryInfoFieldlist;
