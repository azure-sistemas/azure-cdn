﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\fieldsComboboxEditor.js)
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
var $ = require("jquery");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var FieldsComboboxEditor = (function (_super) {
    __extends(FieldsComboboxEditor, _super);
    function FieldsComboboxEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrappedValues = null;
        return _this;
    }
    FieldsComboboxEditor.prototype._createItem = function (displayNameProvider, item) {
        var deferred = $.Deferred();
        displayNameProvider.getDisplayNameByPath(this.path(), item).done(function (result) {
            deferred.resolve({ value: item, displayValue: result });
        }).fail(function () {
            deferred.resolve({ value: item, displayValue: item });
        });
        return deferred;
    };
    FieldsComboboxEditor.prototype._updateValues = function (values, displayNameProvider) {
        var _this = this;
        this.wrappedValues(values);
        $.when.apply($, values.map(function (x) { return _this._createItem(displayNameProvider, x.value); })).done(function () {
            var results = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                results[_i] = arguments[_i];
            }
            _this.wrappedValues(results);
        });
    };
    FieldsComboboxEditor.prototype.wrapValues = function (displayNameProvider) {
        var _this = this;
        if (!this.wrappedValues) {
            this.wrappedValues = ko.observableArray();
            this._disposables.push(this.values.subscribe(function (newVal) {
                _this._updateValues(newVal, displayNameProvider());
            }));
            this._updateValues(this.values(), displayNameProvider());
        }
        return this.wrappedValues;
    };
    return FieldsComboboxEditor;
}(analytics_widgets_1.FieldListEditor));
exports.FieldsComboboxEditor = FieldsComboboxEditor;
