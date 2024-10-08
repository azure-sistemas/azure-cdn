﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\styleseditor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("../controls/properties/style");
var style_2 = require("../controls/metadata/properties/style");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var StylesEditorHeaderModel = (function () {
    function StylesEditorHeaderModel(styleName, styles, disabled, popupContainer) {
        var _this = this;
        this.displayExpr = 'name';
        this.valueExpr = 'name';
        this.displayCustomValue = true;
        this.placeholder = analytics_internal_1.selectPlaceholder();
        this.noDataText = analytics_internal_1.noDataText();
        this.value = ko.pureComputed({
            read: function () {
                return styleName();
            },
            write: function (newVal) {
                if (newVal !== analytics_utils_1.getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId)) {
                    styleName(newVal);
                }
            }
        });
        this.items = ko.pureComputed(function () {
            var result = [new style_1.StyleModel({ '@Name': analytics_utils_1.getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId) })];
            if (styles && styles()) {
                result.push.apply(result, styles());
            }
            return result;
        });
        this.onValueChanged = function (e) {
            if (e.value === analytics_utils_1.getLocalization(StylesEditorHeaderModel.newItem, StylesEditorHeaderModel.newItemTextId)) {
                var newStyleName = analytics_internal_1.getUniqueNameForNamedObjectsArray(styles(), 'xrControlStyle'), newStyle = new style_1.StyleModel({ '@Name': newStyleName });
                styles.push(newStyle);
                _this.value(newStyleName);
            }
        };
        this.disabled = disabled;
        this.dropDownOptions = { container: popupContainer };
    }
    StylesEditorHeaderModel.newItem = 'Create New Style';
    StylesEditorHeaderModel.newItemTextId = 'ASPxReportsStringId.ReportDesigner_StylesEditor_CreateNew';
    return StylesEditorHeaderModel;
}());
exports.StylesEditorHeaderModel = StylesEditorHeaderModel;
ko.bindingHandlers['dxStylesEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var _subscriptionNewStyle;
        $(element).children().remove();
        var templateHtml = analytics_widgets_1.getTemplate('dx-propertieseditor'), $element = $(element).append(templateHtml);
        var style = ko.pureComputed(function () {
            var value = valueAccessor(), styles = value.styles && value.styles(), filtered = styles && styles.filter(function (item) {
                return item.name() === value.styleName();
            });
            if (filtered && filtered.length > 0) {
                var style = filtered[0];
                _subscriptionNewStyle = style.name.subscribe(function (newName) {
                    value.styleName(newName);
                    _subscriptionNewStyle.dispose();
                });
                return style;
            }
            return null;
        });
        analytics_internal_1.addDisposeCallback(element, function () {
            $element = null;
            _subscriptionNewStyle && _subscriptionNewStyle.dispose();
        });
        ko.applyBindings(bindingContext.createChildContext(new analytics_widgets_1.ObjectProperties(style, { editors: style_2.styleSerializationInfo }, 1, viewModel.disabled, undefined, viewModel.textToSearch)), $element.children()[0]);
        return { controlsDescendantBindings: true };
    }
};
