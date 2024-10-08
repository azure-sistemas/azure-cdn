﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _utils_1 = require("./_utils");
var parameter_1 = require("../../dataObjects/parameters/parameter");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var xrReport_1 = require("../../controls/xrReport");
var FieldListDragDropHelper = (function () {
    function FieldListDragDropHelper(_dataBindingMode, _size) {
        this._dataBindingMode = _dataBindingMode;
        this._size = _size;
        this._getItemsFromList = function (treeListItem, childCollection) {
            var deferred = $.Deferred();
            treeListItem.getItems().done(function (items) {
                var simpleFields = items.filter(function (item) { return !_utils_1.isList(item.data); });
                childCollection.push.apply(childCollection, simpleFields);
                deferred.resolve();
            });
            return deferred.promise();
        };
    }
    FieldListDragDropHelper.prototype._createTable = function (parent, items) {
        var _this = this;
        if (items.length === 0)
            return null;
        var tableSize = this._size ? [this._size.width(), this._size.height()].join(',') : '200, 23';
        var table = parent.getControlFactory().createControl({ '@ControlType': 'XRTable', '@SizeF': tableSize }, parent);
        var tableRow = table.createChild({ '@ControlType': 'XRTableRow', '@Weight': '1' });
        items.forEach(function (item) {
            var cell = _utils_1.createSimpleControl('XRTableCell', tableRow);
            if (item.data.specifics !== 'Array') {
                _utils_1.assignBinding(cell, tableRow, 'Text', item, _this._dataBindingMode);
            }
            else {
                var path = item.data instanceof parameter_1.Parameter ? item.path : new analytics_utils_1.PathRequest(item.path).path;
                cell.addChild(_utils_1.createPictureBox(cell, path, _this._dataBindingMode));
            }
        });
        return table;
    };
    FieldListDragDropHelper.prototype._getFirstLevelItems = function (treeListItems) {
        var deferred = $.Deferred();
        var promises = [];
        var childCollection = [];
        for (var i = 0; i < treeListItems.length; i++) {
            if (!_utils_1.isList(treeListItems[i].data))
                childCollection.push.apply(childCollection, [treeListItems[i]]);
            else
                promises.push(this._getItemsFromList(treeListItems[i], childCollection));
        }
        $.when.apply($, promises).done(function () {
            deferred.resolve(childCollection);
        });
        return deferred.promise();
    };
    FieldListDragDropHelper.prototype.createTableFromListSource = function (treeListItem, parent) {
        var _this = this;
        var deferred = $.Deferred();
        treeListItem.getItems().done(function (items) {
            if (items.length === 0)
                deferred.resolve(null);
            var simpleFields = items.filter(function (item) { return !_utils_1.isList(item.data); });
            if (simpleFields.length === 1) {
                var control = (exports.memberControlsMap[simpleFields['specifics']] || exports.memberControlsMap['Default']).drop(simpleFields[0], parent, _this._dataBindingMode);
                deferred.resolve(control);
            }
            else if (simpleFields.length > 1) {
                deferred.resolve(_this._createTable(parent, simpleFields));
            }
            else {
                _this.createTableFromItems(items, parent).done(function (table) { return deferred.resolve(table); });
            }
        });
        return deferred.promise();
    };
    FieldListDragDropHelper.prototype.createTableFromItems = function (treeListItems, parent) {
        var _this = this;
        var deferred = $.Deferred();
        this._getFirstLevelItems(treeListItems).done(function (items) { return deferred.resolve(_this._createTable(parent, items)); });
        return deferred.promise();
    };
    return FieldListDragDropHelper;
}());
exports.FieldListDragDropHelper = FieldListDragDropHelper;
exports.memberControlsMap = {
    'Array': {
        drop: function (treeListItem, dropTargetControl, dataBindingMode) {
            return _utils_1.createPictureBox(dropTargetControl, new analytics_utils_1.PathRequest(treeListItem.path).path, dataBindingMode);
        },
        size: function (surface) {
            return analytics_elements_1.Size.fromString('100, 100');
        }
    },
    'Bool': {
        drop: function (treeListItem, dropTargetControl, dataBindingMode) {
            var control = _utils_1.createSimpleControl('XRCheckBox', dropTargetControl);
            _utils_1.assignBinding(control, dropTargetControl, 'CheckBoxState', treeListItem, dataBindingMode);
            control.text(treeListItem.data.displayName);
            return control;
        },
        size: function (surface) {
            return analytics_elements_1.Size.fromString('100, 23');
        }
    },
    'List': {
        drop: function (treeListItem, dropTargetControl, dataBindingMode, size) {
            var helper = new FieldListDragDropHelper(dataBindingMode, size);
            if (treeListItem.data.specifics === 'ListSource')
                return helper.createTableFromListSource(treeListItem, dropTargetControl);
            return helper.createTableFromItems([treeListItem], dropTargetControl);
        },
        size: _utils_1.getUsefulReportWidth,
        adjustDropTarget: function (dropTarget) {
            if (dropTarget instanceof xrReport_1.ReportSurface)
                return dropTarget;
            var targetSurface = _utils_1.getFirstSurfaceParentByType(dropTarget, _utils_1._checkBandsType);
            targetSurface.underCursor().x = 0;
            return targetSurface;
        }
    },
    'MultiList': {
        drop: function (treeListItem, dropTargetControl, dataBindingMode, size) {
            var helper = new FieldListDragDropHelper(dataBindingMode, size);
            return helper.createTableFromItems(treeListItem.selectedItems(), dropTargetControl);
        },
        size: _utils_1.getUsefulReportWidth,
        adjustDropTarget: function (dropTarget) {
            if (dropTarget instanceof xrReport_1.ReportSurface)
                return dropTarget;
            var targetSurface = _utils_1.getFirstSurfaceParentByType(dropTarget, _utils_1._checkBandsType);
            targetSurface.underCursor().x = 0;
            return targetSurface;
        }
    },
    'Default': {
        drop: function (treeListItem, dropTargetControl, dataBindingMode) {
            var control = _utils_1.createSimpleControl('XRLabel', dropTargetControl);
            _utils_1.assignBinding(control, dropTargetControl, 'Text', treeListItem, dataBindingMode);
            return control;
        },
        size: function (surface) {
            return analytics_elements_1.Size.fromString('100, 23');
        }
    }
};
