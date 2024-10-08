﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\summaryEditor.js)
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
var _summaryEditor_1 = require("./_summaryEditor");
var _dataBindingMode_1 = require("../internal/_dataBindingMode");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var SummaryEditor = (function (_super) {
    __extends(SummaryEditor, _super);
    function SummaryEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popup = new _summaryEditor_1.SummaryEditorPopup();
        return _this;
    }
    SummaryEditor.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.popup.dispose();
        this.summaryModel && this.summaryModel.dispose();
    };
    SummaryEditor.prototype.getPopupServiceActions = function () {
        var _this = this;
        var actions = _super.prototype.getPopupServiceActions.call(this);
        actions = actions && actions.length > 0 ? [].concat([{
                action: function () {
                    _this.summaryModel && _this.summaryModel.dispose();
                    _this.summaryModel = new _summaryEditor_1.SummaryEditorModel(_this._model()['getModel'] && _this._model()['getModel']() || _this._model());
                    _this.popup.model(_this.summaryModel);
                    _this.popup.visible(true);
                },
                title: 'Run Editor',
                visible: function (propertyName) {
                    var model = _this._model() && _this._model()['getModel'] && _this._model()['getModel']() || _this._model();
                    return _this.visible() && model && model['dataBindingMode'] !== _dataBindingMode_1.DataBindingMode.Bindings;
                }
            }], actions) : [];
        return actions;
    };
    return SummaryEditor;
}(analytics_widgets_1.PropertyGridEditor));
exports.SummaryEditor = SummaryEditor;
