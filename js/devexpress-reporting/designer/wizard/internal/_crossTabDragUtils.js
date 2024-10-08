﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabDragUtils.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _fieldListController_1 = require("../../internal/fieldlist/_fieldListController");
var CrossTabWizardFieldListController = (function (_super) {
    __extends(CrossTabWizardFieldListController, _super);
    function CrossTabWizardFieldListController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showIconsForChildItems = function () { return true; };
        return _this;
    }
    CrossTabWizardFieldListController.prototype.isDraggable = function (item) {
        if (!analytics_internal_1.isList(item.data))
            return true;
        return false;
    };
    return CrossTabWizardFieldListController;
}(_fieldListController_1.FieldListController));
exports.CrossTabWizardFieldListController = CrossTabWizardFieldListController;
var CrossTabWizardDragDropHandler = (function (_super) {
    __extends(CrossTabWizardDragDropHandler, _super);
    function CrossTabWizardDragDropHandler(dragHelperContent, _addHandler) {
        var _this = _super.call(this, null, null, ko.observable(null), null, dragHelperContent) || this;
        _this._addHandler = _addHandler;
        _this.parent = function () { return $('.dx-designer-viewport .dx-fullscreen-wizard'); };
        _this.containment = '.dxrd-report-wizard';
        return _this;
    }
    CrossTabWizardDragDropHandler.prototype.helper = function (draggable, event) {
        this._dropTarget = null;
        var item = draggable;
        var target = $(event.target).closest('.ui-draggable');
        var rect = new analytics_elements_1.Rectangle(event.offsetX + 6, event.offsetY + 6, target.width(), target.height());
        rect.className = 'dxrd-image-ghost-report';
        this.dragHelperContent.reset();
        this.dragHelperContent.setContent(rect, {
            template: 'dxrd-drag-helper-source-reorder-treelist',
            data: {
                imageClassName: item.imageClassName,
                imageTemplateName: item.imageTemplateName,
                text: item.text
            }
        });
        var templateHtml = analytics_widgets_1.getTemplate(this.dragHelperContent.template);
        var $container = $(templateHtml).css({ 'display': 'block' });
        $container.prependTo(this.parent());
        ko.applyBindingsToDescendants(this.dragHelperContent, $container[0]);
        return $container;
    };
    CrossTabWizardDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
        this.dragHelperContent.reset();
        if (this._dropTarget) {
            this._addHandler(this._dropTarget, draggable.data.name);
        }
    };
    CrossTabWizardDragDropHandler.prototype.drag = function (event, ui) {
        var target = this.getTarget(event);
        var page = $(target).closest('.dxrd-wizard-page');
        if (page.length) {
            this._dropTarget = ko.dataFor(page.get(0));
        }
    };
    return CrossTabWizardDragDropHandler;
}(analytics_internal_1.DragDropHandler));
exports.CrossTabWizardDragDropHandler = CrossTabWizardDragDropHandler;
