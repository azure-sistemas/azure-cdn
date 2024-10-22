﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\editOptions.js)
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
var editOptions_1 = require("../metadata/properties/editOptions");
var editOptionsEditor_1 = require("../../widgets/editOptionsEditor");
var editingFieldExtensions_1 = require("../../../common/utils/editingFieldExtensions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var EditOptions = (function () {
    function EditOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model || {});
    }
    EditOptions.prototype.getInfo = function () {
        return editOptions_1.editOptionsSerializationInfo;
    };
    EditOptions.prototype.isEmpty = function () {
        return !this.enabled();
    };
    EditOptions.prototype.isPropertyDisabled = function (name) {
        return name !== 'enabled' && !this.enabled();
    };
    return EditOptions;
}());
exports.EditOptions = EditOptions;
var ContainerEditOptions = (function (_super) {
    __extends(ContainerEditOptions, _super);
    function ContainerEditOptions(model, parent, serializer) {
        var _this = _super.call(this, model || {}, serializer) || this;
        _this.parent = parent;
        return _this;
    }
    ContainerEditOptions.prototype.isPropertyDisabled = function (name) {
        if (name == 'enabled') {
            return this.parent.controls().length > 0;
        }
        else
            return _super.prototype.isPropertyDisabled.call(this, name);
    };
    return ContainerEditOptions;
}(EditOptions));
exports.ContainerEditOptions = ContainerEditOptions;
var CheckEditOptions = (function (_super) {
    __extends(CheckEditOptions, _super);
    function CheckEditOptions(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    CheckEditOptions.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat([
            { propertyName: 'groupId', modelName: '@GroupID', displayName: 'Group ID', localizationId: 'DevExpress.XtraReports.UI.CheckEditOptions.GroupID', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') }
        ]);
    };
    return CheckEditOptions;
}(EditOptions));
exports.CheckEditOptions = CheckEditOptions;
var ImageEditOptions = (function (_super) {
    __extends(ImageEditOptions, _super);
    function ImageEditOptions(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    ImageEditOptions.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat([
            {
                propertyName: 'editorName', modelName: '@EditorName', displayName: 'Editor Name', localizationId: 'DevExpress.XtraReports.UI.ImageEditOptions.EditorName', defaultVal: '',
                editor: { header: 'dxrd-editOptionsEditorName', editorType: editOptionsEditor_1.EditOptionsEditorNameEditorModel },
                editorOptions: { acceptCustomValue: true, categories: [editingFieldExtensions_1.Categories.Image()] }
            }
        ]);
    };
    return ImageEditOptions;
}(EditOptions));
exports.ImageEditOptions = ImageEditOptions;
var TextEditOptions = (function (_super) {
    __extends(TextEditOptions, _super);
    function TextEditOptions(model, serializer) {
        return _super.call(this, model || {}, serializer) || this;
    }
    TextEditOptions.prototype.getInfo = function () {
        var categories = editingFieldExtensions_1.Categories;
        return _super.prototype.getInfo.call(this).concat([
            {
                propertyName: 'editorName', modelName: '@EditorName', displayName: 'Editor Name', localizationId: 'DevExpress.XtraReports.UI.TextEditOptions.EditorName', defaultVal: '',
                editor: { header: 'dxrd-editOptionsEditorName', editorType: editOptionsEditor_1.EditOptionsEditorNameEditorModel },
                editorOptions: { acceptCustomValue: true, excludeCategories: [categories.Image()] }
            }
        ]);
    };
    return TextEditOptions;
}(EditOptions));
exports.TextEditOptions = TextEditOptions;
