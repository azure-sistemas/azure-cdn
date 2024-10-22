﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_title.js)
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
var _elementCollection_1 = require("../../internal/_elementCollection");
var _utils_1 = require("../../internal/_utils");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var TitleViewModel = (function (_super) {
    __extends(TitleViewModel, _super);
    function TitleViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer, _chart_1.titleSerializationsInfo) || this;
        _this.name = ko.pureComputed({
            read: function () { return _this['text'] ? _this['text']() : 'title'; },
            write: function (val) { _this['text'](val); }
        });
        return _this;
    }
    TitleViewModel.from = function (model, serializer) {
        return new TitleViewModel(model || {}, null, serializer);
    };
    TitleViewModel.prefix = 'Title';
    return TitleViewModel;
}(_elementCollection_1.ChartElementCollectionItemBase));
exports.TitleViewModel = TitleViewModel;
function assignTitleActions(titles) {
    var addTitle = function (model) {
        model['@Text'] = model['@Name'] = analytics_internal_1.getUniqueName(titles().map(function (x) { return x['name'](); }), TitleViewModel.prefix);
        titles()['innerActions'][0].closePopover();
        titles.push(new TitleViewModel(model, titles));
    };
    var actions = [
        {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_left',
            imageTemplateName: 'dxrd-svg-titles-top_left',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Alignment': 'Near' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_center',
            imageTemplateName: 'dxrd-svg-titles-top_center',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Alignment': 'Center' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-top_right',
            imageTemplateName: 'dxrd-svg-titles-top_right',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Alignment': 'Far' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_top_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_top_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Right', '@Alignment': 'Near' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_center_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_center_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Right', '@Alignment': 'Center' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-right_bottom_vertical',
            imageTemplateName: 'dxrd-svg-titles-right_bottom_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Right', '@Alignment': 'Far' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_left',
            imageTemplateName: 'dxrd-svg-titles-bottom_left',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Near' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_center',
            imageTemplateName: 'dxrd-svg-titles-bottom_center',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Center' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-bottom_right',
            imageTemplateName: 'dxrd-svg-titles-bottom_right',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Bottom', '@Alignment': 'Far' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_bottom_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_bottom_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Left', '@Alignment': 'Near' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_center_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_center_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Left', '@Alignment': 'Center' }); }
        }, {
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-chart-title-left_top_vertical',
            imageTemplateName: 'dxrd-svg-titles-left_top_vertical',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () { addTitle({ '@Dock': 'Left', '@Alignment': 'Far' }); }
        }
    ];
    titles()['innerActions'] = _utils_1.createInnerActionsWithPopover(analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'), 'addtitles-action_' + analytics_internal_1.guid(), actions);
}
exports.assignTitleActions = assignTitleActions;
var _chart_1 = require("../../internal/meta/_chart");
