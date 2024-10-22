﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_groupEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ParametersGroupEditor = (function (_super) {
    __extends(ParametersGroupEditor, _super);
    function ParametersGroupEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.isGroupLabel = true;
        return _this;
    }
    ParametersGroupEditor.prototype._setPadding = function (position, value) {
        var padding = _super.prototype._setPadding.call(this, position, value);
        padding['padding-' + position] = 10;
        padding['padding-bottom'] = 6;
        return padding;
    };
    ParametersGroupEditor.prototype.createObjectProperties = function () {
        this.collapsed(!this.editorOptions.expanded && this.editorOptions.titleVisible);
        this.hideEditorHeader = !this.editorOptions.titleVisible;
        this.hideCollapsingImage = !this.editorOptions.showExpandButton;
        this.hideBorder = this.editorOptions.borderVisible === false;
        this.showHorizontally = this.editorOptions.orientation === 'Horizontal';
        this.level = -1;
        this.editorCreated(true);
        return _super.prototype.createObjectProperties.call(this);
    };
    return ParametersGroupEditor;
}(analytics_widgets_1.PropertyGridEditor));
exports.ParametersGroupEditor = ParametersGroupEditor;
var ParametersEditor = (function (_super) {
    __extends(ParametersEditor, _super);
    function ParametersEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.hasVerticalLabel = _this.editorOptions && _this.editorOptions.hasVerticalLabel;
        _this.hasSeparator = _this.editorOptions && _this.editorOptions.hasSeparator;
        return _this;
    }
    return ParametersEditor;
}(analytics_widgets_1.Editor));
exports.ParametersEditor = ParametersEditor;
