﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_designerEditorAddOn.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var DesignerEditorAddOn = (function (_super) {
    __extends(DesignerEditorAddOn, _super);
    function DesignerEditorAddOn(editor, popupService, imageTemplateName) {
        if (imageTemplateName === void 0) { imageTemplateName = ''; }
        var _this = _super.call(this, editor, popupService) || this;
        _this.imageTemplateName = imageTemplateName;
        return _this;
    }
    DesignerEditorAddOn.prototype.onPopupShown = function (popupService) { };
    DesignerEditorAddOn.prototype.showPopup = function (_, element) {
        _super.prototype.showPopup.call(this, _, element);
        var popupService = this['_popupService'];
        this.onPopupShown(popupService);
        popupService.target(element);
    };
    return DesignerEditorAddOn;
}(analytics_internal_1.EditorAddOn));
exports.DesignerEditorAddOn = DesignerEditorAddOn;
var ExpressionEditorAddOn = (function (_super) {
    __extends(ExpressionEditorAddOn, _super);
    function ExpressionEditorAddOn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionEditorAddOn.prototype.actionFilter = function (action) {
        return _super.prototype.actionFilter.call(this, action) && action.id === 'dxrd-expression';
    };
    ExpressionEditorAddOn.prototype.onPopupShown = function (popupService) {
        popupService.disabled(false);
        var actions = popupService.actions();
        if (actions.length == 1) {
            var items = actions[0].items;
            if (items && !!items.length) {
                popupService.actions(items);
                popupService.title(actions[0].title);
            }
            else {
                actions[0].action(this['_editor'].name);
            }
        }
    };
    return ExpressionEditorAddOn;
}(DesignerEditorAddOn));
exports.ExpressionEditorAddOn = ExpressionEditorAddOn;
var ValueEditorAddOn = (function (_super) {
    __extends(ValueEditorAddOn, _super);
    function ValueEditorAddOn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueEditorAddOn.prototype.onPopupShown = function (popupService) {
        popupService.disabled(this['_editor'].disabled());
    };
    ValueEditorAddOn.prototype.actionFilter = function (action) {
        return _super.prototype.actionFilter.call(this, action) && action.id !== 'dxrd-expression';
    };
    return ValueEditorAddOn;
}(DesignerEditorAddOn));
exports.ValueEditorAddOn = ValueEditorAddOn;
