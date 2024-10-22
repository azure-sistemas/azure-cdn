﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\explorerEditors.js)
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
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ExplorerEditor = (function (_super) {
    __extends(ExplorerEditor, _super);
    function ExplorerEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
        _this._collectionNames = ['controls', 'bands'];
        _this._disposables.push(_this.displayExpr = ko.computed(function () {
            var value = ko.unwrap(_this.value);
            return value && ko.unwrap(value.displayName || value.name) || '';
        }));
        var model = ko.computed(function () { return _this._model() && _this._model()['root']; });
        _this._disposables.push(model);
        _this._disposables.push(_this.itemsProvider = new analytics_internal_1.ObjectExplorerProvider([{ model: model, name: 'Report', displayName: 'Report', className: 'master_report' }], ['bands', 'controls', 'rows', 'cells'], _this.value, _reportExplorer_1.ReportExplorerModel.getPathByMember));
        _this.itemsProvider.path('Report');
        _this.treeListController = new analytics_internal_1.ObjectStructureTreeListController(['bands', 'controls', 'rows', 'cells', 'Report']);
        _this.treeListController.canSelect = function (item) {
            return !item.hasItems && !(item.data && (item.data['data'] instanceof xrBand_1.BandViewModel));
        };
        _this.treeListController.itemsFilter = function (item) {
            return item && item['data'] && _this._isVisible(item['data']);
        };
        return _this;
    }
    ExplorerEditor.prototype._isEqualModel = function (item) {
        return item === this._model() || (this._model() && this._model()['isSame'] && this._model()['isSame'](item));
    };
    ExplorerEditor.prototype._isVisible = function (item) {
        if (item instanceof xrBand_1.BandViewModel) {
            for (var i = 0; i < this._collectionNames.length; i++) {
                var collection = item[this._collectionNames[i]] && item[this._collectionNames[i]]();
                if (collection) {
                    for (var j = 0; j < collection.length; j++) {
                        if (this._isVisible(collection[j]))
                            return true;
                    }
                }
            }
            return false;
        }
        else {
            return !this._isEqualModel(item) &&
                item.controlType !== 'XRTableOfContents' &&
                item.controlType !== 'XRPivotGrid' &&
                item.controlType !== 'XRPageBreak' &&
                item.controlType !== 'XRSubreport' &&
                item.controlType !== 'PivotGridField';
        }
    };
    return ExplorerEditor;
}(analytics_widgets_1.Editor));
exports.ExplorerEditor = ExplorerEditor;
var DrillDownEditor = (function (_super) {
    __extends(DrillDownEditor, _super);
    function DrillDownEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.path = ko.observable(null);
        _this._disposables.push(ko.computed(function () {
            if (_this._model() && _this._model() instanceof xrBand_1.BandViewModel) {
                var target = null;
                if (_this._model() instanceof xrDetailBand_1.DetailBand && _this._model().hasHierarchyPrintOptions()) {
                    target = _this._model();
                }
                else {
                    var bands = _this._model().parentModel()['bands']();
                    var position = bands.indexOf(_this._model());
                    target = _this._findFistAvailableBand(bands, position - 1);
                }
                if (target) {
                    _this._setDisabled(false);
                    _this.itemsProvider.path(_reportExplorer_1.ReportExplorerModel.getPathByMember(target));
                }
                else {
                    _this.itemsProvider.path('');
                    _this._setDisabled(true);
                }
            }
        }));
        return _this;
    }
    DrillDownEditor.prototype._setDisabled = function (value) {
        var info = this.info();
        if (info.disabled) {
            if (ko.isObservable(info.disabled)) {
                info.disabled(value);
            }
            else {
                info.disabled = value;
            }
        }
        else {
            info.disabled = ko.observable(value);
        }
    };
    DrillDownEditor.prototype._findFistAvailableBand = function (bands, position) {
        if (position === -1) {
            return null;
        }
        var target = bands[position];
        if (target && (target.controlType === 'GroupHeaderBand' || target.controlType === 'DetailBand')) {
            return target;
        }
        else if (target) {
            return this._findFistAvailableBand(bands, position - 1);
        }
        else {
            return null;
        }
    };
    return DrillDownEditor;
}(ExplorerEditor));
exports.DrillDownEditor = DrillDownEditor;
var xrBand_1 = require("../bands/xrBand");
var xrDetailBand_1 = require("../bands/xrDetailBand");
var _reportExplorer_1 = require("../internal/reportExplorer/_reportExplorer");
