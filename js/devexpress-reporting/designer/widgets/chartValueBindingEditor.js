﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\chartValueBindingEditor.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ChartValueBindingEditor = (function (_super) {
    __extends(ChartValueBindingEditor, _super);
    function ChartValueBindingEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.treeListController = new analytics_widgets_internal_1.TreeListController();
        return _this;
    }
    ChartValueBindingEditor.prototype.generateDisplayValue = function (reportDataSource) {
        var _this = this;
        if (!this.displayBinding) {
            this._disposables.push(this.displayBinding = ko.computed(function () {
                return _this._model && _this._model() && _this._model()['displayValue'](reportDataSource());
            }));
        }
        return this.displayBinding();
    };
    ChartValueBindingEditor.prototype.generateValue = function (undoEngine, reportParameters, reportDataSource) {
        var _this = this;
        if (!this.binding) {
            this._disposables.push(this.binding = ko.computed({
                read: function () {
                    return _this._model && _this._model() && _this._model()['calculatePath'](reportDataSource()) || '';
                },
                write: function (path) {
                    var pathRequest = new analytics_utils_1.PathRequest(path);
                    undoEngine.start();
                    _this._model()['updateValue'](pathRequest, reportParameters());
                    undoEngine.end();
                }
            }));
        }
        return this.binding;
    };
    return ChartValueBindingEditor;
}(analytics_widgets_1.Editor));
exports.ChartValueBindingEditor = ChartValueBindingEditor;
