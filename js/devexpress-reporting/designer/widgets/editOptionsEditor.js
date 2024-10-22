﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\editOptionsEditor.js)
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
var editingFieldExtensions_1 = require("../../common/utils/editingFieldExtensions");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var EditOptionsEditorNameEditorModel = (function (_super) {
    __extends(EditOptionsEditorNameEditorModel, _super);
    function EditOptionsEditorNameEditorModel(modelPropertyInfo, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
        _this.displayValue = ko.observable('');
        var extesions = editingFieldExtensions_1.EditingFieldExtensions.instance();
        var editorOptions = modelPropertyInfo.editorOptions;
        var categoriesToFilter = [];
        if (editorOptions) {
            categoriesToFilter = editorOptions.categories || extesions.categories(editorOptions.excludeCategories);
        }
        _this.itemsProvider = {
            getItems: function (path) {
                var editorSet = extesions.editors();
                var filteredEditorSet = !categoriesToFilter
                    ? editorSet
                    : editorSet.filter(function (e) { return categoriesToFilter.indexOf(e.category) !== -1; });
                var editorMembers = filteredEditorSet.map(function (item) {
                    var mask = item.options && item.options['mask'];
                    return {
                        name: item.name,
                        displayName: item.displayName,
                        specifics: '_none_',
                        templateName: 'dxrd-editingField-editor-treelist-item',
                        title: item.displayName + (mask ? ' [' + mask + ']' : '')
                    };
                });
                return $.Deferred().resolve(editorMembers).promise();
            }
        };
        var editor = extesions.editor(_this.value());
        if (editor) {
            _this.value(editor.name);
            _this.displayValue(editor.displayName);
        }
        _this.value.subscribe(function (newValue) {
            var editor = extesions.editor(newValue);
            if (editor) {
                _this.value(editor.name);
                _this.displayValue(editor.displayName);
                return;
            }
            _this.displayValue('');
            _this.value('');
        });
        return _this;
    }
    return EditOptionsEditorNameEditorModel;
}(analytics_widgets_1.Editor));
exports.EditOptionsEditorNameEditorModel = EditOptionsEditorNameEditorModel;
