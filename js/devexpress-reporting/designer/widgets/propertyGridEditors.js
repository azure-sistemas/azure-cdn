﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\propertyGridEditors.js)
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
require("./editorTemplates");
var _formatStringService_1 = require("../services/_formatStringService");
var settings_1 = require("../utils/settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_widgets_metadata_1 = require("@devexpress/analytics-core/analytics-widgets-metadata");
var dataBindings_1 = require("../controls/metadata/properties/dataBindings");
var ContentByTypeEditor = (function (_super) {
    __extends(ContentByTypeEditor, _super);
    function ContentByTypeEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentByTypeEditor.prototype.createObjectProperties = function () {
        return new analytics_widgets_1.ObjectProperties(this.getViewModel(), undefined, this.level + 1, this.disabled, undefined, this.textToSearch);
    };
    ContentByTypeEditor.prototype.getViewModel = function () {
        var _this = this;
        var value = ko.computed(function () {
            return _this.value() && _this.value().content();
        });
        this._disposables.push(value);
        return value;
    };
    return ContentByTypeEditor;
}(analytics_widgets_1.PropertyGridEditor));
exports.ContentByTypeEditor = ContentByTypeEditor;
var DataBindingsEditor = (function (_super) {
    __extends(DataBindingsEditor, _super);
    function DataBindingsEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    DataBindingsEditor.prototype.createObjectProperties = function () {
        var _this = this;
        var model = ko.pureComputed(function () {
            var obj = {};
            obj.isPropertyModified = function (name) {
                return !obj[name].isEmpty();
            };
            obj.actions = [{
                    action: function (propertyName) { obj[propertyName].resetValue(); },
                    title: analytics_utils_1.getLocalization('Reset', 'AnalyticsCoreStringId.PropertyGrid_PopupMenu_Reset'),
                    visible: function () { return true; }
                }];
            var databindings = _this.value()();
            (databindings || []).map(function (value) { obj[value.propertyName()] = value; });
            return obj;
        });
        this._disposables.push(model);
        return new analytics_widgets_1.ObjectProperties(model, { editors: dataBindings_1.dataBindingsSerializationInfo }, this.level + 1, this.disabled, undefined, this.textToSearch);
    };
    return DataBindingsEditor;
}(analytics_widgets_1.PropertyGridEditor));
exports.DataBindingsEditor = DataBindingsEditor;
var DataBindingEditor = (function (_super) {
    __extends(DataBindingEditor, _super);
    function DataBindingEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataBindingEditor.prototype, "actions", {
        get: function () { return _formatStringService_1.FormatStringService.actions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingEditor.prototype, "customPatterns", {
        get: function () { return settings_1.formatStringEditorCustomSet; },
        enumerable: true,
        configurable: true
    });
    return DataBindingEditor;
}(analytics_widgets_1.FieldListEditor));
exports.DataBindingEditor = DataBindingEditor;
var FontEditorUndo = (function (_super) {
    __extends(FontEditorUndo, _super);
    function FontEditorUndo(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    FontEditorUndo.prototype.generateValue = function (undoEngine) {
        this.undoEngine = undoEngine;
        return this.viewmodel;
    };
    FontEditorUndo.prototype.createObjectProperties = function () {
        var _this = this;
        var undoValue = ko.computed({
            read: function () {
                return _this.value();
            },
            write: function (val) {
                _this.undoEngine && _this.undoEngine().start();
                _this.value(val);
                _this.undoEngine && _this.undoEngine().end();
            }
        });
        this._disposables.push(undoValue);
        var model = new analytics_widgets_internal_1.FontModel(undoValue);
        this._disposables.push(model);
        return new analytics_widgets_1.ObjectProperties(ko.observable(model), { editors: analytics_widgets_metadata_1.fontInfo }, this.level + 1, this.disabled, undefined, this.textToSearch);
    };
    return FontEditorUndo;
}(analytics_widgets_1.PropertyGridEditor));
exports.FontEditorUndo = FontEditorUndo;
